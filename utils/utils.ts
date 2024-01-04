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

//This function sorts the countries based on the option selected
export const sortCountries = (countries: any[], option: string): any[] => {
  let sorted = [...countries]
  switch (option) {
    case 'region':
      return sorted.sort((a, b) => a.region.localeCompare(b.region))
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name))
    case 'population':
      return sorted.sort((a, b) => b.population - a.population)
    default:
      return sorted
  }
}
