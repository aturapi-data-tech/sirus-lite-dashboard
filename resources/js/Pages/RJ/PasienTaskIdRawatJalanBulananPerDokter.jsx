import PageLayout from '@/Layouts/PageLayout';
import { Table, Badge } from 'flowbite-react';
import { useSelector } from 'react-redux';
import CrudTopBar from '@/Components/CrudTopBar';
import { useEffect } from 'react';
import { router } from '@inertiajs/react'

export default function PasienEMRRawatJalanBulananPerDokter(props) {
    const { auth, date, queryPasienEMRRJBulananPerDokter, queryHasilPerDokter } = props;

    const selector = useSelector((state) => state.filter);


    useEffect(() => {
        console.log(queryPasienEMRRJBulananPerDokter);
        clearTimeout(window.dateRefimeout);
        window.dateRefimeout = setTimeout(() => {
            router.get(route(route().current()), { date: selector.filter.date || date, page: selector.filter.page, show: selector.filter.show, find: selector.filter.find }, { preserveState: true, replace: true, only: [] });
        }, 300);
    }, []);






    return (
        <PageLayout user={auth.user}>

            <div className='h-[calc(100vh-100px)]  p-4 bg-white border border-gray-200 rounded-lg shadow-sm '>

                <div className='flex justify-between'>
                    <div>
                        Jumlah Antrian : <span className='font-bold'>{queryPasienEMRRJBulananPerDokter.total}</span>
                    </div>
                </div>
                <CrudTopBar date={date}></CrudTopBar>

                <div className='h-[calc(100vh-180px)] overflow-auto'>
                    <Table hoverable>
                        <Table.Head className='sticky top-0'>
                            <Table.HeadCell>Dokter</Table.HeadCell>
                            <Table.HeadCell>Jumlah Pasien</Table.HeadCell>
                            <Table.HeadCell>Waktu Admisi 3-4</Table.HeadCell>
                            <Table.HeadCell>Waktu Poli 4-5</Table.HeadCell>
                            <Table.HeadCell>Waktu Apotek 6-7</Table.HeadCell>
                            <Table.HeadCell>Waktu Rajal 3-7</Table.HeadCell>



                        </Table.Head>
                        <Table.Body className="divide-y">
                            {queryHasilPerDokter && queryHasilPerDokter.length > 0 ? (
                                queryHasilPerDokter.map((item, index) => (
                                    <Table.Row key={index}>
                                        <Table.Cell className="font-medium text-gray-900 whitespace-nowrap">
                                            {item.nama_dokter}
                                        </Table.Cell>
                                        <Table.Cell>{item.jumlah_pasien}</Table.Cell>
                                        <Table.Cell>{item.waktu_tunggu_admisi} menit</Table.Cell>
                                        <Table.Cell>{item.waktu_tunggu_poli} menit</Table.Cell>
                                        <Table.Cell>{item.waktu_tunggu_apotek} menit</Table.Cell>
                                        <Table.Cell>{item.waktu_tunggu_rajal} menit</Table.Cell>

                                    </Table.Row>
                                ))
                            ) : (
                                <Table.Row>
                                    <Table.Cell colSpan={5} className="py-4 text-center">
                                        Data tidak tersedia
                                    </Table.Cell>
                                </Table.Row>
                            )}
                        </Table.Body>
                    </Table>

                    {/* <div className='sticky bottom-0 flex justify-end rounded-b-lg bg-gray-50'>
                        <PaginationData className="mt-6" links={queryPasienEMRRJBulananPerDokter.links} total={queryPasienEMRRJBulananPerDokter.total} from={queryPasienEMRRJBulananPerDokter.from} to={queryPasienEMRRJBulananPerDokter.to} current_page={queryPasienEMRRJBulananPerDokter.current_page} last_page={queryPasienEMRRJBulananPerDokter.last_page} />
                    </div> */}
                </div>

            </div>


        </PageLayout>

    );
}
