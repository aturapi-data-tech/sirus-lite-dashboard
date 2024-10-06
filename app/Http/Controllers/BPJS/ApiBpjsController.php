<?php

namespace App\Http\Controllers\BPJS;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Http;
use Exception;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class ApiBpjsController extends Controller
{
    public function index(Request $request)
    {

        $signature = $this->signature();
        $refPoliklinik = $this->ref_poliklinik('DALAM')->getContent();
        $peserta_nik = $this->peserta_nik('1234567890123456', '2020-01-01')->getContent();

        //return view
        return inertia('BPJS/ApiBpjsWSChecking', [
            'signature' => $signature,
            'refPoliklinik' => json_decode($refPoliklinik, true),
            'pesertaNik' => json_decode($peserta_nik, true)
        ]);
    }

    private function signature()
    {
        $cons_id =  env('VCLAIM_CONS_ID');
        $secretKey = env('VCLAIM_SECRET_KEY');
        $userkey = env('VCLAIM_USER_KEY');


        date_default_timezone_set('UTC');
        $tStamp = strval(time() - strtotime('1970-01-01 00:00:00'));
        $signature = hash_hmac('sha256', $cons_id . "&" . $tStamp, $secretKey, true);
        $encodedSignature = base64_encode($signature);

        $response = array(
            'user_key' => $userkey,
            'x-cons-id' => $cons_id,
            'x-timestamp' => $tStamp,
            'x-signature' => $encodedSignature,
            'decrypt_key' => $cons_id . $secretKey . $tStamp,
        );
        return $response;
    }

    private function sendResponse($message, $data, $code = 200, $url, $requestTransferTime)
    {
        $response = [
            'response' => $data,
            'metadata' => [
                'message' => $message,
                'code' => $code,
                'requestTransferTime' => $requestTransferTime
            ],
        ];

        // Insert webLogStatus
        DB::table('web_log_status')->insert([
            'code' =>  $code,
            'date_ref' => Carbon::now(),
            'response' => json_encode($response, true),
            'http_req' => $url,
            'requestTransferTime' => $requestTransferTime
        ]);

        return response()->json($response, $code);
    }
    private function sendError($error, $errorMessages = [], $code = 404, $url, $requestTransferTime)
    {
        $response = [
            'metadata' => [
                'message' => $error,
                'code' => $code,
                'requestTransferTime' => $requestTransferTime
            ],
        ];
        if (!empty($errorMessages)) {
            $response['response'] = $errorMessages;
        }
        // Insert webLogStatus
        DB::table('web_log_status')->insert([
            'code' =>  $code,
            'date_ref' => Carbon::now(),
            'response' => json_encode($response, true),
            'http_req' => $url,
            'requestTransferTime' => $requestTransferTime
        ]);

        return response()->json($response, $code);
    }

    private  function stringDecrypt($key, $string)
    {
        $encrypt_method = 'AES-256-CBC';
        $key_hash = hex2bin(hash('sha256', $key));
        $iv = substr(hex2bin(hash('sha256', $key)), 0, 16);
        $output = openssl_decrypt(base64_decode($string), $encrypt_method, $key_hash, OPENSSL_RAW_DATA, $iv);
        $output = \LZCompressor\LZString::decompressFromEncodedURIComponent($output);
        return $output;
    }

    private function response_decrypt($response, $signature, $url, $requestTransferTime)
    {
        if ($response->failed()) {
            return $this->sendError($response->reason(),  $response->json('response'), $response->status(), $url, $requestTransferTime);
        } else {
            // Check Response !200           -> metaData D besar
            $code = $response->json('metaData.code'); //code 200 -201 500 dll

            if ($code == 200) {
                $decrypt = $this->stringDecrypt($signature['decrypt_key'], $response->json('response'));
                $data = json_decode($decrypt, true);
            } else {

                $data = json_decode($response, true);
            }

            return $this->sendResponse($response->json('metaData.message'), $data, $code, $url, $requestTransferTime);
        }
    }
    private function ref_poliklinik($poliklinik)
    {

        $messages = [];
        $r = ['poliklinik' => $poliklinik];
        $validator = Validator::make($r, ["poliklinik" => "required"], $messages);

        if ($validator->fails()) {
            return $this->sendError($validator->errors()->first(), $validator->errors(), 201, null, null);
        }

        // handler when time out and off line mode
        try {

            $url = env('VCLAIM_URL') . "referensi/poli/" . $poliklinik;
            $signature = $this->signature();
            $response = Http::timeout(10)
                ->withHeaders($signature)
                ->get($url);

            return $this->response_decrypt($response, $signature, $url, $response->transferStats->getTransferTime());
            /////////////////////////////////////////////////////////////////////////////
        } catch (Exception $e) {
            return $this->sendError($e->getMessage(), $validator->errors(), 408, $url, null);
        }
    }

    private function peserta_nik($nik, $tanggal)
    {
        // customErrorMessages
        $messages = [];

        // Masukkan Nilai dari parameter
        $r = [
            'nik' => $nik,
            'tanggal' => $tanggal,
        ];
        // lakukan validasis
        $validator = Validator::make($r, [
            "nik" => "required|digits:16",
            "tanggal" => "required|date",
        ], $messages);

        if ($validator->fails()) {
            return self::sendError($validator->errors()->first(), $validator->errors(), 201, null, null);
        }



        // handler when time out and off line mode
        try {

            $url = env('VCLAIM_URL') . "Peserta/nik/" . $nik . "/tglSEP/" . $tanggal;
            $signature = self::signature();
            $response = Http::timeout(10)
                ->withHeaders($signature)
                ->get($url);


            // dd($response->transferStats->getTransferTime()); Get Transfertime request
            // semua response error atau sukses dari BPJS di handle pada logic response_decrypt
            return self::response_decrypt($response, $signature, $url, $response->transferStats->getTransferTime());
            /////////////////////////////////////////////////////////////////////////////
        } catch (Exception $e) {
            return self::sendError($e->getMessage(), $validator->errors(), 408, $url, null);
        }
    }
}
