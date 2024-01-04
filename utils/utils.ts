// This function is used to debounce the search input so that the API is not called on every key stroke
export const debounce = <F extends (...args: any[]) => any>(
  func: F,
  delay: number
): ((...args: Parameters<F>) => void) => {
  let debounceTimer: NodeJS.Timeout

  return function (...args: Parameters<F>) {
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => func(...args), delay)
  }
}

//This function formats the population number to a more readable format
export const formatPopulation = (num: number): string => {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1) + 'B'
  } else if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1) + 'M'
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(1) + 'K'
  }
  return num.toString()
}
