<?php

namespace App\Http\Controllers\UGD;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Collection;
use carbon\Carbon;

class PasienUGDController extends Controller
{
    // EMR Ugd
    ///////////////////////////////////////////////////////
    public function indexEMRUgd(Request $request)
    {
        $date = $request->input('date') ? $request->input('date') : Carbon::now()->format('d/m/Y');
        $page = $request->input('page') ? $request->input('page') : 1;
        $show = $request->input('show') ? $request->input('show') : 10;

        $queryPasienEMRUgd = $this->queryPasienEmrUgd($date, $show);
        $queryPasienEmrUgdKelengkapanPengisianHarian = $this->queryPasienEmrUgdKelengkapanPengisianHarian($date);

        //return view
        return inertia('UGD/PasienEMRUGD', [
            'date' => $date,
            'page' => $page,
            'show' => $show,
            'queryPasienEMRUgd' => $queryPasienEMRUgd,
            'queryPasienEmrUgdKelengkapanPengisianHarian' => $queryPasienEmrUgdKelengkapanPengisianHarian
        ]);
    }

    public function queryPasienEmrUgd($date, $show)
    {
        $myRefstatusId = 'A';
        $myRefdate = $date;

        $query = DB::table('rsview_ugdkasir')
            ->select(
                DB::raw("to_char(rj_date,'dd/mm/yyyy hh24:mi:ss') AS rj_date"),
                DB::raw("to_char(rj_date,'yyyymmddhh24miss') AS rj_date1"),
                'rj_no',
                'reg_no',
                'reg_name',
                'sex',
                'address',
                'thn',
                DB::raw("to_char(birth_date,'dd/mm/yyyy') AS birth_date"),
                // 'poli_id',
                // 'poli_desc',
                'dr_id',
                'dr_name',
                'klaim_id',
                'shift',
                'vno_sep',
                'no_antrian',
                'rj_status',
                'nobooking',
                'push_antrian_bpjs_status',
                'push_antrian_bpjs_json',
                'datadaftarugd_json'
            )
            ->where(DB::raw("nvl(erm_status,'A')"), '=', $myRefstatusId)
            ->where('rj_status', '!=', ['A', 'F'])
            ->where('klaim_id', '!=', 'KR')

            ->where(DB::raw("to_char(rj_date,'dd/mm/yyyy')"), '=', $myRefdate)


            ->orderBy('dr_name',  'asc')
            ->orderBy('shift',  'asc')
            ->orderBy('no_antrian',  'desc')
            ->orderBy('rj_date1',  'desc')
            ->paginate($show);

        return $query;
    }

    public function queryPasienEmrUgdKelengkapanPengisianHarian($dateRef): array
    {
        //total lengkap
        ////////////////////////////////////////////////
        $queryTotal = DB::table('rstxn_ugdhdrs')
            ->select(
                DB::raw("to_char(rj_date,'dd/mm/yyyy') AS rj_date"),
                DB::raw("to_char(rj_date,'yyyymmdd') AS rj_date1"),
                'datadaftarugd_json'
            )
            ->where('rj_status', '!=', ['A', 'F'])
            ->where('klaim_id', '!=', 'KR')
            ->where(DB::raw("to_char(rj_date,'dd/mm/yyyy')"), '=', $dateRef)
            ->get();

        //    cari berdasarkan JSON Table
        // emr
        $queryLengkap = $queryTotal->filter(function ($item) {
            $datadaftarugd_json = json_decode($item->datadaftarugd_json, true);
            $anamnesa = isset($datadaftarugd_json['anamnesa']) ? 1 : 0;
            $pemeriksaan = isset($datadaftarugd_json['pemeriksaan']) ? 1 : 0;
            $penilaian = isset($datadaftarugd_json['penilaian']) ? 1 : 0;
            $procedure = isset($datadaftarugd_json['procedure']) ? 1 : 0;
            $diagnosis = isset($datadaftarugd_json['diagnosis']) ? 1 : 0;
            $perencanaan = isset($datadaftarugd_json['perencanaan']) ? 1 : 0;
            $prosentaseEMR =
                (($anamnesa + $pemeriksaan + $penilaian + $procedure + $diagnosis + $perencanaan) / 6) *
                100;

            if ($prosentaseEMR >= 80) {
                return 'x';
            }
        })->count();

        // DiagnosisIcd
        $queryDiagnosisIcd = $queryTotal->filter(function ($item) {
            $datadaftarugd_json = json_decode($item->datadaftarugd_json, true);
            $diagnosis = isset($datadaftarugd_json['diagnosis']) ? count($datadaftarugd_json['diagnosis']) : 0;
            if ($diagnosis > 0) {
                return 'x';
            }
        })->count();

        // SatuSehat
        $querySatuSehat = $queryTotal->filter(function ($item) {
            $datadaftarugd_json = json_decode($item->datadaftarugd_json, true);
            $satuSehatUuidUgd = isset($datadaftarugd_json['satuSehatUuidUgd']) ? count($datadaftarugd_json['satuSehatUuidUgd']) : 0;
            if ($satuSehatUuidUgd > 0) {
                return 'x';
            }
        })->count();

        $query = [
            'queryTotal' => $queryTotal->count(),
            'queryLengkap' => $queryLengkap,
            'queryDiagnosisIcd' => $queryDiagnosisIcd,
            'querySatuSehat' => $querySatuSehat
        ];
        return $query;
    }
}
