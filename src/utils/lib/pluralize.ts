/**
 * Функция для правильного склонения слова "минута" в зависимости от числа
 * @param count - количество минут
 * @returns строку с правильным склонением
 */
export const pluralizeMinutes = (count: number): string => {
  const lastDigit = count % 10
  const lastTwoDigits = count % 100

  // Исключения для чисел 11-14
  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return `${count} минут`
  }

  // Правила склонения
  if (lastDigit === 1) {
    return `${count} минута`
  } else if (lastDigit >= 2 && lastDigit <= 4) {
    return `${count} минуты`
  } else {
    return `${count} минут`
  }
}
