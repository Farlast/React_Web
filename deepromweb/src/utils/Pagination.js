import React from 'react';
import classnames from 'classnames';
import { usePagination, DOTS } from './usePagination';
//import './pagination.scss';
const Pagination = props => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {    
    if (currentPage < paginationRange.length)  
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
      if (currentPage > 1)
          onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul
      className={classnames('page-indicators page-indicators-numbers', { [className]: className })}
    >
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === 1
        })}
        onClick={onPrevious}
      >
        {/*<div className="arrow left" />*/}
        {"<"}
      </li>
      {paginationRange.map((pageNumber,index) => {
        if (pageNumber === DOTS) {
          return <li className="pagination-item dots">&#8230;</li>;
        }

        return (
          <li key={"page-"+index}
            className={classnames('pagination-item', {
                active: pageNumber === currentPage
            })}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber.toString().padStart(2, '0')}
          </li>
        );
      })}
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === lastPage
        })}
        onClick={onNext}
      >
        {/*<div className="arrow right" />*/}
        {">"}
      </li>
    </ul>
  );
};

export default Pagination;