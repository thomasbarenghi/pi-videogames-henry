import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentPage } from "../../../redux/actions/frontend/pagination";

export default function PaginationComponent({ totalItems, itemsPerPage }) {

    const { currentPage, gamesPerPage } = useSelector((state) => state?.frontGames);
    const dispatch = useDispatch();
  //  console.log('currentPage 1', currentPage);
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    // const pages = [];
    // for (let i = 1; i <= totalPages; i++) {pages.push(i);}

    const visiblePageCount = 5;
    const startPage = Math.max(1, currentPage - Math.floor(visiblePageCount / 2));
    const endPage = Math.min(totalPages, startPage + visiblePageCount - 1);
    const pages = [];

    for (let i = startPage; i <= endPage; i++) { pages.push(i); }
    //console.log("Total:", totalPages, "Actual:", currentPage, "Start:", startPage);

    useEffect(() => {
       // console.log('effect');
        if (currentPage > totalPages) {  dispatch(setCurrentPage(startPage)) };
        if (currentPage <= 1) { dispatch(setCurrentPage(1)) };
    }, [totalPages])

    return (
        <div>
            <button onClick={() => dispatch(setCurrentPage(currentPage - 1))} disabled={currentPage <= 1}>Prev</button>
            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => dispatch(setCurrentPage(page))}
                    disabled={currentPage === page}
                >
                    {page}
                </button>
            ))}
            <button onClick={() => dispatch(setCurrentPage(currentPage + 1))} disabled={currentPage >= totalPages}>Next</button>
        </div>
    );
}