import { useQuery, UseQueryResult } from 'react-query'
import axios from 'axios'

interface Country {
  name: string
}

interface FetchCountriesResult {
  data: Country[]
}

//This is a custom hook that uses react-query to fetch data from the restcountries API
export function useCountrySearch(query: string): UseQueryResult<Country[], Error> {
  const fetchCountries = async (searchTerm: string): Promise<Country[]> => {
    console.log('searchTerm:', searchTerm)
    try {
      const { data }: FetchCountriesResult = await axios.get(`https://restcountries.com/v2/name/${searchTerm}`)
      console.log('data:', data)
      return data
    } catch (error) {
      throw new Error('Error fetching data')
    }
  }

  //This is the react-query hook that will fetch the data
  return useQuery(['countries', query], () => fetchCountries(query), {
    enabled: query.length > 0, // Only fetch data if query length is greater than 0
  })
}
