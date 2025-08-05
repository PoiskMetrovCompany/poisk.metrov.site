import React from "react"
import styles from "./pagination.module.scss"
import clsx from "clsx"
import { calculatePaginationItems, PaginationItem } from "./paginationLogic"

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

  const renderPageNumbers = () => {
    const paginationItems = calculatePaginationItems(totalPages, currentPage)
    const pages: React.ReactElement[] = []

    paginationItems.forEach((item, index) => {
      if (item.type === "ellipsis") {
        pages.push(
          <button
            key={`ellipsis-${index}`}
            className={styles.pagination__pages__ellipsis}
            onClick={() => onPageChange(item.targetPage!)}
          >
            ...
          </button>
        )
      } else {
        pages.push(
          <button
            key={item.value}
            className={clsx(styles.pagination__pages__item, {
              [styles.pagination__pages__item_active]:
                item.value === currentPage,
            })}
            onClick={() => onPageChange(item.value as number)}
          >
            {item.value}
          </button>
        )
      }
    })

    return pages
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
      <div className={styles.pagination__pages}>{renderPageNumbers()}</div>
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
