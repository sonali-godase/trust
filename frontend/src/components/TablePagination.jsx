import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const TablePagination = ({
  currentPage,
  totalPages,
  setCurrentPage,
  totalItems,
  itemsPerPage,
  setItemsPerPage
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t border-gray-100 bg-white">
      <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
        <span>Show</span>
        <select
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
          className="border border-gray-200 rounded-md px-2 py-1 focus:outline-none focus:border-saffron-500"
        >
          {[5, 10, 25, 50].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        <span>entries</span>
        <span className="ml-4">
          Total: {totalItems} item{totalItems !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="p-1.5 rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <FiChevronLeft size={18} />
        </button>
        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
            // Show first, last, and pages around current page
            if (
              page === 1 ||
              page === totalPages ||
              (page >= currentPage - 1 && page <= currentPage + 1)
            ) {
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-md text-sm font-bold transition-colors ${
                    currentPage === page
                      ? 'bg-saffron-500 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              );
            } else if (
              page === currentPage - 2 ||
              page === currentPage + 2
            ) {
              return <span key={page} className="text-gray-400">...</span>;
            }
            return null;
          })}
        </div>
        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages || totalPages === 0}
          className="p-1.5 rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <FiChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default TablePagination;
