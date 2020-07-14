/**
 * Convert number in pt-BR currency
 * @param value Decimal value to be converted
 */
export const currencyFormatter = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

/**
 * Convert timestamp in pt-BR date
 * @param timestamp Date in milliseconds
 */
export const timestampToDate = (timestamp: number): string => {
  return new Intl.DateTimeFormat('pt-BR').format(timestamp)
}

/**
 * Convert timestamp in pt-BR day/month/year string date
 * @param timestamp Date in milliseconds
 */
export const timestampToMonthYear = (timestamp: number): string => {
  const date = new Date(timestamp)
  const dateTimeFormat = new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    year: 'numeric',
    month: 'short'
  })
  const [
    { value: day },
    ,
    { value: month },
    ,
    { value: year }
  ] = dateTimeFormat.formatToParts(date)
  return `${day} ${month.toUpperCase()} ${year}`
}

/**
 * Convert number from thousands to K and from millions to M
 * @param number Value to be converted
 */
export const decimalFormatter = (number: number): string => {
  if (number > 999 && number < 1000000) {
    return (number / 1000).toFixed(0) + 'K'
  }
  if (number > 1000000) {
    return (number / 1000000).toFixed(0) + 'M'
  }
  return number.toString()
}
