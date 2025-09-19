/**
 * Утилиты для работы с meta данными объектов недвижимости
 */

// Тип для структуры meta данных
export interface MetaData {
  _id?: string
  name?: string
  plan?: string[]
  renderer?: string[]
  description?: string
  [key: string]: unknown
}

/**
 * Парсит JSON строку meta данных в объект
 * @param meta - JSON строка с meta данными
 * @returns распарсенный объект meta данных или null в случае ошибки
 */
export const parseMetaData = (meta?: string): MetaData | null => {
  if (!meta) return null

  try {
    return JSON.parse(meta) as MetaData
  } catch (error) {
    console.warn("Ошибка парсинга meta данных:", error)
    return null
  }
}

/**
 * Извлекает первое изображение из meta данных
 * @param meta - JSON строка с meta данными
 * @param fallbackImage - изображение по умолчанию, если meta не содержит изображений
 * @returns URL первого найденного изображения или изображение по умолчанию
 */
export const extractImageFromMeta = (
  meta?: string,
  fallbackImage: string = "/images/temporary/house.png"
): string => {
  const metaData = parseMetaData(meta)

  if (!metaData) return fallbackImage

  // Сначала пробуем взять из массива plan (планировки) - ПРИОРИТЕТ
  if (metaData.plan && metaData.plan.length > 0) {
    return metaData.plan[0]
  }

  // Если plan пустой, пробуем взять из массива renderer (основные изображения комплекса)
  if (metaData.renderer && metaData.renderer.length > 0) {
    return metaData.renderer[0]
  }

  // Если ничего не найдено, возвращаем изображение по умолчанию
  return fallbackImage
}

/**
 * Извлекает все изображения из meta данных
 * @param meta - JSON строка с meta данными
 * @returns массив URL изображений или пустой массив
 */
export const extractImagesFromMeta = (meta?: string): string[] => {
  const metaData = parseMetaData(meta)

  if (!metaData) return []

  const images: string[] = []

  // Добавляем изображения из renderer
  if (metaData.renderer && metaData.renderer.length > 0) {
    images.push(...metaData.renderer)
  }

  // Добавляем изображения из plan
  if (metaData.plan && metaData.plan.length > 0) {
    images.push(...metaData.plan)
  }

  return images
}
