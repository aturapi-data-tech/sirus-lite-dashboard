import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function PageLayout({ user, header, children }) {

    return (
        <AuthenticatedLayout user={user}>
            <Head title="Dashboard" />

            <div>
                <div className="mx-auto sm:px-0">
                    <div className="grid h-[calc(100vh-68px)] overflow-auto bg-gray-100 shadow-sm justify-centeroverflow-hidden sm:rounded-lg">
                        <div className='px-4 py-4 '>

                            {children}

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout >
    );
}
