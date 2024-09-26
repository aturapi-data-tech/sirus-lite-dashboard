import React, { useState, useEffect } from "react";
import { Head, router } from '@inertiajs/react'
import { Label, TextInput } from "flowbite-react";
import PageLayout from '@/Layouts/PageLayout';


export default function PasienRawatJalan({ auth, myData, mySearch }) {
    const [search, setSearch] = useState(mySearch || "");

    useEffect(() => {
        clearTimeout(window.searchTimeout);

        window.searchTimeout = setTimeout(() => {
            search.trim() === "" || search === null ?
                router.get(route(route().current()), {}, { preserveState: true, replace: true, only: ["myData"] })
                :
                router.get(route(route().current()), { search: search }, { preserveState: true, replace: true, only: ["myData"] })
        }, 300); // delay 300ms untuk live search
    }, [search]);



    return (

        <PageLayout user={auth.user}>

            <Head title="Pasien Rawat Jalan" />
            <div>{search}</div>
            <div>
                <div className="block mb-2">
                    <Label htmlFor="base" value="Base input" />
                </div>
                <TextInput id="query" type="text" sizing="md" onChange={(e) => setSearch(e.target.value)} />
            </div>


            <table>
                <thead>
                    <tr>
                        <th>Nama Dokter</th>
                    </tr>
                </thead>
                <tbody>
                    {myData.map((data, index) => (
                        <tr key={index}>
                            <td>{data.dr_name}</td>
                            <td className="text-center">

                            </td>
                        </tr>

                    ))}
                </tbody>
            </table>
        </PageLayout>

    );
}
