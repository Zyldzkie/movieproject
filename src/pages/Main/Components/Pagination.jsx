//NO 3
import React from 'react';
import './Pagination.css';

const Pagination = ({ currentPage, totalPages, handlePreviousPage, handleNextPage, rowsPerPage, handleRowsPerPageChange }) => {
  return (
    <div className="pagination">
      <button onClick={handlePreviousPage} disabled={currentPage === 1}>
        Previous
      </button>
      <span>Page {currentPage} of {totalPages}</span>
      <button onClick={handleNextPage} disabled={currentPage === totalPages}>
        Next
      </button>
      
      <label>
        Rows per page:
        <select value={rowsPerPage} onChange={(e) => handleRowsPerPageChange(Number(e.target.value))}>
          {[5, 10, 15, 20].map((num) => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default Pagination;
 