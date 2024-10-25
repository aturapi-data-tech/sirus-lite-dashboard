<?php

namespace App\Http\Controllers\BPJS;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Traits\BPJS\VclaimBPJSTrait;

class ApiBpjsController extends Controller
{
    use VclaimBPJSTrait;
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
}
