import PageLayout from '@/Layouts/PageLayout';
import { Table, Badge } from 'flowbite-react';
import PaginationData from '@/Components/PaginationData';
import { useSelector } from 'react-redux';
import CrudTopBar from '@/Components/CrudTopBar';
import { useEffect } from 'react';
import { router } from '@inertiajs/react'
import moment from 'moment';


export default function Data10BesarPenyakitInap(props) {
    const { auth, date, Data10BesarPenyakitInap } = props;

    const selector = useSelector((state) => state.filter);


    useEffect(() => {
        console.log(Data10BesarPenyakitInap.length);
        clearTimeout(window.dateRefimeout);
        window.dateRefimeout = setTimeout(() => {
            router.get(route(route().current()), { date: selector.filter.date || date, page: selector.filter.page, show: selector.filter.show, find: selector.filter.find }, { preserveState: true, replace: true, only: [] });
        }, 300);
    }, []);


    const ageGroups = [
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





    return (

        <PageLayout user={auth.user}>
            <div className='h-[calc(100vh-100px)]  p-4 bg-white border border-gray-200 rounded-lg shadow-sm '>

                <CrudTopBar date={date}></CrudTopBar>

                <div className='h-[calc(100vh-180px)] w-[calc(187vh)] overflow-auto'>
                    <Table hoverable>
                        <Table.Head className="sticky top-0">
                            <Table.HeadCell>Diagnosis ID</Table.HeadCell>
                            <Table.HeadCell>Diagnosis Description</Table.HeadCell>
                            {ageGroups.map((group, index) => (
                                <Table.HeadCell key={index}>{group}</Table.HeadCell>
                            ))}
                            <Table.HeadCell>Jumlah</Table.HeadCell>

                        </Table.Head>

                        <Table.Body className="divide-y">
                            {Data10BesarPenyakitInap.length > 0 ? (
                                Data10BesarPenyakitInap.map((row, idx) => (
                                    <Table.Row key={idx}>
                                        <Table.Cell className="font-medium text-gray-900 whitespace-nowrap">
                                            {row.diag_id}
                                        </Table.Cell>
                                        <Table.Cell>{row.diag_desc}</Table.Cell>
                                        {ageGroups.map((group, i) => (
                                            <Table.Cell key={i}>{row[group]}</Table.Cell>
                                        ))}
                                        <Table.Cell className="font-medium text-gray-900 whitespace-nowrap">
                                            {ageGroups.reduce((total, group) => total + Number(row[group] || 0), 0)}
                                        </Table.Cell>
                                    </Table.Row>
                                ))
                            ) : (
                                <Table.Row>
                                    <Table.Cell colSpan={3 + ageGroups.length} className="py-4 text-center">
                                        Data tidak tersedia
                                    </Table.Cell>
                                </Table.Row>
                            )}
                        </Table.Body>
                    </Table>


                </div>

            </div>


        </PageLayout>
    );
}
