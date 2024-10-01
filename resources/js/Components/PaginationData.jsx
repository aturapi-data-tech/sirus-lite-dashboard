import { useState } from "react";

export function PaginationData(props) {
    const { links, total, from, to, current_page, last_page } = props;
    const [currentPage, setCurrentPage] = useState(1);

    function activePropert(activePropert, current_page, last_page) {

        return activePropert == currentPage ?
            `z-10 flex items-center justify-center px-4 h-10 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white`
            :
            `flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`;
    }
    const handleCurrentPage = (e) => {
        e.preventDefault();
        setCurrentPage(e.target.value);
    };

    return (
        <nav aria-label="Page navigation example">

            <span className="mx-4 text-sm text-gray-700 dark:text-gray-400">
                Showing <span className="font-semibold text-gray-900 dark:text-white">{from}</span> to <span className="font-semibold text-gray-900 dark:text-white">{to}</span> of <span className="font-semibold text-gray-900 dark:text-white">{total}</span> Entries
            </span>
            <ul className="inline-flex h-10 -space-x-px text-base">

                {links.map((item, index) => (
                    <li key={index}>
                        <button key={index} onClick={handleCurrentPage} className={activePropert(item.active, item.current_page, item.last_page)} value={item.label}>
                            <div dangerouslySetInnerHTML={{ __html: item.label }}>
                            </div>
                        </button>
                    </li>
                ))}
            </ul>
        </nav >
    );
}
