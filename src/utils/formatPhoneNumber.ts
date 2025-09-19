/**
 * Форматирует номер телефона в российском формате
 * @param input - входная строка с номером телефона
 * @returns отформатированный номер телефона в формате +7 (XXX) XXX-XX-XX
 */
export const formatPhoneNumber = (input: string): string => {
  const numbers = input.replace(/\D/g, "")
  if (numbers.length === 0) return ""

  let cleanNumbers = numbers
  if (numbers.startsWith("8")) {
    cleanNumbers = "7" + numbers.slice(1)
  } else if (!numbers.startsWith("7")) {
    cleanNumbers = "7" + numbers
  }

  cleanNumbers = cleanNumbers.slice(0, 11)

  if (cleanNumbers.length <= 1) return `+${cleanNumbers}`
  if (cleanNumbers.length <= 4)
    return `+${cleanNumbers.slice(0, 1)} (${cleanNumbers.slice(1)})`
  if (cleanNumbers.length <= 7)
    return `+${cleanNumbers.slice(0, 1)} (${cleanNumbers.slice(
      1,
      4
    )}) ${cleanNumbers.slice(4)}`
  if (cleanNumbers.length <= 9)
    return `+${cleanNumbers.slice(0, 1)} (${cleanNumbers.slice(
      1,
      4
    )}) ${cleanNumbers.slice(4, 7)}-${cleanNumbers.slice(7)}`
  return `+${cleanNumbers.slice(0, 1)} (${cleanNumbers.slice(
    1,
    4
  )}) ${cleanNumbers.slice(4, 7)}-${cleanNumbers.slice(
    7,
    9
  )}-${cleanNumbers.slice(9, 11)}`
}
