import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div>
                <div className="mx-auto sm:px-0">
                    <div className="grid h-[calc(100vh-68px)] bg-white shadow-sm justify-centeroverflow-hidden sm:rounded-lg">
                        <div className="p-2 my-auto text-center text-gray-900">You're logged in!</div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
