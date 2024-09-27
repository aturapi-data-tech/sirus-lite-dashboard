import React, { useState, useEffect } from 'react';
import PageLayout from '@/Layouts/PageLayout';
import { router, Head } from '@inertiajs/react'
import { TextInput, Button, Label, Table, Pagination, Badge } from 'flowbite-react';
export default function PasienEMRRawatJalan(props) {
    const { auth,
        dateRjRef,
        queryPasienEMRRJ,
    } = props;

    const [dateRef, setdateRef] = useState(dateRjRef);
    useEffect(() => {

        clearTimeout(window.dateRefTimeout);
        window.dateRefTimeout = setTimeout(() => {
            dateRef.trim() === "" || dateRef === null ?
                router.get(route(route().current()), {}, { preserveState: true, replace: true, only: [] })
                :
                router.get(route(route().current()), { dateRef: dateRef }, { preserveState: true, replace: true, only: [] })
        }, 300); // delay 300ms untuk live search
    }, [dateRef]);


    console.log(queryPasienEMRRJ)






    function TableDataRow(props) {
        const {
            item,
            index
        } = props;

        const datadaftar_json = JSON.parse(item?.datadaftarpolirj_json) || null;
        const anamnesa = (datadaftar_json?.anamnesa) ? 1 : 0 || 0
        const pemeriksaan = (datadaftar_json?.pemeriksaan) ? 1 : 0 || 0
        const penilaian = (datadaftar_json?.penilaian) ? 1 : 0 || 0
        const procedure = (datadaftar_json?.procedure) ? 1 : 0 || 0
        const diagnosis = (datadaftar_json?.diagnosis) ? 1 : 0 || 0
        const perencanaan = (datadaftar_json?.perencanaan) ? 1 : 0 || 0
        const prosentaseEMR =
            Math.floor(((anamnesa + pemeriksaan + penilaian + procedure + diagnosis + perencanaan) / 6) *
                100);

        const bgSelesaiPemeriksaan = (datadaftar_json?.perencanaan?.pengkajianMedis?.drPemeriksa) ? 'bg-green-100' : '' || ''
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

        const badgecolorKeluhanUtama = datadaftar_json?.anamnesa?.keluhanUtama?.keluhanUtama ? 'success' : 'failure';
        const badgecolorTTV = datadaftar_json?.pemeriksaan?.tandaVital?.suhu ? 'success' : 'failure';
        const badgecolorTTDPerawat = datadaftar_json?.anamnesa?.pengkajianPerawatan?.perawatPenerima ? 'success' : 'failure';
        const badgecolorPemeriksaan = datadaftar_json?.pemeriksaan?.tandaVital?.keadaanUmum ? 'success' : 'failure';
        const badgecolorPenilaian = datadaftar_json?.penilaian ? 'success' : 'failure';
        const badgecolorDiagnosisText = datadaftar_json?.diagnosisFreeText ? 'success' : 'failure';
        const badgecolorDiagnosisICDX = datadaftar_json?.diagnosis?.length || 0 ? 'success' : 'failure';
        const badgecolorTerapi = datadaftar_json?.perencanaan?.terapi?.terapi ? 'success' : 'failure';
        const badgecolorEresep = datadaftar_json?.eresep ? 'success' : 'failure';
        const badgecolorTTDDokter = datadaftar_json?.perencanaan?.pengkajianMedis?.drPemeriksa ? 'success' : 'failure';
        const badgecolorTTDAdministrasi = badgecolorAdministrasiRj;
        const badgecolorTelaahObat = datadaftar_json?.telaahResep ? 'success' : 'failure';
        const badgecolorTelaahResep = datadaftar_json?.telaahObat ? 'success' : 'failure';
        const badgecolorKirimSatuSehat = datadaftar_json?.satuSehatUuidRJ ? 'success' : 'failure';
        const badgecolorKirimDinkesTA = datadaftar_json?.satuDataKesehatanTulungagung ? 'success' : 'failure';

        return (
            <>
                {/* <Table.Row className={`bg-white dark:border-gray-700 dark:bg-gray-800 ${bgSelesaiPemeriksaan}`} key={'TableDataRow' + index} > */}
                <Table.Row className={`bg-white dark:border-gray-700 dark:bg-gray-800`} key={'TableDataRow' + index} >

                    <Table.Cell className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <div className="">
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
                        <div>
                            <div className="font-semibold text-primary">
                                {item.rj_date}
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
                        <div className='grid justify-center w-full grid-cols-3 gap-1 rounded-lg'>
                            <Badge color={badgecolorKeluhanUtama}>Keluhan Utama</Badge>
                            <Badge color={badgecolorTTV}>TTV</Badge>
                            <Badge color={badgecolorTTDPerawat}>TTD Perawat</Badge>
                            <Badge color={badgecolorPemeriksaan}>Pemeriksaan</Badge>
                            <Badge color={badgecolorPenilaian}>Penilaian</Badge>
                            <Badge color={badgecolorDiagnosisText}>Diagnosis Text</Badge>
                            <Badge color={badgecolorDiagnosisICDX}>Diagnosis ICDX</Badge>
                            <Badge color={badgecolorTerapi}>Terapi</Badge>
                            <Badge color={badgecolorEresep}>E-resep</Badge>
                            <Badge color={badgecolorTTDDokter}>TTD Dokter</Badge>
                            <Badge color={badgecolorTTDAdministrasi}>TTD Administrasi</Badge>
                            <Badge color={badgecolorTelaahObat}>Telaah Obat</Badge>
                            <Badge color={badgecolorTelaahResep}>Telaah Resep</Badge>
                            <Badge color={badgecolorKirimSatuSehat}>Kirim Satu Sehat</Badge>
                            <Badge color={badgecolorKirimDinkesTA}>Kirim DinkesTA</Badge>

                        </div>
                    </Table.Cell>
                    <Table.Cell>
                        {item.reg_name}
                    </Table.Cell>

                </Table.Row >
            </>
        );
    }

    // function PaginationData(props) {
    //     const { mycurrentPage, myPage, myTotalPages } = props
    //     const [currentPage, setCurrentPage] = useState(mycurrentPage);

    //     const onPageChange = () => setCurrentPage(myPage);

    //     return (
    //         <div className="flex items-center justify-center space-x-4 text-gray-700 flow-x-auto">
    //             <div className='text-xs'>
    //                 <p>Tampil
    //                     <span className='mx-1 font-semibold'>10</span> ke
    //                     <span className='mx-1 font-semibold'>10</span> dari
    //                     <span className='mx-1 font-semibold'>{myTotalPages}</span>
    //                     Data
    //                 </p>
    //             </div>
    //             <Pagination currentPage={currentPage} totalPages={myTotalPages} onPageChange={onPageChange} />
    //         </div >
    //     );
    // }

    return (
        <PageLayout user={auth.user}>

            <div className='h-[calc(100vh-100px)]  p-4 bg-white border border-gray-200 rounded-lg shadow-sm '>

                <div className='grid grid-cols-12 mb-2'>
                    <Label htmlFor="base" value="Base input" />
                    <TextInput id="query" type="text" sizing="md" value={dateRef} onChange={(e) => setdateRef(e.target.value)} />
                </div>

                <div className='h-[calc(100vh-220px)] overflow-auto'>
                    <Table striped hoverable>
                        <Table.Head className='sticky top-0'>
                            <Table.HeadCell >Pasien</Table.HeadCell>
                            <Table.HeadCell >Poli</Table.HeadCell>
                            <Table.HeadCell >Status Layanan</Table.HeadCell>
                            <Table.HeadCell >Status EMR</Table.HeadCell>
                            <Table.HeadCell >Action</Table.HeadCell>

                        </Table.Head>
                        <Table.Body className="divide-y">
                            {queryPasienEMRRJ.map((item, index) => (
                                <TableDataRow item={item} index={index} key={index} />
                            ))}
                        </Table.Body>
                    </Table>
                </div>
                <div className='flex justify-end'>
                    {/* <PaginationData mycurrentPage={queryPasienEMRRJ.current_page} myPage={queryPasienEMRRJ.per_page} myTotalPages={queryPasienEMRRJ.total} /> */}
                </div>
            </div>

            {/* <div className='h-[calc(100vh-100px)]  p-4 bg-white border border-gray-200 rounded-lg shadow-sm '>

                <div className='grid grid-cols-12 mb-2'>
                    <Label htmlFor="base" value="Base input" />
                    <TextInput id="query" type="text" sizing="md" value={dateRef} onChange={(e) => setdateRef(e.target.value)} />
                </div>

                <div className='h-[calc(100vh-220px)] overflow-auto'>
                    <Table striped hoverable>
                        <Table.Head className='sticky top-0'>
                            <Table.HeadCell >Pasien</Table.HeadCell>
                            <Table.HeadCell >Poli</Table.HeadCell>
                            <Table.HeadCell >Status Layanan</Table.HeadCell>
                            <Table.HeadCell >Status EMR</Table.HeadCell>
                            <Table.HeadCell >Action</Table.HeadCell>

                        </Table.Head>
                        <Table.Body className="divide-y">
                            {queryPasienEMRRJ.data.map((item, index) => (
                                <TableDataRow item={item} index={index} key={index} />
                            ))}
                        </Table.Body>
                    </Table>
                </div>
                <div className='flex justify-end'>
                    <PaginationData mycurrentPage={queryPasienEMRRJ.current_page} myPage={queryPasienEMRRJ.per_page} myTotalPages={queryPasienEMRRJ.total} />
                </div>
            </div> */}

        </PageLayout>
    );
}
