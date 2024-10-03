import { router } from '@inertiajs/react'
import { useDispatch, useSelector } from 'react-redux';
import { setFilterPage } from '@/redux/slices/filterSlice';

export default function PaginationData(props) {
    const { links, total, from, to, current_page, last_page } = props;


    const dispatch = useDispatch();
    const selector = useSelector((state) => state.filter);

    const handlePageChange = (e) => {

        let currentPage = 0;
        if (e.target.value === 'Next &raquo;') {
            if (current_page === last_page) {
                dispatch(setFilterPage(last_page));
                currentPage = last_page;
            } else {
                dispatch(setFilterPage(current_page + 1));
                currentPage = current_page + 1;
            }
        } else if (e.target.value === '&laquo; Previous') {
            if (current_page === 1) {
                dispatch(setFilterPage(1));
                currentPage = 1;
            } else {
                dispatch(setFilterPage(current_page - 1));
                currentPage = current_page - 1;
            }
        }
        else {
            dispatch(setFilterPage(e.target.value));
            currentPage = e.target.value;
        }

        clearTimeout(window.pageRefimeout);
        window.pageRefimeout = setTimeout(() => {
            selector.filter.date.trim() === "" || selector.filter.date === null ?
                router.get(route(route().current()), {}, { preserveState: true, replace: true, only: [] })
                :
                router.get(route(route().current()), { date: selector.filter.date, page: currentPage, show: selector.filter.show }, { preserveState: true, replace: true, only: [] })
        }, 300);
    };


    const activePropert = (active, label) => {
        return active ?
            `z-10 flex items-center justify-center px-4 h-10 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white`
            :
            (label === 'Next &raquo;' && current_page === last_page) ?
                `flex items-center justify-center px-4 h-10 leading-tight text-gray-700 bg-gray-200 border border-gray-300 hover:bg-gray-200 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`
                : (label === '&laquo; Previous' && current_page === 1) ?
                    `flex items-center justify-center px-4 h-10 leading-tight text-gray-700 bg-gray-200 border border-gray-300 hover:bg-gray-200 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`
                    :
                    `flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`;
    }

    const disabledProperty = (value) => {
        return value === 'Next &raquo;' && current_page === last_page || value === '&laquo; Previous' && current_page === 1 ? true : false;
    }



    return (
        <nav>

            <span className="mx-4 text-sm text-gray-700 dark:text-gray-400">
                Showing <span className="font-semibold text-gray-900 dark:text-white">{from}</span> to <span className="font-semibold text-gray-900 dark:text-white">{to}</span> of <span className="font-semibold text-gray-900 dark:text-white">{total}</span> Entries
            </span>
            <ul className="inline-flex h-10 -space-x-px text-base">

                {links.map((item, index) => (
                    <li key={index}>
                        <button key={index} onClick={handlePageChange} value={item.label} className={activePropert(item.active, item.label)} dangerouslySetInnerHTML={{ __html: item.label }} disabled={disabledProperty(item.label)}>
                        </button>
                    </li>
                ))}
            </ul>
        </nav >
    );
}
