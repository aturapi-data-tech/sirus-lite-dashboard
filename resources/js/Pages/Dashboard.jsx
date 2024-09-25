import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import MyApexCharts from '@/Layouts/Chart/MyApexCharts';
import { Head } from '@inertiajs/react';

import PasienRawatJalan from '@/Pages/RJ/PasienRawatJalan'

export default function Dashboard({ auth, myData, mySearch }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Dashboard" />

            <div>
                <div className="mx-auto sm:px-0">
                    <div className="grid h-[calc(100vh-68px)] bg-white shadow-sm justify-centeroverflow-hidden sm:rounded-lg">
                        {/* <div className="p-2 my-auto text-center text-gray-900">You're logged in! {auth.user.name}</div> */}

                        <div className='grid grid-cols-2 gap-4'>
                            <MyApexCharts type={'line'} width={'100%'} />
                            <MyApexCharts type={'bar'} width={'100%'} />
                            <div>
                                <PasienRawatJalan myData={myData} mySearch={mySearch} />
                            </div>
                        </div>



                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
