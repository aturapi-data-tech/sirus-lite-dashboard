// import React, { useState, useEffect } from 'react';
import { useState, useEffect } from 'react';

import PageLayout from '@/Layouts/PageLayout';
import MyApexCharts from '@/Layouts/Chart/MyApexCharts';
import { router } from '@inertiajs/react'


import { TextInput, Button } from 'flowbite-react';

export default function PasienRawatJalanPoli(props) {
    const { auth,
        poli,
        yearRjRef,
        queryPasienRJUmumPoli,
        queryPasienRJBpjsPoli,
        queryPasienRJKronisPoli } = props;

    const [kodePoli, setKodePoli] = useState(poli.poli_id);

    const handleKodePoli = (e) => {
        setKodePoli(e.target.value);
    };




    const [yearRef, setYearRef] = useState(yearRjRef);



    useEffect(() => {

        console.log(poli);
        clearTimeout(window.kodePoliTimeout);
        window.kodePoliTimeout = setTimeout(() => {
            kodePoli.trim() === "" || kodePoli === null ?
                router.get(route(route().current()), {}, { preserveState: true, replace: true, only: [] })
                :
                router.get(route(route().current()), { kodePoli: kodePoli, yearRef: yearRef }, { preserveState: true, replace: true, only: [] })
        }, 300); // delay 300ms untuk live search
    }, [kodePoli, yearRef]);


    const rjDatePoli = queryPasienRJUmumPoli.map(item => item.rj_date);

    const jmlKunjunganUmumPoli = queryPasienRJUmumPoli.map(item => item.jml_kunjungan);
    const jmlKunjunganBpjsPoli = queryPasienRJBpjsPoli.map(item => item.jml_kunjungan);
    const jmlKunjunganKronisPoli = queryPasienRJKronisPoli.map(item => item.jml_kunjungan);


    return (
        <PageLayout user={auth.user}>

            <div className='bg-white border border-gray-200 rounded-lg shadow-sm'>

                <div className='mt-6 text-6xl font-semibold text-center text-gray-900'>Poli {poli.poli_desc} Tahun {yearRef} </div>

                <div className='grid grid-cols-2 gap-2 my-4 mx-80'>
                    <div>
                        <TextInput label="Poli" type="text" placeholder="Kode Poli" value={kodePoli} onChange={handleKodePoli} />
                    </div>
                    <div>
                        <TextInput label="Tahun" type="text" placeholder="Tahun[yyyy]" value={yearRef} onChange={(e) => setYearRef(e.target.value)} />
                    </div>


                </div>

                <div className='grid grid-cols-2 gap-2 mx-2 '>
                    <MyApexCharts myType={'line'} myWidth={'100%'} myCategories={rjDatePoli} myData={[
                        {
                            data: jmlKunjunganUmumPoli,
                            name: 'Umum'
                        },
                        {
                            data: jmlKunjunganBpjsPoli,
                            name: 'Bpjs'
                        },
                        {
                            data: jmlKunjunganKronisPoli,
                            name: 'Kronis'
                        },
                    ]}
                        myChartTitle={'Pasien Rawat Jalan'} />

                    <MyApexCharts myType={'bar'} myWidth={'100%'} myCategories={rjDatePoli} myData={[{
                        data: jmlKunjunganUmumPoli,
                        name: 'Umum'
                    }]} myChartTitle={'Pasien Rawat Jalan Umum'} />
                    <MyApexCharts myType={'bar'} myWidth={'100%'} myCategories={rjDatePoli} myData={[{
                        data: jmlKunjunganBpjsPoli,
                        name: 'Bpjs'
                    }]} myChartTitle={'Pasien Rawat Jalan BPJS'} />
                    <MyApexCharts myType={'bar'} myWidth={'100%'} myCategories={rjDatePoli} myData={[{
                        data: jmlKunjunganKronisPoli,
                        name: 'Kronis'
                    }]} myChartTitle={'Pasien Rawat Jalan Kronis'} />

                </div>
            </div>

        </PageLayout >
    );
}
