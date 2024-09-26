<?php

namespace App\Http\Controllers\RJ;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Collection;
use carbon\Carbon;

class PasienRawatJalanController extends Controller
{
    public function index(Request $request)
    {

        $search = $request->input('search');

        $myData = $this->queryMyData($search);

        //return view
        return inertia('RJ/PasienRawatJalan', [
            'myData' => $myData,
            'mySearch' => $search
        ]);
    }

    public function queryMyData($search): Collection
    {
        $query = DB::table('rsmst_doctors')
            ->select(
                'dr_id',
                'dr_name',
                'kd_dr_bpjs',
                'dr_uuid',
                'dr_nik',
                'dr_phone',
                'dr_address',
                'rsmst_polis.poli_desc as poli_desc'
            )->join('rsmst_polis', 'rsmst_polis.poli_id', '=',  'rsmst_doctors.poli_id')
            ->where('active_status', '=', '1')
            ->where('dr_name', 'like', '%' . $search . '%')
            ->orderBy('dr_name',  'asc')
            ->get();

        return $query;
    }





    // umum bpjs poli
    public function queryPasienRJUmum($yearRjRef): Collection
    {
        $query = DB::table('rstxn_rjhdrs')
            ->select(
                DB::raw("to_char(rj_date,'mm/yyyy') AS rj_date"),
                DB::raw("to_char(rj_date,'yyyymm') AS rj_date1"),
                DB::raw("count(*) AS jml_kunjungan"),

            )
            ->where('rj_status', '!=', ['A', 'F'])
            ->where(DB::raw("to_char(rj_date,'yyyy')"), '=', $yearRjRef)
            ->whereIn('klaim_id', function ($query) {
                $query->select('klaim_id')
                    ->from('rsmst_klaimtypes')
                    ->where('klaim_status', '=', 'UMUM');
            })
            ->groupBy(DB::raw("to_char(rj_date,'mm/yyyy')"))
            ->groupBy(DB::raw("to_char(rj_date,'yyyymm')"))
            ->orderBy('rj_date1',  'asc')
            ->get();
        return $query;
    }

    public function queryPasienRJBpjs($yearRjRef): Collection
    {
        $query = DB::table('rstxn_rjhdrs')
            ->select(
                DB::raw("to_char(rj_date,'mm/yyyy') AS rj_date"),
                DB::raw("to_char(rj_date,'yyyymm') AS rj_date1"),
                DB::raw("count(*) AS jml_kunjungan"),

            )
            ->where('rj_status', '!=', ['A', 'F'])
            ->where(DB::raw("to_char(rj_date,'yyyy')"), '=', $yearRjRef)
            ->whereIn('klaim_id', function ($query) {
                $query->select('klaim_id')
                    ->from('rsmst_klaimtypes')
                    ->where('klaim_status', '=', 'BPJS');
            })
            ->groupBy(DB::raw("to_char(rj_date,'mm/yyyy')"))
            ->groupBy(DB::raw("to_char(rj_date,'yyyymm')"))
            ->orderBy('rj_date1',  'asc')
            ->get();
        return $query;
    }

    public function queryPasienRJKronis($yearRjRef): Collection
    {
        $query = DB::table('rstxn_rjhdrs')
            ->select(
                DB::raw("to_char(rj_date,'mm/yyyy') AS rj_date"),
                DB::raw("to_char(rj_date,'yyyymm') AS rj_date1"),
                DB::raw("count(*) AS jml_kunjungan"),

            )
            ->where('rj_status', '!=', ['A', 'F'])
            ->where(DB::raw("to_char(rj_date,'yyyy')"), '=', $yearRjRef)
            ->whereIn('klaim_id', function ($query) {
                $query->select('klaim_id')
                    ->from('rsmst_klaimtypes')
                    ->where('klaim_status', '=', 'KRONIS');
            })
            ->groupBy(DB::raw("to_char(rj_date,'mm/yyyy')"))
            ->groupBy(DB::raw("to_char(rj_date,'yyyymm')"))
            ->orderBy('rj_date1',  'asc')
            ->get();
        return $query;
    }

