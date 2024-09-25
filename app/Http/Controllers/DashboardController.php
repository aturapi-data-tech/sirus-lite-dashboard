<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\RJ\PasienRawatJalanController;

class DashboardController extends Controller
{
    public function index(Request $request)
    {

        $search = $request->input('search');

        $myData = new PasienRawatJalanController;
        $myData = $myData->queryMyData($search);

        //return view
        return inertia('Dashboard', [
            'myData' => $myData,
            'mySearch' => $search
        ]);
    }
}
