<?php

namespace App\Http\Traits\BPJS;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Http;
use Exception;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

trait AntrianBPJSTrait
{
    private function signature()
    {
        $cons_id =  env('ANTRIAN_CONS_ID');
        $secretKey = env('ANTRIAN_SECRET_KEY');
        $userkey = env('ANTRIAN_USER_KEY');


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
            $code = $response->json('metadata.code'); //code 200 -201 500 dll

            if ($code == 200) {
                $decrypt = $this->stringDecrypt($signature['decrypt_key'], $response->json('response'));
                $data = json_decode($decrypt, true);
            } else {

                $data = json_decode($response, true);
            }

            return $this->sendResponse($response->json('metaData.message'), $data, $code, $url, $requestTransferTime);
        }
    }

    private function response_no_decrypt($response, $url, $requestTransferTime)
    {
        if ($response->json('metadata.code') == 1) {
            $code = 200;
        } else if ($response->json('metadata.code') == 2)
            $code = 400;
        else if ($response->json('metadata.code') == 204)
            $code = 404;
        else {
            $code = 400;
        }
        if ($response->failed()) {
            // error, msgError,Code,url,ReqtrfTime
            return $this->sendError($response->reason(), $response->json('response'), 408, $url, $requestTransferTime);
        } else {
            return $this->sendResponse($response->json('metadata.message'), $response->json('response'), $code, $url, $requestTransferTime);
        }
    }

    private  function dashboard_tanggal($waktu, $tanggal)
    {
        // customErrorMessages
        $messages = [];

        // Masukkan Nilai dari parameter
        $r = [
            'waktu' => $waktu, //rs, server
            'tanggal' => $tanggal, //Y-m-d
        ];
        // lakukan validasis
        $validator = Validator::make($r, [
            "tanggal" =>  "required|date|date_format:Y-m-d",
            "waktu" => "required|in:rs,server",
        ], $messages);

        if ($validator->fails()) {
            return $this->sendError($validator->errors()->first(), $validator->errors(), 201, null, null);
        }

        // handler when time out and off line mode
        try {

            $url = env('ANTRIAN_URL') . "dashboard/waktutunggu/tanggal/" . $tanggal . "/waktu/" . $waktu;
            $signature = $this->signature();
            $response = Http::timeout(10)
                ->withHeaders($signature)
                ->get($url);

            // dd($response->transferStats->getTransferTime()); Get Transfertime request
            // semua response error atau sukses dari BPJS di handle pada logic response_decrypt
            return $this->response_no_decrypt($response,  $url, $response->transferStats->getTransferTime());
            /////////////////////////////////////////////////////////////////////////////
        } catch (Exception $e) {
            return $this->sendError($e->getMessage(), $validator->errors(), 408, $url, null);
        }
    }

    private  function antrean_tanggal($tanggal)
    {
        // customErrorMessages
        $messages = [];

        // Masukkan Nilai dari parameter
        $r = [
            'tanggal' => $tanggal, //Y-m-d
        ];
        // lakukan validasis
        $validator = Validator::make($r, [
            "tanggal" =>  "required|date|date_format:Y-m-d",
        ], $messages);

        if ($validator->fails()) {
            return $this->sendError($validator->errors()->first(), $validator->errors(), 201, null, null);
        }

        // handler when time out and off line mode
        try {

            $url = env('ANTRIAN_URL') . "antrean/pendaftaran/tanggal/" . $tanggal;
            $signature = $this->signature();
            $response = Http::timeout(10)
                ->withHeaders($signature)
                ->get($url);

            // dd($response->transferStats->getTransferTime()); Get Transfertime request
            // semua response error atau sukses dari BPJS di handle pada logic response_decrypt
            return $this->response_decrypt($response, $signature, $url, $response->transferStats->getTransferTime());
            /////////////////////////////////////////////////////////////////////////////
        } catch (Exception $e) {
            return $this->sendError($e->getMessage(), $validator->errors(), 408, $url, null);
        }
    }


    private  function getlisttask($kodebooking)
    {
        // customErrorMessages
        $messages = [];

        // Masukkan Nilai dari parameter
        $r = [
            'kodebooking' => $kodebooking, //Y-m-d
        ];
        // lakukan validasis
        $validator = Validator::make($r, [
            "kodebooking" =>  "required",
        ], $messages);

        if ($validator->fails()) {
            return $this->sendError($validator->errors()->first(), $validator->errors(), 201, null, null);
        }

        // handler when time out and off line mode
        try {

            $url = env('ANTRIAN_URL') . "antrean/getlisttask";
            $signature = $this->signature();
            $response = Http::timeout(10)
                ->withHeaders($signature)
                ->post($url, $r);

            // dd($response->transferStats->getTransferTime()); Get Transfertime request
            // semua response error atau sukses dari BPJS di handle pada logic response_decrypt
            return $this->response_decrypt($response, $signature, $url, $response->transferStats->getTransferTime());
            /////////////////////////////////////////////////////////////////////////////
        } catch (Exception $e) {
            return $this->sendError($e->getMessage(), $validator->errors(), 408, $url, null);
        }
    }
}