    // umum bpjs poli per poli
    public function indexRJPoli(Request $request)
    {

        $yearRjRef = $request->input('yearRef') ? $request->input('yearRef') : Carbon::now()->format('Y');
        $poliId = $request->input('kodePoli') ? $request->input('kodePoli') : 1;

        $poli = $this->displayPoli($poliId);
        $queryPasienRJUmumPoli = $this->queryPasienRJUmumPoli($yearRjRef, $poliId);
        $queryPasienRJBpjsPoli = $this->queryPasienRJBpjsPoli($yearRjRef, $poliId);
        $queryPasienRJKronisPoli = $this->queryPasienRJKronisPoli($yearRjRef, $poliId);

        //return view
        return inertia('RJ/PasienRawatJalanPoli', [
            'poli' => $poli,
            'yearRjRef' => $yearRjRef,
            'queryPasienRJUmumPoli' => $queryPasienRJUmumPoli,
            'queryPasienRJBpjsPoli' => $queryPasienRJBpjsPoli,
            'queryPasienRJKronisPoli' => $queryPasienRJKronisPoli,

        ]);
    }

    public function displayPoli($poliId = 1): array
    {
        $query = json_decode(json_encode(DB::table('rsmst_polis')
            ->select('poli_id', 'poli_desc')
            ->where('poli_id', '=', $poliId)
            ->first(), true), true);
        return $query;
    }
    public function queryPasienRJUmumPoli($yearRjRef, $poliId = 1): Collection
    {
        $query = DB::table('rstxn_rjhdrs')
            ->select(
                DB::raw("to_char(rj_date,'mm/yyyy') AS rj_date"),
                DB::raw("to_char(rj_date,'yyyymm') AS rj_date1"),
                DB::raw("count(*) AS jml_kunjungan"),

            )
            ->where('rj_status', '!=', ['A', 'F'])
            ->where(DB::raw("to_char(rj_date,'yyyy')"), '=', $yearRjRef)
            ->where('poli_id', '=', $poliId)
            ->whereIn('klaim_id', function ($query) {
                $query->select('klaim_id')
                    ->from('rsmst_klaimtypes')
                    ->where('klaim_status', '=', 'UMUM');
            })
            ->groupBy(DB::raw("to_char(rj_date,'mm/yyyy')"))
            ->groupBy(DB::raw("to_char(rj_date,'yyyymm')"))
            ->groupBy('poli_id')

            ->orderBy('rj_date1',  'asc')
            ->get();
        return $query;
    }

    public function queryPasienRJBpjsPoli($yearRjRef, $poliId = 1): Collection
    {
        $query = DB::table('rstxn_rjhdrs')
            ->select(
                DB::raw("to_char(rj_date,'mm/yyyy') AS rj_date"),
                DB::raw("to_char(rj_date,'yyyymm') AS rj_date1"),
                DB::raw("count(*) AS jml_kunjungan"),

            )
            ->where('rj_status', '!=', ['A', 'F'])
            ->where(DB::raw("to_char(rj_date,'yyyy')"), '=', $yearRjRef)
            ->where('poli_id', '=', $poliId)
            ->whereIn('klaim_id', function ($query) {
                $query->select('klaim_id')
                    ->from('rsmst_klaimtypes')
                    ->where('klaim_status', '=', 'BPJS');
            })
            ->groupBy(DB::raw("to_char(rj_date,'mm/yyyy')"))
            ->groupBy(DB::raw("to_char(rj_date,'yyyymm')"))
            ->orderBy('rj_date1',  'asc')
            ->get();
        return $query;
    }

    public function queryPasienRJKronisPoli($yearRjRef, $poliId = 1): Collection
    {
        $query = DB::table('rstxn_rjhdrs')
            ->select(
                DB::raw("to_char(rj_date,'mm/yyyy') AS rj_date"),
                DB::raw("to_char(rj_date,'yyyymm') AS rj_date1"),
                DB::raw("count(*) AS jml_kunjungan"),

            )
            ->where('rj_status', '!=', ['A', 'F'])
            ->where(DB::raw("to_char(rj_date,'yyyy')"), '=', $yearRjRef)
            ->where('poli_id', '=', $poliId)
            ->whereIn('klaim_id', function ($query) {
                $query->select('klaim_id')
                    ->from('rsmst_klaimtypes')
                    ->where('klaim_status', '=', 'KRONIS');
            })
            ->groupBy(DB::raw("to_char(rj_date,'mm/yyyy')"))
            ->groupBy(DB::raw("to_char(rj_date,'yyyymm')"))
            ->orderBy('rj_date1',  'asc')
            ->get();
        return $query;
    }
}
