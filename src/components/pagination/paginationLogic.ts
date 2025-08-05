export interface PaginationItem {
  type: "page" | "ellipsis"
  value: number | string
  targetPage?: number
}

export const calculatePaginationItems = (
  totalPages: number,
  currentPage: number
): PaginationItem[] => {
  const items: PaginationItem[] = []

  if (totalPages <= 7) {
    // Если страниц мало, показываем все
    for (let i = 1; i <= totalPages; i++) {
      items.push({
        type: "page",
        value: i,
      })
    }
  } else {
    // Добавляем первые 3 страницы
    for (let i = 1; i <= Math.min(3, totalPages); i++) {
      items.push({
        type: "page",
        value: i,
      })
    }

    if (currentPage <= 5) {
      // Текущая страница в начале
      for (let i = 4; i <= Math.min(6, totalPages - 3); i++) {
        items.push({
          type: "page",
          value: i,
        })
      }
      if (totalPages > 6) {
        items.push({
          type: "ellipsis",
          value: "ellipsis",
          targetPage: Math.max(currentPage - 2, 1),
        })
      }
      for (let i = Math.max(7, totalPages - 2); i <= totalPages; i++) {
        items.push({
          type: "page",
          value: i,
        })
      }
    } else if (currentPage >= totalPages - 4) {
      // Текущая страница в конце
      items.push({
        type: "ellipsis",
        value: "ellipsis",
        targetPage: Math.max(currentPage - 2, 1),
      })
      for (let i = Math.max(4, totalPages - 5); i <= totalPages - 3; i++) {
        items.push({
          type: "page",
          value: i,
        })
      }
      for (let i = totalPages - 2; i <= totalPages; i++) {
        items.push({
          type: "page",
          value: i,
        })
      }
    } else {
      // Текущая страница в середине
      items.push({
        type: "ellipsis",
        value: "ellipsis",
        targetPage: Math.max(currentPage - 2, 1),
      })
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        items.push({
          type: "page",
          value: i,
        })
      }
      items.push({
        type: "ellipsis",
        value: "ellipsis",
        targetPage: Math.min(currentPage + 2, totalPages),
      })
      for (let i = totalPages - 2; i <= totalPages; i++) {
        items.push({
          type: "page",
          value: i,
        })
      }
    }
  }

  return items
}
