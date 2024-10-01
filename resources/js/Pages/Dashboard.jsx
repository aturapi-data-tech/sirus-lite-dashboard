// import React from 'react';
// import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageLayout from '@/Layouts/PageLayout';
import MyApexCharts from '@/Layouts/Chart/MyApexCharts';

// import PasienRawatJalan from '@/Pages/RJ/PasienRawatJalan'

export default function Dashboard(props) {
    const { auth,
        queryPasienRJUmum,
        queryPasienRJBpjs,
        queryPasienRJKronis,
        queryPasienRJUmumPrevYear,
        queryPasienRJBpjsPrevYear,
        queryPasienRJKronisPrevYear } = props;

    const rjDateUmum = queryPasienRJUmum.map(item => item.rj_date);
    const jmlKunjunganUmum = queryPasienRJUmum.map(item => item.jml_kunjungan);

    const rjDateBpjs = queryPasienRJBpjs.map(item => item.rj_date);
    const jmlKunjunganBpjs = queryPasienRJBpjs.map(item => item.jml_kunjungan);

    const rjDateKronis = queryPasienRJKronis.map(item => item.rj_date);
    const jmlKunjunganKronis = queryPasienRJKronis.map(item => item.jml_kunjungan);


    const rjDateUmumPrevYear = queryPasienRJUmumPrevYear.map(item => item.rj_date);
    const jmlKunjunganUmumPrevYear = queryPasienRJUmumPrevYear.map(item => item.jml_kunjungan);

    const rjDateBpjsPrevYear = queryPasienRJBpjsPrevYear.map(item => item.rj_date);
    const jmlKunjunganBpjsPrevYear = queryPasienRJBpjsPrevYear.map(item => item.jml_kunjungan);

    const rjDateKronisPrevYear = queryPasienRJKronisPrevYear.map(item => item.rj_date);
    const jmlKunjunganKronisPrevYear = queryPasienRJKronisPrevYear.map(item => item.jml_kunjungan);

    return (
        <PageLayout user={auth.user}>

            <div className='bg-white border border-gray-200 rounded-lg shadow-sm'>

                <div className='mt-6 text-6xl font-semibold text-center text-gray-900'>Tahun Berjalan</div>
                <div className='grid grid-cols-2 gap-2 mx-2 '>
                    <MyApexCharts myType={'line'} myWidth={'100%'} myCategories={rjDateUmum} myData={[
                        {
                            data: jmlKunjunganUmum,
                            name: 'Umum'
                        },
                        {
                            data: jmlKunjunganBpjs,
                            name: 'Bpjs'
                        },
                        {
                            data: jmlKunjunganKronis,
                            name: 'Kronis'
                        },
                    ]}
                        myChartTitle={'Pasien Rawat Jalan'} />

                    <MyApexCharts myType={'bar'} myWidth={'100%'} myCategories={rjDateUmum} myData={[{
                        data: jmlKunjunganUmum,
                        name: 'Umum'
                    }]} myChartTitle={'Pasien Rawat Jalan Umum'} />
                    <MyApexCharts myType={'bar'} myWidth={'100%'} myCategories={rjDateBpjs} myData={[{
                        data: jmlKunjunganBpjs,
                        name: 'Bpjs'
                    }]} myChartTitle={'Pasien Rawat Jalan BPJS'} />
                    <MyApexCharts myType={'bar'} myWidth={'100%'} myCategories={rjDateKronis} myData={[{
                        data: jmlKunjunganKronis,
                        name: 'Kronis'
                    }]} myChartTitle={'Pasien Rawat Jalan Kronis'} />

                </div>
            </div>


            <div className='mt-6 text-6xl font-semibold text-center text-gray-900'>Tahun Lalu</div>
            <div className='grid grid-cols-2 gap-2'>

                <MyApexCharts myType={'line'} myWidth={'100%'} myCategories={rjDateUmumPrevYear} myData={[
                    {
                        data: jmlKunjunganUmumPrevYear,
                        name: 'Umum'
                    },
                    {
                        data: jmlKunjunganBpjsPrevYear,
                        name: 'Bpjs'
                    },
                    {
                        data: jmlKunjunganKronisPrevYear,
                        name: 'Kronis'
                    },
                ]}
                    myChartTitle={'Pasien Rawat Jalan'} />

                <MyApexCharts myType={'bar'} myWidth={'100%'} myCategories={rjDateUmumPrevYear} myData={[{
                    data: jmlKunjunganUmumPrevYear,
                    name: 'Umum'
                }]} myChartTitle={'Pasien Rawat Jalan Umum'} />
                <MyApexCharts myType={'bar'} myWidth={'100%'} myCategories={rjDateBpjsPrevYear} myData={[{
                    data: jmlKunjunganBpjsPrevYear,
                    name: 'Bpjs'
                }]} myChartTitle={'Pasien Rawat Jalan BPJS'} />
                <MyApexCharts myType={'bar'} myWidth={'100%'} myCategories={rjDateKronisPrevYear} myData={[{
                    data: jmlKunjunganKronisPrevYear,
                    name: 'Kronis'
                }]} myChartTitle={'Pasien Rawat Jalan Kronis'} />


            </div>

            {/* <div>
                                <PasienRawatJalan myData={myData} mySearch={mySearch} />
                            </div> */}

        </PageLayout >
    );
}
