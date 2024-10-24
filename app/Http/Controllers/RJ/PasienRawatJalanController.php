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
    ///////////////////////////////////////////////////////
    public function queryPasienRJUmum($yearRjRef): Collection
    {
        $query = DB::table('rstxn_rjhdrs')->select(
            DB::raw("to_char(rj_date,'mm/yyyy') AS rj_date"),
            DB::raw("to_char(rj_date,'yyyymm') AS rj_date1"),
            DB::raw("count(*) AS jml_kunjungan")
        )->where('rj_status', '!=', ['A', 'F'])
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
    ///////////////////////////////////////////////////////
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

    // EMR RJ
    ///////////////////////////////////////////////////////
    public function indexEMRRJ(Request $request)
    {
        $date = $request->input('date') ? $request->input('date') : Carbon::now()->format('d/m/Y');
        $page = $request->input('page') ? $request->input('page') : 1;
        $show = $request->input('show') ? $request->input('show') : 10;



        $queryPasienEMRRJ = $this->queryPasienEmrRJ($date, $show);
        $queryPasienEmrRJKelengkapanPengisianHarian = $this->queryPasienEmrRJKelengkapanPengisianHarian($date);

        //return view
        return inertia('RJ/PasienEMRRawatJalan', [
            'date' => $date,
            'page' => $page,
            'show' => $show,
            'queryPasienEMRRJ' => $queryPasienEMRRJ,
            'queryPasienEmrRJKelengkapanPengisianHarian' => $queryPasienEmrRJKelengkapanPengisianHarian
        ]);
    }

    public function queryPasienEmrRJ($dateRef, $show = 10)
    {
        $myRefstatusId = 'A';
        $myRefdate = $dateRef;

        $query = DB::table('rsview_rjkasir')
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
                'poli_id',
                'poli_desc',
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
                'datadaftarpolirj_json'
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

    public function queryPasienEmrRJKelengkapanPengisianHarian($dateRef): array
    {
        //total lengkap
        ////////////////////////////////////////////////
        $queryTotal = DB::table('rstxn_rjhdrs')
            ->select(
                DB::raw("to_char(rj_date,'dd/mm/yyyy') AS rj_date"),
                DB::raw("to_char(rj_date,'yyyymmdd') AS rj_date1"),
                'datadaftarpolirj_json'
            )
            ->where('rj_status', '!=', ['A', 'F'])
            ->where('klaim_id', '!=', 'KR')
            ->where(DB::raw("to_char(rj_date,'dd/mm/yyyy')"), '=', $dateRef)
            ->get();

        //    cari berdasarkan JSON Table
        // emr
        $queryLengkap = $queryTotal->filter(function ($item) {
            $datadaftarpolirj_json = json_decode($item->datadaftarpolirj_json, true);
            $anamnesa = isset($datadaftarpolirj_json['anamnesa']) ? 1 : 0;
            $pemeriksaan = isset($datadaftarpolirj_json['pemeriksaan']) ? 1 : 0;
            $penilaian = isset($datadaftarpolirj_json['penilaian']) ? 1 : 0;
            $procedure = isset($datadaftarpolirj_json['procedure']) ? 1 : 0;
            $diagnosis = isset($datadaftarpolirj_json['diagnosis']) ? 1 : 0;
            $perencanaan = isset($datadaftarpolirj_json['perencanaan']) ? 1 : 0;
            $prosentaseEMR =
                (($anamnesa + $pemeriksaan + $penilaian + $procedure + $diagnosis + $perencanaan) / 6) *
                100;

            if ($prosentaseEMR >= 80) {
                return 'x';
            }
        })->count();

        // DiagnosisIcd
        $queryDiagnosisIcd = $queryTotal->filter(function ($item) {
            $datadaftarpolirj_json = json_decode($item->datadaftarpolirj_json, true);
            $diagnosis = isset($datadaftarpolirj_json['diagnosis']) ? count($datadaftarpolirj_json['diagnosis']) : 0;
            if ($diagnosis > 0) {
                return 'x';
            }
        })->count();

        // SatuSehat
        $querySatuSehat = $queryTotal->filter(function ($item) {
            $datadaftarpolirj_json = json_decode($item->datadaftarpolirj_json, true);
            $satuSehatUuidRJ = isset($datadaftarpolirj_json['satuSehatUuidRJ']) ? count($datadaftarpolirj_json['satuSehatUuidRJ']) : 0;
            if ($satuSehatUuidRJ > 0) {
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


    // MJKN RJ
    ///////////////////////////////////////////////////////
    public function indexBookingMjkn(Request $request)
    {
        $month = $request->input('date') ? $request->input('date') : Carbon::now()->format('m/Y');
        $show = $request->input('show') ? $request->input('show') : 10;





        $queryBookingMjkn = $this->queryBookingMjkn($month);
        $queryBookingMjknCheckin = $this->queryBookingMjknCheckin($month);
        $queryBookingMjknBelum = $this->queryBookingMjknBelum($month);
        $queryBookingMjknBatal = $this->queryBookingMjknBatal($month);


        $queryDataBookingMjkn = $this->queryDataBookingMjkn($month, $show);

        //return view
        return inertia('RJ/BookingMJKN', [
            'date' => $month,
            'show' => $show,
            'queryBookingMjkn' => $queryBookingMjkn,
            'queryBookingMjknCheckin' => $queryBookingMjknCheckin,
            'queryBookingMjknBelum' => $queryBookingMjknBelum,
            'queryBookingMjknBatal' => $queryBookingMjknBatal,
            'queryDataBookingMjkn' => $queryDataBookingMjkn

        ]);
    }

    public function queryBookingMjkn($monthRef): Collection
    {

        $query = DB::table('referensi_mobilejkn_bpjs')->select(
            DB::raw("to_char(to_date(tanggalperiksa,'yyyy-mm-dd'),'dd/mm/yyyy') AS tanggalperiksa"),
            DB::raw("to_char(to_date(tanggalperiksa,'yyyy-mm-dd'),'yyyymmdd') AS tanggalperiksa1"),
            DB::raw("count(*) AS jml_kunjungan")
        )
            ->where(DB::raw("to_char(to_date(tanggalperiksa,'yyyy-mm-dd'),'mm/yyyy')"), '=', $monthRef)

            ->groupBy(DB::raw("to_char(to_date(tanggalperiksa,'yyyy-mm-dd'),'dd/mm/yyyy')"))
            ->groupBy(DB::raw("to_char(to_date(tanggalperiksa,'yyyy-mm-dd'),'yyyymmdd')"))
            ->orderBy('tanggalperiksa1',  'asc')
            ->get();


        return $query;
    }

    public function queryBookingMjknCheckin($monthRef): Collection
    {
        $query = DB::table('referensi_mobilejkn_bpjs')->select(
            DB::raw("to_char(to_date(tanggalperiksa,'yyyy-mm-dd'),'dd/mm/yyyy') AS tanggalperiksa"),
            DB::raw("to_char(to_date(tanggalperiksa,'yyyy-mm-dd'),'yyyymmdd') AS tanggalperiksa1"),
            DB::raw("count(*) AS jml_kunjungan")
        )
            ->where(DB::raw("to_char(to_date(tanggalperiksa,'yyyy-mm-dd'),'mm/yyyy')"), '=', $monthRef)
            ->where('status', '=', 'Checkin')
            ->groupBy(DB::raw("to_char(to_date(tanggalperiksa,'yyyy-mm-dd'),'dd/mm/yyyy')"))
            ->groupBy(DB::raw("to_char(to_date(tanggalperiksa,'yyyy-mm-dd'),'yyyymmdd')"))
            ->orderBy('tanggalperiksa1',  'asc')
            ->get();
        return $query;
    }

    public function queryBookingMjknBelum($monthRef): Collection
    {
        $query = DB::table('referensi_mobilejkn_bpjs')->select(
            DB::raw("to_char(to_date(tanggalperiksa,'yyyy-mm-dd'),'dd/mm/yyyy') AS tanggalperiksa"),
            DB::raw("to_char(to_date(tanggalperiksa,'yyyy-mm-dd'),'yyyymmdd') AS tanggalperiksa1"),
            DB::raw("count(*) AS jml_kunjungan")
        )
            ->where(DB::raw("to_char(to_date(tanggalperiksa,'yyyy-mm-dd'),'mm/yyyy')"), '=', $monthRef)
            ->where('status', '=', 'Belum')
            ->groupBy(DB::raw("to_char(to_date(tanggalperiksa,'yyyy-mm-dd'),'dd/mm/yyyy')"))
            ->groupBy(DB::raw("to_char(to_date(tanggalperiksa,'yyyy-mm-dd'),'yyyymmdd')"))
            ->orderBy('tanggalperiksa1',  'asc')
            ->get();
        return $query;
    }

    public function queryBookingMjknBatal($monthRef): Collection
    {
        $query = DB::table('referensi_mobilejkn_bpjs')->select(
            DB::raw("to_char(to_date(tanggalperiksa,'yyyy-mm-dd'),'dd/mm/yyyy') AS tanggalperiksa"),
            DB::raw("to_char(to_date(tanggalperiksa,'yyyy-mm-dd'),'yyyymmdd') AS tanggalperiksa1"),
            DB::raw("count(*) AS jml_kunjungan")
        )
            ->where(DB::raw("to_char(to_date(tanggalperiksa,'yyyy-mm-dd'),'mm/yyyy')"), '=', $monthRef)
            ->where('status', '=', 'Batal')
            ->groupBy(DB::raw("to_char(to_date(tanggalperiksa,'yyyy-mm-dd'),'dd/mm/yyyy')"))
            ->groupBy(DB::raw("to_char(to_date(tanggalperiksa,'yyyy-mm-dd'),'yyyymmdd')"))
            ->orderBy('tanggalperiksa1',  'asc')
            ->get();
        return $query;
    }

    public function queryDataBookingMjkn($monthRef, $show = 10)
    {

        $query = DB::table('referensi_mobilejkn_bpjs')
            ->select(
                'nobooking',
                'no_rawat',
                'nomorkartu',
                'nik',
                'nohp',
                'kodepoli',
                DB::raw("(select poli_desc from rsmst_polis where kd_poli_bpjs=referensi_mobilejkn_bpjs.kodepoli)poli_desc"),
                'pasienbaru',
                'norm',
                'kodedokter',
                DB::raw("(select dr_name from rsmst_doctors where kd_dr_bpjs=referensi_mobilejkn_bpjs.kodedokter and rownum = 1)dr_name "),
                DB::raw("to_char(to_date(tanggalperiksa,'yyyy-mm-dd'),'dd/mm/yyyy') as tanggalperiksa"),
                'jampraktek',
                'jeniskunjungan',
                'nomorreferensi',
                'nomorantrean',
                'angkaantrean',
                'estimasidilayani',
                'sisakuotajkn',
                'kuotajkn',
                'sisakuotanonjkn',
                'kuotanonjkn',
                'status',
                'validasi',
                'statuskirim',
                'keterangan_batal',
                'tanggalbooking',
                'daftardariapp',
                'reg_name',
                'address',
                DB::raw("to_char(to_date(tanggalperiksa,'yyyy-mm-dd'),'yyyymmdd') AS tanggalperiksa1"),
            )
            ->join('rsmst_pasiens', 'referensi_mobilejkn_bpjs.norm', 'rsmst_pasiens.reg_no')
            ->where(DB::raw("to_char(to_date(tanggalperiksa,'yyyy-mm-dd'),'mm/yyyy')"), '=', $monthRef)
            ->orderBy('tanggalperiksa1',  'asc')
            ->paginate($show);

        return $query;
    }


    // TaskId RJ
    ///////////////////////////////////////////////////////
    public function indexTaskIdRJ(Request $request)
    {
        $date = $request->input('date') ? $request->input('date') : Carbon::now()->format('d/m/Y');
        $page = $request->input('page') ? $request->input('page') : 1;
        $show = $request->input('show') ? $request->input('show') : 10;



        $queryPasienEMRRJ = $this->queryPasienEmrRJ($date, $show);
        $queryPasienEmrRJKelengkapanPengisianHarian = $this->queryPasienEmrRJKelengkapanPengisianHarian($date);

        //return view
        return inertia('RJ/PasienTaskIdRawatJalan', [
            'date' => $date,
            'page' => $page,
            'show' => $show,
            'queryPasienEMRRJ' => $queryPasienEMRRJ,
            'queryPasienEmrRJKelengkapanPengisianHarian' => $queryPasienEmrRJKelengkapanPengisianHarian
        ]);
    }
}
