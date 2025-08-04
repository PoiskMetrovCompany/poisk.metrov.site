import React from "react"
import styles from "./pagination.module.scss"
import clsx from "clsx"

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
      <div className={styles.pagination__pages}>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={clsx(styles.pagination__pages__item, {
              [styles.pagination__pages__item_active]:
                index + 1 === currentPage,
            })}
            onClick={() => onPageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
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
