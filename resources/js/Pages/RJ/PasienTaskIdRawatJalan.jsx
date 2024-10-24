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


    function TaskIdStatus(props) {
        const { status } = props;
        console.log(status);
        let icon;

        if (status) {
            icon = (
                <svg className="w-8 h-8 text-green-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z" clipRule="evenodd" />
                </svg>
            );
        } else {
            icon = (
                <svg className="w-8 h-8 text-red-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v5a1 1 0 1 0 2 0V8Zm-1 7a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H12Z" clipRule="evenodd" />
                </svg>
            );
        }

        return (
            <>
                {icon}
            </>
        );
    }

    function TaskId(props) {
        const { taskId1, taskId2, taskId3, taskId4, taskId5, taskId6, taskId7, status } = props;
        const bgtaskId1 = taskId1 !== '00/00/0000 00:00:00' ? 'bg-green-200' : 'bg-gray-100';
        const bgtaskId2 = taskId2 !== '00/00/0000 00:00:00' ? 'bg-green-200' : 'bg-gray-100';
        const bgtaskId3 = taskId3 !== '00/00/0000 00:00:00' ? 'bg-green-200' : 'bg-gray-100';
        const bgtaskId4 = taskId4 !== '00/00/0000 00:00:00' ? 'bg-green-200' : 'bg-gray-100';
        const bgtaskId5 = taskId5 !== '00/00/0000 00:00:00' ? 'bg-green-200' : 'bg-gray-100';
        const bgtaskId6 = taskId6 !== '00/00/0000 00:00:00' ? 'bg-green-200' : 'bg-gray-100';
        const bgtaskId7 = taskId7 !== '00/00/0000 00:00:00' ? 'bg-green-200' : 'bg-gray-100';



        return (
            <>
                <ol className="items-center text-center sm:flex">
                    <li className="relative mb-6 sm:mb-0">
                        <div className="flex items-center">
                            <div className={`z-10 flex items-center justify-center w-6 h-6 ${bgtaskId1} rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0`}>
                                <svg className="w-2.5 h-2.5 text-gray-800 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                </svg>
                            </div>
                            <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                        </div>
                        <div className={`mt-3 sm:pe-0 ${bgtaskId1} rounded-lg mx-1`}>
                            <h3 className="font-semibold text-gray-900 text- dark:text-white">TaskId1</h3>
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
                        <div className={`mt-3 sm:pe-0 ${bgtaskId2} rounded-lg mx-1`}>
                            <h3 className="font-semibold text-gray-900 text- dark:text-white">TaskId2</h3>
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
                        <div className={`mt-3 sm:pe-0 ${bgtaskId3} rounded-lg mx-1`}>
                            <h3 className="font-semibold text-gray-900 text- dark:text-white">TaskId3</h3>
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
                        <div className={`mt-3 sm:pe-0 ${bgtaskId4} rounded-lg mx-1`}>
                            <h3 className="font-semibold text-gray-900 text- dark:text-white">TaskId4</h3>
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
                        <div className={`mt-3 sm:pe-0 ${bgtaskId5} rounded-lg mx-1`}>
                            <h3 className="font-semibold text-gray-900 text- dark:text-white">TaskId5</h3>
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
                        <div className={`mt-3 sm:pe-0 ${bgtaskId6} rounded-lg mx-1`}>
                            <h3 className="font-semibold text-gray-900 text- dark:text-white">TaskId6</h3>
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
                        <div className={`mt-3 sm:pe-0 ${bgtaskId7} rounded-lg mx-1`}>
                            <h3 className="font-semibold text-gray-900 text- dark:text-white">TaskId7</h3>
                            <time className="block mb-2 text-sm font-normal leading-none text-gray-700 dark:text-gray-500">{taskId7}</time>
                            <p className="text-xs font-normal text-gray-500 dark:text-gray-700">Keluar Apotek</p>
                        </div>
                    </li >

                    <TaskIdStatus status={status}></TaskIdStatus>

                </ol >
                <div className='grid grid-cols-3 gap-2 mt-2 text-center text-gray-900'>
                    <p>
                        Waktu Tunggu Polli : {'xxxx'}
                    </p>
                    <p>
                        Waktu Layanan Polli : {'xxxx'}
                    </p>
                    <p>
                        Waktu Layanan Apotek : {'xxxx'}
                    </p>
                </div>
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

        const taskId1 = datadaftar_json?.taskIdPelayanan?.taskId1 || '00/00/0000 00:00:00';
        const taskId2 = datadaftar_json?.taskIdPelayanan?.taskId2 || '00/00/0000 00:00:00';
        const taskId3 = datadaftar_json?.taskIdPelayanan?.taskId3 || '00/00/0000 00:00:00';
        const taskId4 = datadaftar_json?.taskIdPelayanan?.taskId4 || '00/00/0000 00:00:00';
        const taskId5 = datadaftar_json?.taskIdPelayanan?.taskId5 || '00/00/0000 00:00:00';
        const taskId6 = datadaftar_json?.taskIdPelayanan?.taskId6 || '00/00/0000 00:00:00';
        const taskId7 = datadaftar_json?.taskIdPelayanan?.taskId7 || '00/00/0000 00:00:00';

        const taskIdStatus = () => {
            if (taskId1 !== '00/00/0000 00:00:00'
                && taskId2 !== '00/00/0000 00:00:00'
                && taskId3 !== '00/00/0000 00:00:00'
                && taskId4 !== '00/00/0000 00:00:00'
                && taskId5 !== '00/00/0000 00:00:00'
                && taskId6 !== '00/00/0000 00:00:00'
                && taskId7 !== '00/00/0000 00:00:00') { return true; }
            else if (taskId1 !== '00/00/0000 00:00:00'
                && taskId2 !== '00/00/0000 00:00:00'
                && taskId3 !== '00/00/0000 00:00:00'
                && taskId4 !== '00/00/0000 00:00:00'
                && taskId5 !== '00/00/0000 00:00:00') { return true; }
            else if (taskId3 !== '00/00/0000 00:00:00'
                && taskId4 !== '00/00/0000 00:00:00'
                && taskId5 !== '00/00/0000 00:00:00') { return true; }
            else {
                return false;
            }
        }

        return (
            <>
                <Table.Row className={` dark:border-gray-700 dark:bg-gray-800 ${taskIdStatus() ? 'bg-white' : 'bg-red-100'}`} key={'TableDataRow' + index} >
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
                        <div>{taskId7}{'zzz'}{taskIdStatus()}</div>
                        <TaskId
                            taskId1={taskId1}
                            taskId2={taskId2}
                            taskId3={taskId3}
                            taskId4={taskId4}
                            taskId5={taskId5}
                            taskId6={taskId6}
                            taskId7={taskId7}
                            status={taskIdStatus()}
                        ></TaskId>
                    </Table.Cell>
                </Table.Row >
            </>
        );
    }


    function ChartUmumBpjs(props) {
        const { dateRef, data } = props;

        const TaskIdLengkap = [data.queryTotal];
        const TaskIdLengkapDesc = 'Lengkap';

        const TaskIdTidakLengkap = [data.queryLengkap];
        const TaskIdTidakLengkapDesc = 'Tidak Lengkap';


        const rjDate = [dateRef];


        return (
            <div className='bg-white border border-gray-200 rounded-lg shadow-sm'>
                <div className='grid grid-cols-2 mx-2 '>
                    <MyApexCharts myType={'bar'} myWidth={'100%'} myCategories={rjDate} myData={[
                        {
                            data: TaskIdLengkap,
                            name: TaskIdLengkapDesc
                        },
                        {
                            data: TaskIdTidakLengkap,
                            name: TaskIdTidakLengkapDesc
                        }
                    ]}
                        myChartTitle={'Task Id ' + rjDate} />



                </div>
            </div>
        )
    }

    return (
        <PageLayout user={auth.user}>

            <div className='mb-4'>
                <ChartUmumBpjs
                    data={queryPasienEmrRJKelengkapanPengisianHarian}
                    dateRef={selector.filter.date} />
            </div>


            <div className='h-[calc(100vh-100px)]  p-4 bg-white border border-gray-200 rounded-lg shadow-sm '>

                <CrudTopBar date={date}></CrudTopBar>

                <div className='h-[calc(100vh-180px)] overflow-auto'>
                    <Table hoverable>
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
