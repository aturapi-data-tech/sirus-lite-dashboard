import { router } from '@inertiajs/react'
import { useDispatch, useSelector } from 'react-redux';
import { setFilterShow } from '@/redux/slices/filterSlice';
import { Dropdown } from "flowbite-react";

export default function ShowData() {
    const showData = [
        { showNumber: 5 },
        { showNumber: 10 },
        { showNumber: 20 },
        { showNumber: 50 },
        { showNumber: 100 }
    ];

    const dispatch = useDispatch();
    const selector = useSelector((state) => state.filter);


    const handledShowChange = (showNumber) => {
        dispatch(setFilterShow(showNumber));
        clearTimeout(window.showRefimeout);
        window.showRefimeout = setTimeout(() => {
            selector.filter.date.trim() === "" || selector.filter.date === null ?
                router.get(route(route().current()), {}, { preserveState: true, replace: true, only: [] })
                :
                router.get(route(route().current()), { date: selector.filter.date, page: selector.filter.page, show: showNumber }, { preserveState: true, replace: true, only: [] })
        }, 300);
    };






    return (
        <Dropdown label={selector.filter.show} placement="bottom" color="light">
            {showData.map((item, index) => (
                <Dropdown.Item key={index} onClick={() => handledShowChange(item.showNumber)} value={item.showNumber}>
                    {item.showNumber}
                </Dropdown.Item>
            ))}
        </Dropdown>
    );
}
