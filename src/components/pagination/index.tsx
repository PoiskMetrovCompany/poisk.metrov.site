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

  const renderPageNumbers = () => {
    const pages = []

    if (totalPages <= 7) {
      // Если страниц мало
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <button
            key={i}
            className={clsx(styles.pagination__pages__item, {
              [styles.pagination__pages__item_active]: i === currentPage,
            })}
            onClick={() => onPageChange(i)}
          >
            {i}
          </button>
        )
      }
    } else {
      const showPages = []

      for (let i = 1; i <= Math.min(3, totalPages); i++) {
        showPages.push(i)
      }

      if (currentPage <= 5) {
        for (let i = 4; i <= Math.min(6, totalPages - 3); i++) {
          showPages.push(i)
        }
        if (totalPages > 6) {
          showPages.push("ellipsis")
        }
        for (let i = Math.max(7, totalPages - 2); i <= totalPages; i++) {
          showPages.push(i)
        }
      } else if (currentPage >= totalPages - 4) {
        showPages.push("ellipsis")
        for (let i = Math.max(4, totalPages - 5); i <= totalPages - 3; i++) {
          showPages.push(i)
        }
        for (let i = totalPages - 2; i <= totalPages; i++) {
          showPages.push(i)
        }
      } else {
        // Текущая страница в середине
        showPages.push("ellipsis")
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          showPages.push(i)
        }
        showPages.push("ellipsis")
        for (let i = totalPages - 2; i <= totalPages; i++) {
          showPages.push(i)
        }
      }

      // Рендер страниц
      showPages.forEach((page, index) => {
        if (page === "ellipsis") {
          const isFirstEllipsis = index < showPages.length / 2
          let targetPage: number

          if (isFirstEllipsis) {
            targetPage = Math.max(currentPage - 2, 1)
          } else {
            targetPage = Math.min(currentPage + 2, totalPages)
          }

          pages.push(
            <button
              key={`ellipsis-${index}`}
              className={styles.pagination__pages__ellipsis}
              onClick={() => onPageChange(targetPage)}
            >
              ...
            </button>
          )
        } else {
          pages.push(
            <button
              key={page}
              className={clsx(styles.pagination__pages__item, {
                [styles.pagination__pages__item_active]: page === currentPage,
              })}
              onClick={() => onPageChange(page as number)}
            >
              {page}
            </button>
          )
        }
      })
    }

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
