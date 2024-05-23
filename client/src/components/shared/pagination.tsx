import React from 'react';
import { clsx } from 'clsx';
import { Icon } from '@iconify/react';

function Pagination({ totalPages, page, setPage }) {
  const pagesArray = Array(totalPages)
    .fill()
    .map((_, index) => index + 1);
  const isFirstPage = page === 1;
  const isLastPage = page === totalPages;
  return (
    <div className="flex justify-center">
      <nav className="flex" role="navigation" aria-label="Navigation">
        <div className="mr-2">
          <button
            disabled={isFirstPage}
            onClick={() => {
              setPage((page) => page - 1);
            }}
            className={clsx(
              'inline-flex items-center justify-center rounded leading-5 px-2.5 py-2 bg-white border border-slate-200 ',
              isFirstPage
                ? 'text-slate-300'
                : 'hover:bg-indigo-400  text-slate-600 hover:text-white shadow-sm cursor-pointer'
            )}
          >
            <span className="sr-only">Previous</span>
            <wbr />

            <Icon
              className="h-4 w-4 fill-current"
              icon="ic:round-arrow-back-ios"
            />
          </button>
        </div>
        <div className="inline-flex text-sm font-medium -space-x-px shadow-sm">
          {pagesArray &&
            pagesArray.map((pageNum) => {
              return (
                <button
                  onClick={() => {
                    setPage(pageNum);
                  }}
                  className={clsx(
                    'inline-flex items-center justify-center  leading-5 px-3.5 py-2  border border-slate-200 focus:outline-none ',
                    pageNum !== page
                      ? 'bg-gray-50 text-indigo-500  hover:bg-indigo-400 hover:text-white'
                      : 'text-black cursor-pointer bg-white'
                  )}
                >
                  {pageNum}
                </button>
              );
            })}
        </div>
        <div className="ml-2">
          <button
            disabled={isLastPage}
            onClick={() => {
              setPage((page) => page + 1);
            }}
            className={clsx(
              'inline-flex items-center justify-center rounded leading-5 px-2.5 py-2 bg-white  border border-slate-200 ',
              isLastPage
                ? 'text-slate-300'
                : 'hover:bg-indigo-400  text-slate-600 hover:text-white shadow-sm cursor-pointer'
            )}
          >
            <span className="sr-only">Next</span>
            <wbr />
            <Icon
              className="h-4 w-4 fill-current"
              icon="ic:round-arrow-forward-ios"
            />
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Pagination;
