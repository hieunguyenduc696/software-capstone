export const getRangeNumber = (start: number, end?: number) => {
  const result = []
  if (end == null) {
    for (let i = 0; i < start; i++) {
      result.push(i)
    }
    return result
  }

  for (let i = start; i <= end; i++) {
    result.push(i)
  }
  return result
}

export const formatNumberWithDigit = (number: number, digit: number) => {
  if (!isNaN(number)) {
    return Number(number.toFixed(digit))
  } else {
    return 0
  }
}
