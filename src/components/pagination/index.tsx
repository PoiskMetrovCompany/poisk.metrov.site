import React from "react"
import styles from "./pagination.module.scss"
import ReactPaginate from "react-paginate"

interface PaginationProps {
  totalPages: number
  currentPage: number
  onPageChange: (page: number) => void
}

const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const handlePageClick = (event: { selected: number }) => {
    onPageChange(event.selected + 1)
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  return (
    <div className={styles.pagination}>
      <button
        className={styles.pagination__button__prev}
        onClick={handlePrevPage}
        disabled={currentPage === 1}
      >
        <span>Предыдущая</span>
      </button>
      <ReactPaginate
        previousLabel={null}
        nextLabel={null}
        breakLabel="..."
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={3}
        pageCount={totalPages}
        forcePage={currentPage - 1}
        renderOnZeroPageCount={null}
        containerClassName={styles.pagination__container}
        pageClassName={styles.pagination__pages__item}
        pageLinkClassName={styles.pagination__pages__link}
        activeClassName={styles.pagination__pages__item_active}
        activeLinkClassName={styles.pagination__pages__link_active}
        breakClassName={styles.pagination__pages__ellipsis}
        breakLinkClassName={styles.pagination__pages__ellipsis_link}
      />
      <button
        className={styles.pagination__button__next}
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        <span>Следующая</span>
      </button>
    </div>
  )
}

export default Pagination
