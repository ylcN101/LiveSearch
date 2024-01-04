import { useQuery, UseQueryResult } from 'react-query'
import { Country } from '../types/types'
import axios, { isAxiosError } from 'axios'

interface FetchCountriesResult {
  data: Country[]
}

export function useCountrySearch(query: string): UseQueryResult<Country[], Error> {
  const fetchCountries = async (searchTerm: string): Promise<Country[]> => {
    try {
      const { data }: FetchCountriesResult = await axios.get(`https://restcountries.com/v2/name/${searchTerm}`)
      return data
    } catch (error) {
      if (isAxiosError(error)) {
        throw new Error(error.response?.data?.message ?? 'An error occurred')
      }
      throw new Error('An error occurred')
    }
  }

  return useQuery(['countries', query], () => fetchCountries(query), {
    enabled: query.length > 0, // Only fetch data if query length is greater than 0
  })
}
