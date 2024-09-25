<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\RJ\PasienRawatJalanController;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $yearRjRef = Carbon::now()->format('Y');
        $yearRjRefPrevYear = $yearRjRef - 1;

        $search = $request->input('search');

        $myData = new PasienRawatJalanController;
        $queryMyData = $myData->queryMyData($search);

        $queryPasienRJUmum = $myData->queryPasienRJUmum($yearRjRef);
        $queryPasienRJBpjs = $myData->queryPasienRJBpjs($yearRjRef);
        $queryPasienRJKronis = $myData->queryPasienRJKronis($yearRjRef);


        $queryPasienRJUmumPrevYear = $myData->queryPasienRJUmum($yearRjRefPrevYear);
        $queryPasienRJBpjsPrevYear = $myData->queryPasienRJBpjs($yearRjRefPrevYear);
        $queryPasienRJKronisPrevYear = $myData->queryPasienRJKronis($yearRjRefPrevYear);

        //return view
        return inertia('Dashboard', [
            'myData' => $queryMyData,
            'mySearch' => $search,
            'queryPasienRJUmum' => $queryPasienRJUmum,
            'queryPasienRJBpjs' => $queryPasienRJBpjs,
            'queryPasienRJKronis' => $queryPasienRJKronis,
            'queryPasienRJUmumPrevYear' => $queryPasienRJUmumPrevYear,
            'queryPasienRJBpjsPrevYear' => $queryPasienRJBpjsPrevYear,
            'queryPasienRJKronisPrevYear' => $queryPasienRJKronisPrevYear,

        ]);
    }
}
