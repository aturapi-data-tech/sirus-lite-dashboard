<?php

namespace App\Http\Controllers\REKAMMEDIS;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Collection;
use carbon\Carbon;

class RekamMedisRawatInapController extends Controller
{

    private function queryData10BesarPenyakitInap($tahun): Collection
    {
        // Subquery untuk mendapatkan 10 diagnosa dengan kasus terbanyak
        $subQuery = DB::table('rsmst_mstdiags as a')
            ->join('rstxn_ridtls as b', 'a.diag_id', '=', 'b.diag_id')
            ->join('rstxn_rihdrs as c', 'c.rihdr_no', '=', 'b.rihdr_no')
            ->where('c.ri_status', '=', 'P')
            ->where(DB::raw("to_char(c.exit_date, 'yyyy')"), '=', $tahun)
            ->groupBy('a.diag_id')
            ->orderBy(DB::raw("COUNT(*)"), 'desc')
            ->limit(10)
            ->pluck('a.diag_id')
            ->toArray();

        $query = DB::table('rsmst_mstdiags as a')
            ->join('rstxn_ridtls as b', 'a.diag_id', '=', 'b.diag_id')
            ->join('rstxn_rihdrs as c', 'c.rihdr_no', '=', 'b.rihdr_no')
            ->join('rsmst_pasiens as d', 'c.reg_no', '=', 'd.reg_no')
            ->select(
                'a.diag_id',
                DB::raw("UPPER(a.diag_desc) as diag_desc"),
                DB::raw("COUNT(*) as jml"),
                DB::raw("
                CASE
                    WHEN (c.exit_date - d.birth_date)*24 BETWEEN 1 AND 23 THEN '1-23 jam'
                    WHEN (c.exit_date - d.birth_date) >= 1 AND (c.exit_date - d.birth_date) < 7 THEN '1-7 hari'
                    WHEN (c.exit_date - d.birth_date) >= 29 AND MONTHS_BETWEEN(c.exit_date, d.birth_date) < 3 THEN '29hari -<3bulan'
                    WHEN MONTHS_BETWEEN(c.exit_date, d.birth_date) >= 3 AND MONTHS_BETWEEN(c.exit_date, d.birth_date) < 6 THEN '3bulan -<6bulan'
                    WHEN MONTHS_BETWEEN(c.exit_date, d.birth_date) >= 6 AND MONTHS_BETWEEN(c.exit_date, d.birth_date) < 12 THEN '6bulan-11 bulan'
                    WHEN MONTHS_BETWEEN(c.exit_date, d.birth_date) >= 12 AND MONTHS_BETWEEN(c.exit_date, d.birth_date) < 60 THEN '1-4 tahun'
                    WHEN MONTHS_BETWEEN(c.exit_date, d.birth_date) >= 60 AND MONTHS_BETWEEN(c.exit_date, d.birth_date) < 120 THEN '5-9thn'
                    WHEN MONTHS_BETWEEN(c.exit_date, d.birth_date) >= 120 AND MONTHS_BETWEEN(c.exit_date, d.birth_date) < 180 THEN '10-14thn'
                    WHEN MONTHS_BETWEEN(c.exit_date, d.birth_date) >= 180 AND MONTHS_BETWEEN(c.exit_date, d.birth_date) < 240 THEN '15-19thn'
                    WHEN MONTHS_BETWEEN(c.exit_date, d.birth_date) >= 240 AND MONTHS_BETWEEN(c.exit_date, d.birth_date) < 300 THEN '20-24thn'
                    WHEN MONTHS_BETWEEN(c.exit_date, d.birth_date) >= 300 AND MONTHS_BETWEEN(c.exit_date, d.birth_date) < 360 THEN '25-29thn'
                    WHEN MONTHS_BETWEEN(c.exit_date, d.birth_date) >= 360 AND MONTHS_BETWEEN(c.exit_date, d.birth_date) < 420 THEN '30-34thn'
                    WHEN MONTHS_BETWEEN(c.exit_date, d.birth_date) >= 420 AND MONTHS_BETWEEN(c.exit_date, d.birth_date) < 480 THEN '35-39thn'
                    WHEN MONTHS_BETWEEN(c.exit_date, d.birth_date) >= 480 AND MONTHS_BETWEEN(c.exit_date, d.birth_date) < 540 THEN '40-44thn'
                    WHEN MONTHS_BETWEEN(c.exit_date, d.birth_date) >= 540 AND MONTHS_BETWEEN(c.exit_date, d.birth_date) < 600 THEN '45-49thn'
                    WHEN MONTHS_BETWEEN(c.exit_date, d.birth_date) >= 600 AND MONTHS_BETWEEN(c.exit_date, d.birth_date) < 660 THEN '50-54thn'
                    WHEN MONTHS_BETWEEN(c.exit_date, d.birth_date) >= 660 AND MONTHS_BETWEEN(c.exit_date, d.birth_date) < 720 THEN '55-59thn'
                    WHEN MONTHS_BETWEEN(c.exit_date, d.birth_date) >= 720 AND MONTHS_BETWEEN(c.exit_date, d.birth_date) < 780 THEN '60-64thn'
                    WHEN MONTHS_BETWEEN(c.exit_date, d.birth_date) >= 780 AND MONTHS_BETWEEN(c.exit_date, d.birth_date) < 840 THEN '65-69thn'
                    WHEN MONTHS_BETWEEN(c.exit_date, d.birth_date) >= 840 AND MONTHS_BETWEEN(c.exit_date, d.birth_date) < 900 THEN '70-74thn'
                    WHEN MONTHS_BETWEEN(c.exit_date, d.birth_date) >= 900 AND MONTHS_BETWEEN(c.exit_date, d.birth_date) < 960 THEN '75-79thn'
                    WHEN MONTHS_BETWEEN(c.exit_date, d.birth_date) >= 960 AND MONTHS_BETWEEN(c.exit_date, d.birth_date) < 1020 THEN '80-84thn'
                    WHEN MONTHS_BETWEEN(c.exit_date, d.birth_date) >= 1020 THEN '>=85thn'
                    ELSE 'Lainnya'
                END as age_group
            ")
            )
            ->where('c.ri_status', '=', 'P')
            ->where(DB::raw("to_char(c.exit_date, 'yyyy')"), '=', $tahun)
            ->whereIn('a.diag_id', $subQuery)
            ->groupBy(
                'a.diag_id',
                'a.diag_desc',
                DB::raw("
                CASE
                    WHEN (c.exit_date - d.birth_date)*24 BETWEEN 1 AND 23 THEN '1-23 jam'
                    WHEN (c.exit_date - d.birth_date) >= 1 AND (c.exit_date - d.birth_date) < 7 THEN '1-7 hari'
                    WHEN (c.exit_date - d.birth_date) >= 29 AND MONTHS_BETWEEN(c.exit_date, d.birth_date) < 3 THEN '29hari -<3bulan'
                    WHEN MONTHS_BETWEEN(c.exit_date, d.birth_date) >= 3 AND MONTHS_BETWEEN(c.exit_date, d.birth_date) < 6 THEN '3bulan -<6bulan'
                    WHEN MONTHS_BETWEEN(c.exit_date, d.birth_date) >= 6 AND MONTHS_BETWEEN(c.exit_date, d.birth_date) < 12 THEN '6bulan-11 bulan'
                    WHEN MONTHS_BETWEEN(c.exit_date, d.birth_date) >= 12 AND MONTHS_BETWEEN(c.exit_date, d.birth_date) < 60 THEN '1-4 tahun'
                    WHEN MONTHS_BETWEEN(c.exit_date, d.birth_date) >= 60 AND MONTHS_BETWEEN(c.exit_date, d.birth_date) < 120 THEN '5-9thn'
                    WHEN MONTHS_BETWEEN(c.exit_date, d.birth_date) >= 120 AND MONTHS_BETWEEN(c.exit_date, d.birth_date) < 180 THEN '10-14thn'
                    WHEN MONTHS_BETWEEN(c.exit_date, d.birth_date) >= 180 AND MONTHS_BETWEEN(c.exit_date, d.birth_date) < 240 THEN '15-19thn'
                    WHEN MONTHS_BETWEEN(c.exit_date, d.birth_date) >= 240 AND MONTHS_BETWEEN(c.exit_date, d.birth_date) < 300 THEN '20-24thn'
                    WHEN MONTHS_BETWEEN(c.exit_date, d.birth_date) >= 300 AND MONTHS_BETWEEN(c.exit_date, d.birth_date) < 360 THEN '25-29thn'
                    WHEN MONTHS_BETWEEN(c.exit_date, d.birth_date) >= 360 AND MONTHS_BETWEEN(c.exit_date, d.birth_date) < 420 THEN '30-34thn'
                    WHEN MONTHS_BETWEEN(c.exit_date, d.birth_date) >= 420 AND MONTHS_BETWEEN(c.exit_date, d.birth_date) < 480 THEN '35-39thn'
                    WHEN MONTHS_BETWEEN(c.exit_date, d.birth_date) >= 480 AND MONTHS_BETWEEN(c.exit_date, d.birth_date) < 540 THEN '40-44thn'
                    WHEN MONTHS_BETWEEN(c.exit_date, d.birth_date) >= 540 AND MONTHS_BETWEEN(c.exit_date, d.birth_date) < 600 THEN '45-49thn'
                    WHEN MONTHS_BETWEEN(c.exit_date, d.birth_date) >= 600 AND MONTHS_BETWEEN(c.exit_date, d.birth_date) < 660 THEN '50-54thn'
                    WHEN MONTHS_BETWEEN(c.exit_date, d.birth_date) >= 660 AND MONTHS_BETWEEN(c.exit_date, d.birth_date) < 720 THEN '55-59thn'
                    WHEN MONTHS_BETWEEN(c.exit_date, d.birth_date) >= 720 AND MONTHS_BETWEEN(c.exit_date, d.birth_date) < 780 THEN '60-64thn'
                    WHEN MONTHS_BETWEEN(c.exit_date, d.birth_date) >= 780 AND MONTHS_BETWEEN(c.exit_date, d.birth_date) < 840 THEN '65-69thn'
                    WHEN MONTHS_BETWEEN(c.exit_date, d.birth_date) >= 840 AND MONTHS_BETWEEN(c.exit_date, d.birth_date) < 900 THEN '70-74thn'
                    WHEN MONTHS_BETWEEN(c.exit_date, d.birth_date) >= 900 AND MONTHS_BETWEEN(c.exit_date, d.birth_date) < 960 THEN '75-79thn'
                    WHEN MONTHS_BETWEEN(c.exit_date, d.birth_date) >= 960 AND MONTHS_BETWEEN(c.exit_date, d.birth_date) < 1020 THEN '80-84thn'
                    WHEN MONTHS_BETWEEN(c.exit_date, d.birth_date) >= 1020 THEN '>=85thn'
                    ELSE 'Lainnya'
                END
            ")
            )
            ->get();

        return $query;
    }

    public function index10BesarPenyakitInap(Request $request)
    {
        $date = $request->input('date', Carbon::now()->format('Y'));
        $results = $this->queryData10BesarPenyakitInap($date);
        // Jalankan query untuk mengambil data dengan pengelompokan usia

        // Definisikan semua kelompok usia (kolom matriks)
        $ageGroups = [
            '1-23 jam',
            '1-7 hari',
            '29hari -<3bulan',
            '3bulan -<6bulan',
            '6bulan-11 bulan',
            '1-4 tahun',
            '5-9thn',
            '10-14thn',
            '15-19thn',
            '20-24thn',
            '25-29thn',
            '30-34thn',
            '35-39thn',
            '40-44thn',
            '45-49thn',
            '50-54thn',
            '55-59thn',
            '60-64thn',
            '65-69thn',
            '70-74thn',
            '75-79thn',
            '80-84thn',
            '>=85thn',
            'Lainnya'
        ];

        // Transformasikan data hasil query menjadi struktur matriks (pivot)
        $Data10BesarPenyakitInap = [];
        foreach ($results as $row) {
            // Gunakan diag_id sebagai key
            if (!isset($Data10BesarPenyakitInap[$row->diag_id])) {
                $Data10BesarPenyakitInap[$row->diag_id] = [
                    'diag_id'   => $row->diag_id,
                    'diag_desc' => $row->diag_desc,
                ];
                // Inisialisasi setiap kolom kelompok usia dengan nilai 0
                foreach ($ageGroups as $group) {
                    $Data10BesarPenyakitInap[$row->diag_id][$group] = 0;
                }
            }
            // Isi jumlah (jml) pada kolom yang sesuai dengan age_group
            $Data10BesarPenyakitInap[$row->diag_id][$row->age_group] = $row->jml;
        }

        // Re-index array agar menghasilkan array numerik (opsional)
        $Data10BesarPenyakitInap = collect($Data10BesarPenyakitInap)
            ->map(function ($item) use ($ageGroups) {
                // Hitung total kasus berdasarkan key ageGroups
                $total = collect($ageGroups)->reduce(function ($carry, $key) use ($item) {
                    return $carry + (int)$item[$key];
                }, 0);
                $item['total'] = $total;
                return $item;
            })
            ->sortByDesc('total')
            ->values(); // re-index array


        //return view
        return inertia('REKAMMEDIS/Data10BesarPenyakitInap', [
            'date' => $date,
            'Data10BesarPenyakitInap' => $Data10BesarPenyakitInap,
        ]);
    }
}
