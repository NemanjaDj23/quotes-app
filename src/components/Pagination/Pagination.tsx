import React from 'react';
import styles from './Pagination.module.scss';

type PaginationProps = {
  totalItems: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

function getVisiblePages(currentPage: number, totalPages: number) {
  const prevPage = Math.max(currentPage - 1, 1);
  const nextPage = Math.min(currentPage + 1, totalPages);
  return Array.from(new Set([1, prevPage, currentPage, nextPage, totalPages]));
}

function isFirstPageSeparatorVisible(page: number, currentPage: number, totalPages: number) {
  return page === 1 && Number(currentPage) > 3;
}

function isLastPageSeparatorVisible(page: number, currentPage: number, totalPages: number) {
  return page === totalPages && Number(currentPage) < totalPages - 2;
}

function Pagination({ totalItems, currentPage, pageSize, onPageChange }: PaginationProps) {
  const totalPages = Math.ceil(totalItems / pageSize);
  const visiblePages = getVisiblePages(Number(currentPage), totalPages);

  return (
    <>
      {totalPages > 1 && (
        <ul className={styles.paginationWrapper}>
          {visiblePages.map((page) => (
            <>
              {isLastPageSeparatorVisible(page, currentPage, totalPages) && <span>...</span>}
              <li key={page}>
                <button
                  className={page === Number(currentPage) ? styles.active : ''}
                  onClick={onPageChange}
                  value={page}
                  name='page'
                >
                  {page}
                </button>
              </li>
              {isFirstPageSeparatorVisible(page, currentPage, totalPages) && <span>...</span>}
            </>
          ))}
        </ul>
      )}
    </>
  );
}

export default React.memo(Pagination);
