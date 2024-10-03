import { TextInput, Button } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { router } from '@inertiajs/react'
import { HiSearch, HiPlus } from "react-icons/hi";
import ShowData from '@/Components/ShowData';
import { setFilterDate, setFilterPage } from '@/redux/slices/filterSlice';
import { useEffect } from 'react';

export default function CrudTopBar(props) {
    const { date = '' } = props;

    const dispatch = useDispatch();
    const selector = useSelector((state) => state.filter);

    // RESET URL ketika date berubah
    const handleDateChange = (e) => {
        dispatch(setFilterDate(e.target.value));

        clearTimeout(window.dateRefimeout);
        window.dateRefimeout = setTimeout(() => {
            selector.filter.date.trim() === "" || selector.filter.date === null ?
                router.get(route(route().current()), {}, { preserveState: true, replace: true, only: [] })
                :
                router.get(route(route().current()), { date: e.target.value, page: selector.filter.page, show: selector.filter.show }, { preserveState: true, replace: true, only: [] });
        }, 300);
    };


    useEffect(() => {
        // RESET PAGE ketika date dan page berubah
        if (selector.filter.date || selector.filter.page) {
            dispatch(setFilterPage(1));
        }
    })





    return (
        <div className='flex justify-between px-4 py-2 my-2 border-b border-gray-200 '>
            <div className='flex justify-between gap-x-2'>

                <div>
                    <TextInput id="Tanggal" type="text" sizing="md" className='w-32' value={selector.filter.date || date} onChange={handleDateChange} />
                </div>
                <div className=''>
                    <TextInput id="search"
                        placeholder="Search..."
                        type="text"
                        sizing="md"
                        icon={HiSearch}
                        className=''
                    />
                </div>

            </div>

            <div className='flex gap-x-2'>
                <Button size="md" color='blue'> <HiPlus className="w-4 h-4 my-auto mr-2 -ml-2" />Tambah Data</Button>
                <ShowData />
            </div>
        </div>
    );
}
