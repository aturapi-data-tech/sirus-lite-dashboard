import PageLayout from '@/Layouts/PageLayout';
import { Table, Badge } from 'flowbite-react';
import PaginationData from '@/Components/PaginationData';
import MyApexCharts from '@/Layouts/Chart/MyApexCharts';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { router } from '@inertiajs/react'
import { TextInput } from 'flowbite-react';
import { useState } from 'react';


export default function PasienEMRRawatJalan(props) {
    const { auth, month, queryBookingMjkn, queryBookingMjknCheckin, queryBookingMjknBelum, queryBookingMjknBatal } = props;


    const [monthRef, setMonthRef] = useState(month);

    const selector = useSelector((state) => state.filter);

    useEffect(() => {
        clearTimeout(window.dateRefimeout);
        window.dateRefimeout = setTimeout(() => {
            router.get(route(route().current()), { month: monthRef }, { preserveState: true, replace: true, only: [] });
        }, 300);
    }, [monthRef]);

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
        const badgecolorKirimSatuSehat = datadaftar_json?.satuSehatUuidRJ?.length ? 'success' : 'failure';
        const badgecolorKirimDinkesTA = datadaftar_json?.satuDataKesehatanTulungagung ? 'success' : 'failure';

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


    function ChartMJKN(props) {
        const { monthRef, queryBookingMjkn, queryBookingMjknCheckin, queryBookingMjknBelum, queryBookingMjknBatal } = props;




        const queryBookingMjknProses = [];
        const queryBookingMjknCheckinProses = [];
        const queryBookingMjknBelumProses = [];
        const queryBookingMjknBatalProses = [];

        for (let i = 1; i <= 31; i++) {

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

        // const jmlKunjunganBelum = queryBookingMjknBelumProses.map(item => item.jml_kunjungan);
        // const jmlKunjunganDescBelum = queryBookingMjknBelumProses.map(item => item.tanggalperiksa);

        // const jmlKunjunganBatal = queryBookingMjknBatalProses.map(item => item.jml_kunjungan);
        // const jmlKunjunganDescBatal = queryBookingMjknBatalProses.map(item => item.tanggalperiksa);


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
                        // {
                        //     data: jmlKunjunganBelum,
                        //     name: 'Belum'
                        // }
                        // ,
                        // {
                        //     data: jmlKunjunganBatal,
                        //     name: 'Batal'
                        // }

                    ]}
                        myChartTitle={'Pendaftaran MJKN Bulan  ' + monthRef} />

                </div>
            </div>
        )
    }

    return (
        <PageLayout user={auth.user}>


            <div className='h-[calc(100vh-100px)]  p-4 bg-white border border-gray-200 rounded-lg shadow-sm '>


                <div>
                    <TextInput id="Bulan" type="text" sizing="md" className='w-32' value={monthRef} onChange={(e) => setMonthRef(e.target.value)} />
                </div>

                <div className='h-[calc(100vh-180px)] overflow-auto'>
                    <div className='my-2'>
                        <ChartMJKN
                            queryBookingMjkn={queryBookingMjkn}
                            queryBookingMjknCheckin={queryBookingMjknCheckin}
                            queryBookingMjknBelum={queryBookingMjknBelum}
                            queryBookingMjknBatal={queryBookingMjknBatal}
                            monthRef={monthRef} />
                    </div>


                </div>
            </div>

        </PageLayout>

    );
}
