import PageLayout from '@/Layouts/PageLayout';
import { Table, Badge } from 'flowbite-react';
import PaginationData from '@/Components/PaginationData';
import { useSelector } from 'react-redux';
import CrudTopBar from '@/Components/CrudTopBar';
import { useEffect } from 'react';
import { router } from '@inertiajs/react'
import moment from 'moment';


export default function LogJknMobile(props) {
    const { auth, date, queryLogJknMobile } = props;

    const selector = useSelector((state) => state.filter);


    useEffect(() => {
        clearTimeout(window.dateRefimeout);
        window.dateRefimeout = setTimeout(() => {
            router.get(route(route().current()), { date: selector.filter.date || date, page: selector.filter.page, show: selector.filter.show, find: selector.filter.find }, { preserveState: true, replace: true, only: [] });
        }, 300);
    }, []);






    function TableDataRow(props) {
        const {
            item,
            index
        } = props;

        return (
            <>
                <Table.Row className={` dark:border-gray-700 dark:bg-gray-800`} key={'TableDataRow' + index} >
                    <Table.Cell className="font-medium text-gray-900">
                        <div className="font-semibold text-primary">
                            {item.datetime}
                        </div>
                    </Table.Cell>

                    <Table.Cell>
                        <div className="font-normal text-gray-900">
                            {item.request}
                        </div>
                    </Table.Cell>

                    <Table.Cell>
                        <div className="font-normal text-gray-900">
                            {item.response}
                        </div>
                    </Table.Cell>
                </Table.Row >
            </>
        );
    }



    return (
        <PageLayout user={auth.user}>

            <div className='h-[calc(100vh-100px)]  p-4 bg-white border border-gray-200 rounded-lg shadow-sm '>

                <div className='flex justify-between'>
                    <div>
                        Jumlah Antrian : <span className='font-bold'>{queryLogJknMobile.total}</span>
                    </div>
                </div>

                <CrudTopBar date={date}></CrudTopBar>

                <div className='h-[calc(100vh-180px)] overflow-auto'>
                    <Table hoverable>
                        <Table.Head className='sticky top-0'>
                            <Table.HeadCell>Tanggal Log</Table.HeadCell>
                            <Table.HeadCell>Request</Table.HeadCell>
                            <Table.HeadCell>Response</Table.HeadCell>

                        </Table.Head>
                        <Table.Body className="divide-y">
                            {queryLogJknMobile.data.map((item, index) => (
                                <TableDataRow item={item} index={index} key={index} />
                            ))}
                        </Table.Body>
                    </Table>

                    <div className='sticky bottom-0 flex justify-end rounded-b-lg bg-gray-50'>
                        <PaginationData className="mt-6" links={queryLogJknMobile.links} total={queryLogJknMobile.total} from={queryLogJknMobile.from} to={queryLogJknMobile.to} current_page={queryLogJknMobile.current_page} last_page={queryLogJknMobile.last_page} />
                    </div>
                </div>

            </div>

        </PageLayout>

    );
}
