import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setCurrentPage } from "@/redux/slices/client/games";
import styles from "./pagination.module.scss";

type PaginationProps = {
  totalItems: number;
  itemsPerPage: number;
};

export default function PaginationComponent({
  totalItems,
  itemsPerPage,
}: PaginationProps) {
  const { currentPage } = useAppSelector((state) => state?.client.games);
  const dispatch = useAppDispatch();
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const visiblePageCount = 5;
  const startPage = Math.max(1, currentPage - Math.floor(visiblePageCount / 2));
  const endPage = Math.min(totalPages, startPage + visiblePageCount - 1);
  const pages = [];

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  useEffect(() => {
    if (currentPage > totalPages) {
      dispatch(setCurrentPage(startPage));
    }
    if (currentPage <= 1) {
      dispatch(setCurrentPage(1));
    }
  }, [currentPage, dispatch, startPage, totalPages]);

  return (
    <div className={styles["pagination"]}>
      <button
        onClick={() => dispatch(setCurrentPage(currentPage - 1))}
        disabled={currentPage <= 1}
        className={
          currentPage <= 1
            ? styles["handlerBtn-disabled"]
            : styles["handlerBtn"]
        }
      >
        Prev
      </button>
      <div className={styles["numberBtns"]}>
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => dispatch(setCurrentPage(page))}
            disabled={currentPage === page}
            className={
              currentPage === page
                ? styles["numberBtnActive"]
                : styles["numberBtn"]
            }
          >
            {page}
          </button>
        ))}
      </div>
      <button
        onClick={() => dispatch(setCurrentPage(currentPage + 1))}
        disabled={currentPage >= totalPages}
        className={
          currentPage >= totalPages
            ? styles["handlerBtn-disabled"]
            : styles["handlerBtn"]
        }
      >
        Next
      </button>
    </div>
  );
}
