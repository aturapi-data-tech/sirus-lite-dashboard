import PageLayout from '@/Layouts/PageLayout';
import { Table, Badge } from 'flowbite-react';
import PaginationData from '@/Components/PaginationData';
import MyApexCharts from '@/Layouts/Chart/MyApexCharts';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { router } from '@inertiajs/react'
import CrudTopBar from '@/Components/CrudTopBar';
import { setFilterDate } from '@/redux/slices/filterSlice';

export default function PasienEMRRawatJalan(props) {
    const { auth, date, queryBookingMjkn, queryBookingMjknCheckin, queryBookingMjknBelum, queryBookingMjknBatal, queryDataBookingMjkn } = props;


    const dispatch = useDispatch();
    const selector = useSelector((state) => state.filter);

    useEffect(() => {
        dispatch(setFilterDate(date));
        clearTimeout(window.dateRefimeout);
        window.dateRefimeout = setTimeout(() => {
            router.get(route(route().current()), { date: selector.filter.date || date, page: selector.filter.page, show: selector.filter.show }, { preserveState: true, replace: true, only: [] });
        }, 300);
    }, [dispatch, date, selector.filter.date, selector.filter.page, selector.filter.show]);


    function TableDataRow(props) {
        const {
            item,
            index
        } = props;


        return (
            <>
                <Table.Row className={`bg-white dark:border-gray-700 dark:bg-gray-800`} key={'TableDataRow' + index} >


                    <Table.Cell className="max-w-sm px-4 py-3 group-hover:bg-gray-100">
                        <div className="">
                            <div className="grid grid-cols-3 my-1 font-semibold text-primary">
                                NoBooking
                                {item.nobooking}
                            </div>
                            <div className="grid grid-cols-1 text-lg font-semibold text-gray-900">
                                {item.reg_name}
                            </div>
                            <div className="grid grid-cols-3 my-1 font-normal text-gray-900">
                                IdBPJS
                                {item.nomorkartu}
                            </div>
                            <div className="grid grid-cols-3 my-1 font-normal text-gray-900">
                                NIK
                                {item.nik}
                            </div>
                            <div className="grid grid-cols-1 font-normal text-gray-900">
                                {item.address}
                            </div>
                        </div>
                    </Table.Cell>


                    <Table.Cell className="max-w-sm px-4 py-3 group-hover:bg-gray-100">
                        <div className="">
                            <div className="font-semibold text-primary">
                                {item.kodepoli} /
                                {item.poli_desc}

                            </div>
                            <div className="font-semibold text-gray-900">
                                {item.kodedokter} /
                                {item.dr_name}
                            </div>
                            <div className="font-normal text-gray-900">
                                {'Nomer Pelayanan ' + item.nomorantrean}
                            </div>
                            <div className="font-normal text-gray-900">
                                {((('Jenis Kunjungan ' + item.jeniskunjungan == '1'
                                    ? '1 (Rujukan FKTP)'
                                    : item.jeniskunjungan == '2')
                                    ? '2 (Rujukan Internal)'
                                    : item.jeniskunjungan == '3')
                                    ? '3 (Kontrol)'
                                    : item.jeniskunjungan == '4')
                                    ? '4 (Rujukan Antar RS)'
                                    : 'Tidak ditemukan'}
                            </div>
                            <div>
                                NoReferensi
                                {item.nomorreferensi}
                            </div>
                        </div>
                    </Table.Cell>

                    <Table.Cell className="max-w-sm px-4 py-3 group-hover:bg-gray-100">
                        <div className="">
                            <div className="grid grid-flow-row gap-1 italic font-semibold text-gray-900">
                                Booking {item.tanggalbooking}
                                <br />
                                Tgl Periksa {item.tanggalperiksa}
                                <br />
                                {item.status}
                                <br />
                                {item.keterangan_batal}
                            </div>
                            <div className="font-normal text-gray-900">
                                {item.daftardariapp}
                            </div>
                        </div>
                    </Table.Cell>

                    <Table.Cell className="max-w-sm px-4 py-3 group-hover:bg-gray-100 group-hover:text-primary">
                        {item.reg_name}
                    </Table.Cell>

                </Table.Row >
            </>
        );
    }


    function ChartMJKN(props) {
        const { monthRef, queryBookingMjkn, queryBookingMjknCheckin, queryBookingMjknBelum, queryBookingMjknBatal } = props;




        const queryBookingMjknProses = [];
        const queryBookingMjknCheckinProses = [];
        const queryBookingMjknBelumProses = [];
        const queryBookingMjknBatalProses = [];

        const [month, year] = monthRef.split('/')
        function getLastDayOfMonth(year, month) {
            const date = new Date(year, month + 1, 0); // Set the day to 0 to get the last day of the previous month
            return date.getDate();
        }

        for (let i = 1; i <= getLastDayOfMonth(year, month); i++) {

            const monthRefFori = i.toString().padStart(2, '0') + '/' + monthRef;
            const originalDate = monthRefFori;
            const parts = originalDate.split("/");
            const formattedTanggalperiksa1 = `${parts[2]}${parts[1]}${parts[0]}`;

            const queryBookingMjknFiltered = queryBookingMjkn.filter(item => item.tanggalperiksa === monthRefFori);
            const queryBookingMjknFilteredresult = queryBookingMjknFiltered[0] || { tanggalperiksa: monthRefFori, tanggalperiksa1: formattedTanggalperiksa1, jml_kunjungan: '0' };
            queryBookingMjknProses.push(queryBookingMjknFilteredresult);

            const queryBookingMjknCheckinFiltered = queryBookingMjknCheckin.filter(item => item.tanggalperiksa === monthRefFori);
            const queryBookingMjknCheckinFilteredresult = queryBookingMjknCheckinFiltered[0] || { tanggalperiksa: monthRefFori, tanggalperiksa1: formattedTanggalperiksa1, jml_kunjungan: '0' };
            queryBookingMjknCheckinProses.push(queryBookingMjknCheckinFilteredresult);

            const queryBookingMjknBelumFiltered = queryBookingMjknBelum.filter(item => item.tanggalperiksa === monthRefFori);
            const queryBookingMjknBelumFilteredresult = queryBookingMjknBelumFiltered[0] || { tanggalperiksa: monthRefFori, tanggalperiksa1: formattedTanggalperiksa1, jml_kunjungan: '0' };
            queryBookingMjknBelumProses.push(queryBookingMjknBelumFilteredresult);

            const queryBookingMjknBatalFiltered = queryBookingMjknBatal.filter(item => item.tanggalperiksa === monthRefFori);
            const queryBookingMjknBatalFilteredresult = queryBookingMjknBatalFiltered[0] || { tanggalperiksa: monthRefFori, tanggalperiksa1: formattedTanggalperiksa1, jml_kunjungan: '0' };
            queryBookingMjknBatalProses.push(queryBookingMjknBatalFilteredresult);

        }

        const jmlKunjungan = queryBookingMjknProses.map(item => item.jml_kunjungan);
        const jmlKunjunganDesc = queryBookingMjknProses.map(item => item.tanggalperiksa);

        const jmlKunjunganCheckin = queryBookingMjknCheckinProses.map(item => item.jml_kunjungan);
        const jmlKunjunganDescCheckin = queryBookingMjknCheckinProses.map(item => item.tanggalperiksa);

        const jmlKunjunganBelum = queryBookingMjknBelumProses.map(item => item.jml_kunjungan);
        const jmlKunjunganDescBelum = queryBookingMjknBelumProses.map(item => item.tanggalperiksa);

        const jmlKunjunganBatal = queryBookingMjknBatalProses.map(item => item.jml_kunjungan);
        const jmlKunjunganDescBatal = queryBookingMjknBatalProses.map(item => item.tanggalperiksa);


        return (
            <div className='bg-white border border-gray-200 rounded-lg shadow-sm'>
                <div className='grid grid-cols-1 mx-2 '>
                    <MyApexCharts myType={'line'} myWidth={'60%'} myCategories={jmlKunjunganDesc} myData={[
                        {
                            data: jmlKunjungan,
                            name: 'Mjkn'
                        },
                        {
                            data: jmlKunjunganCheckin,
                            name: 'Checkin'
                        }
                        ,
                        {
                            data: jmlKunjunganBelum,
                            name: 'Belum'
                        }
                        ,
                        {
                            data: jmlKunjunganBatal,
                            name: 'Batal'
                        }

                    ]}
                        myChartTitle={'Pendaftaran MJKN Bulan  ' + monthRef} />

                </div>
            </div>
        )
    }

    return (
        <PageLayout user={auth.user}>


            <div className='h-[calc(100vh-100px)]  p-4 bg-white border border-gray-200 rounded-lg shadow-sm '>


                <div className='h-[calc(100vh-180px)] overflow-auto'>
                    <div className='my-2'>
                        <ChartMJKN
                            queryBookingMjkn={queryBookingMjkn}
                            queryBookingMjknCheckin={queryBookingMjknCheckin}
                            queryBookingMjknBelum={queryBookingMjknBelum}
                            queryBookingMjknBatal={queryBookingMjknBatal}
                            monthRef={selector.filter.date} />
                    </div>





                    <CrudTopBar date={selector.filter.date}></CrudTopBar>

                    <div className='h-[calc(100vh-180px)] overflow-auto'>
                        <Table striped hoverable>
                            <Table.Head className='sticky top-0'>
                                <Table.HeadCell>
                                    Pasien
                                </Table.HeadCell>
                                <Table.HeadCell>
                                    Poli
                                </Table.HeadCell>
                                <Table.HeadCell>
                                    Status Layanan
                                </Table.HeadCell>
                                <Table.HeadCell>
                                    Action
                                </Table.HeadCell>

                            </Table.Head>
                            <Table.Body className="divide-y">
                                {queryDataBookingMjkn.data.map((item, index) => (
                                    <TableDataRow item={item} index={index} key={index} />
                                ))}
                            </Table.Body>
                        </Table>

                        <div className='sticky bottom-0 flex justify-end rounded-b-lg bg-gray-50'>
                            <PaginationData className="mt-6" links={queryDataBookingMjkn.links} total={queryDataBookingMjkn.total} from={queryDataBookingMjkn.from} to={queryDataBookingMjkn.to} current_page={queryDataBookingMjkn.current_page} last_page={queryDataBookingMjkn.last_page} />
                        </div>
                    </div>



                </div>
            </div>

        </PageLayout>

    );
}
