import PageLayout from '@/Layouts/PageLayout';
import { Table, Badge } from 'flowbite-react';
import PaginationData from '@/Components/PaginationData';
import MyApexCharts from '@/Layouts/Chart/MyApexCharts';
import { useSelector } from 'react-redux';
import CrudTopBar from '@/Components/CrudTopBar';
import { useEffect } from 'react';
import { router } from '@inertiajs/react'


export default function PasienEMRRawatJalan(props) {
    const { auth, date, queryPasienEMRRJ, queryPasienEmrRJKelengkapanPengisianHarian } = props;




    const selector = useSelector((state) => state.filter);

    useEffect(() => {
        clearTimeout(window.dateRefimeout);
        window.dateRefimeout = setTimeout(() => {
            router.get(route(route().current()), { date: selector.filter.date || date, page: selector.filter.page, show: selector.filter.show }, { preserveState: true, replace: true, only: [] });
        }, 300);
    }, []);


    function TaskId(props) {
        const { taskId1, taskId2, taskId3, taskId4, taskId5, taskId6, taskId7 } = props;

        const bgtaskId1 = taskId1 !== 'xx/xx/xxxx xx:xx:xx' ? 'bg-green-200' : 'bg-gray-100';
        const bgtaskId2 = taskId2 !== 'xx/xx/xxxx xx:xx:xx' ? 'bg-green-200' : 'bg-gray-100';
        const bgtaskId3 = taskId3 !== 'xx/xx/xxxx xx:xx:xx' ? 'bg-green-200' : 'bg-gray-100';
        const bgtaskId4 = taskId4 !== 'xx/xx/xxxx xx:xx:xx' ? 'bg-green-200' : 'bg-gray-100';
        const bgtaskId5 = taskId5 !== 'xx/xx/xxxx xx:xx:xx' ? 'bg-green-200' : 'bg-gray-100';
        const bgtaskId6 = taskId6 !== 'xx/xx/xxxx xx:xx:xx' ? 'bg-green-200' : 'bg-gray-100';
        const bgtaskId7 = taskId7 !== 'xx/xx/xxxx xx:xx:xx' ? 'bg-green-200' : 'bg-gray-100';

        return (
            <>
                <ol className="items-center sm:flex">
                    <li className="relative mb-6 sm:mb-0">
                        <div className="flex items-center">
                            <div className={`z-10 flex items-center justify-center w-6 h-6 ${bgtaskId1} rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0`}>
                                <svg className="w-2.5 h-2.5 text-gray-800 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                </svg>
                            </div>
                            <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                        </div>
                        <div className="mt-3 sm:pe-8">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">TaskId1</h3>
                            <time className="block mb-2 text-sm font-normal leading-none text-gray-700 dark:text-gray-500">{taskId1}</time>
                            <p className="text-xs font-normal text-gray-500 dark:text-gray-700">Masuk Admisi</p>
                        </div>
                    </li>
                    <li className="relative mb-6 sm:mb-0">
                        <div className="flex items-center">
                            <div className={`z-10 flex items-center justify-center w-6 h-6 ${bgtaskId2} rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0`}>
                                <svg className="w-2.5 h-2.5 text-gray-800 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                </svg>
                            </div>
                            <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                        </div>
                        <div className="mt-3 sm:pe-8">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">TaskId2</h3>
                            <time className="block mb-2 text-sm font-normal leading-none text-gray-700 dark:text-gray-500">{taskId2}</time>
                            <p className="text-xs font-normal text-gray-500 dark:text-gray-700">Selesai Admisi</p>
                        </div>
                    </li >
                    <li className="relative mb-6 sm:mb-0">
                        <div className="flex items-center">
                            <div className={`z-10 flex items-center justify-center w-6 h-6 ${bgtaskId3} rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0`}>
                                <svg className="w-2.5 h-2.5 text-gray-800 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                </svg>
                            </div>
                            <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                        </div>
                        <div className="mt-3 sm:pe-8">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">TaskId3</h3>
                            <time className="block mb-2 text-sm font-normal leading-none text-gray-700 dark:text-gray-500">{taskId3}</time>
                            <p className="text-xs font-normal text-gray-500 dark:text-gray-700">Daftar Poli</p>
                        </div>
                    </li >
                    <li className="relative mb-6 sm:mb-0">
                        <div className="flex items-center">
                            <div className={`z-10 flex items-center justify-center w-6 h-6 ${bgtaskId4} rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0`}>
                                <svg className="w-2.5 h-2.5 text-gray-800 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                </svg>
                            </div>
                            <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                        </div>
                        <div className="mt-3 sm:pe-8">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">TaskId4</h3>
                            <time className="block mb-2 text-sm font-normal leading-none text-gray-700 dark:text-gray-500">{taskId4}</time>
                            <p className="text-xs font-normal text-gray-500 dark:text-gray-700">Masuk Poli</p>
                        </div>
                    </li >
                    <li className="relative mb-6 sm:mb-0">
                        <div className="flex items-center">
                            <div className={`z-10 flex items-center justify-center w-6 h-6 ${bgtaskId5} rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0`}>
                                <svg className="w-2.5 h-2.5 text-gray-800 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                </svg>
                            </div>
                            <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                        </div>
                        <div className="mt-3 sm:pe-8">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">TaskId5</h3>
                            <time className="block mb-2 text-sm font-normal leading-none text-gray-700 dark:text-gray-500">{taskId5}</time>
                            <p className="text-xs font-normal text-gray-500 dark:text-gray-700">Keluar Poli</p>
                        </div>
                    </li >
                    <li className="relative mb-6 sm:mb-0">
                        <div className="flex items-center">
                            <div className={`z-10 flex items-center justify-center w-6 h-6 ${bgtaskId6} rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0`}>
                                <svg className="w-2.5 h-2.5 text-gray-800 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                </svg>
                            </div>
                            <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                        </div>
                        <div className="mt-3 sm:pe-8">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">TaskId6</h3>
                            <time className="block mb-2 text-sm font-normal leading-none text-gray-700 dark:text-gray-500">{taskId6}</time>
                            <p className="text-xs font-normal text-gray-500 dark:text-gray-700">Masuk Apotek</p>
                        </div>
                    </li >
                    <li className="relative mb-6 sm:mb-0">
                        <div className="flex items-center">
                            <div className={`z-10 flex items-center justify-center w-6 h-6 ${bgtaskId7} rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0`}>
                                <svg className="w-2.5 h-2.5 text-gray-800 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                </svg>
                            </div>
                        </div>
                        <div className="mt-3 sm:pe-8">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">TaskId7</h3>
                            <time className="block mb-2 text-sm font-normal leading-none text-gray-700 dark:text-gray-500">{taskId7}</time>
                            <p className="text-xs font-normal text-gray-500 dark:text-gray-700">Keluar Apotek</p>
                        </div>
                    </li >
                </ol >
            </>
        );
    }

    function TableDataRow(props) {
        const {
            item,
            index
        } = props;

        const datadaftar_json = JSON.parse(item?.datadaftarpolirj_json) || null;
        const anamnesa = (datadaftar_json?.anamnesa) ? 1 : 0 || 0;
        const pemeriksaan = (datadaftar_json?.pemeriksaan) ? 1 : 0 || 0;
        const penilaian = (datadaftar_json?.penilaian) ? 1 : 0 || 0;
        const procedure = (datadaftar_json?.procedure) ? 1 : 0 || 0;
        const diagnosis = (datadaftar_json?.diagnosis) ? 1 : 0 || 0;
        const perencanaan = (datadaftar_json?.perencanaan) ? 1 : 0 || 0;
        const prosentaseEMR =
            Math.floor(((anamnesa + pemeriksaan + penilaian + procedure + diagnosis + perencanaan) / 6) *
                100);

        const badgecolorEmr = prosentaseEMR >= 80 ? 'success' : 'failure';

        const badgecolorStatus = (item.rj_status === 'A'
            ? 'warning'
            : (item.rj_status === 'L'
                ? 'success'
                : (item.rj_status === 'I'
                    ? 'info'
                    : (item.rj_status === 'F'
                        ? 'failure'
                        : ''))))

        const badgecolorKlaim =
            item.klaim_id === 'UM'
                ? 'dark'
                : (item.klaim_id === 'JM'
                    ? 'success'
                    : (item.klaim_id === 'KR'
                        ? 'indigo'
                        : 'failure'));

        const badgecolorAdministrasiRj = datadaftar_json?.AdministrasiRj ? 'success' : 'failure';

        const taskId1 = datadaftar_json?.taskIdPelayanan?.taskId1 || 'xx/xx/xxxx xx:xx:xx';
        const taskId2 = datadaftar_json?.taskIdPelayanan?.taskId2 || 'xx/xx/xxxx xx:xx:xx';
        const taskId3 = datadaftar_json?.taskIdPelayanan?.taskId3 || 'xx/xx/xxxx xx:xx:xx';
        const taskId4 = datadaftar_json?.taskIdPelayanan?.taskId4 || 'xx/xx/xxxx xx:xx:xx';
        const taskId5 = datadaftar_json?.taskIdPelayanan?.taskId5 || 'xx/xx/xxxx xx:xx:xx';
        const taskId6 = datadaftar_json?.taskIdPelayanan?.taskId6 || 'xx/xx/xxxx xx:xx:xx';
        const taskId7 = datadaftar_json?.taskIdPelayanan?.taskId7 || 'xx/xx/xxxx xx:xx:xx';




        return (
            <>
                {/* <Table.Row className={`bg-white dark:border-gray-700 dark:bg-gray-800 ${bgSelesaiPemeriksaan}`} key={'TableDataRow' + index} > */}
                <Table.Row className={`bg-white dark:border-gray-700 dark:bg-gray-800`} key={'TableDataRow' + index} >

                    <Table.Cell className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <div className="">
                            {/* <div className="text-sm font-semibold text-gray-500 text-primary">
                                Record ke <span className='text-3xl text-gray-900'>{index + 1}</span>
                            </div> */}
                            <div className="font-semibold text-primary">
                                {item.reg_no}
                            </div>
                            <div className="font-semibold text-gray-900">
                                {item.reg_name + ' / (' + item.sex + ')' + ' / ' + item.thn}
                            </div>
                            <div className="font-normal text-gray-900">
                                {item.address}
                            </div>
                        </div>

                        <div className='pt-4'>
                            <div className="font-semibold text-primary">
                                {item.rj_date + ' / Shift' + item.shift}
                            </div>
                            <div className="flex italic font-semibold text-gray-900">
                                <Badge color={badgecolorStatus}>
                                    {(item.rj_status === 'A'
                                        ? 'Pelayanan '
                                        : (item.rj_status === 'L'
                                            ? 'Selesai Pelayanan '
                                            : (item.rj_status === 'I'
                                                ? 'Transfer Inap '
                                                : (item.rj_status === 'F'
                                                    ? 'Batal Transaksi '
                                                    : ''))))
                                    }
                                </Badge>

                                / Emr : <Badge color={badgecolorEmr}>{prosentaseEMR}%</Badge>
                                {/* {anamnesa} + {pemeriksaan} + {penilaian} + {procedure} + {diagnosis} + {perencanaan} */}

                            </div>
                            <div className="font-normal text-gray-900">
                                {'' + item.nobooking}
                            </div>

                            <div className="font-normal text-gray-700">
                                <Badge color={badgecolorAdministrasiRj}>
                                    Administrasi : {datadaftar_json?.AdministrasiRj?.userLog || ' ---'}
                                </Badge>
                            </div>

                        </div>
                    </Table.Cell>
                    <Table.Cell>
                        <div className="">
                            <div className="font-semibold text-primary">
                                {item.poli_desc}
                            </div>
                            <div className="font-semibold text-gray-900">
                                {item.dr_name + ' / '}
                                <Badge color={badgecolorKlaim}>
                                    {item.klaim_id == 'UM'
                                        ? 'UMUM'
                                        : (item.klaim_id == 'JM'
                                            ? 'BPJS'
                                            : (item.klaim_id == 'KR'
                                                ? 'Kronis'
                                                : 'Asuransi Lain'))}
                                </Badge>

                            </div>
                            <div className="font-normal text-gray-900">
                                {'Nomer Pelayanan ' + item.no_antrian}
                            </div>
                            <div className="font-normal">
                                {item.vno_sep}
                            </div>
                        </div>
                    </Table.Cell>
                    <Table.Cell>
                        <TaskId
                            taskId1={taskId1}
                            taskId2={taskId2}
                            taskId3={taskId3}
                            taskId4={taskId4}
                            taskId5={taskId5}
                            taskId6={taskId6}
                            taskId7={taskId7}
                        ></TaskId>
                    </Table.Cell>
                </Table.Row >
            </>
        );
    }




    return (
        <PageLayout user={auth.user}>


            <div className='h-[calc(100vh-100px)]  p-4 bg-white border border-gray-200 rounded-lg shadow-sm '>

                <CrudTopBar date={date}></CrudTopBar>

                <div className='h-[calc(100vh-180px)] overflow-auto'>
                    <Table striped hoverable>
                        <Table.Head className='sticky top-0'>
                            <Table.HeadCell>Pasien</Table.HeadCell>
                            <Table.HeadCell>Poli</Table.HeadCell>
                            <Table.HeadCell>Status Layanan</Table.HeadCell>

                        </Table.Head>
                        <Table.Body className="divide-y">
                            {queryPasienEMRRJ.data.map((item, index) => (
                                <TableDataRow item={item} index={index} key={index} />
                            ))}
                        </Table.Body>
                    </Table>

                    <div className='sticky bottom-0 flex justify-end rounded-b-lg bg-gray-50'>
                        <PaginationData className="mt-6" links={queryPasienEMRRJ.links} total={queryPasienEMRRJ.total} from={queryPasienEMRRJ.from} to={queryPasienEMRRJ.to} current_page={queryPasienEMRRJ.current_page} last_page={queryPasienEMRRJ.last_page} />
                    </div>
                </div>

            </div>

        </PageLayout>

    );
}
