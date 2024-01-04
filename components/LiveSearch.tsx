import React, { useState, ChangeEvent } from 'react'
import { useCountrySearch } from '../hooks/useCountrySearch'
import { debounce } from '../utils/utils'

interface Country {
  name: string
}

const LiveSearch: React.FC = () => {
  const [query, setQuery] = useState<string>('')
  const { data, isLoading, isError } = useCountrySearch(query)

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value)
    setQuery(event.target.value)
    console.log(query)
  }

  const debouncedHandleInputChange = debounce(handleInputChange, 1000)

  return (
    <div className="flex flex-col items-center justify-center">
      <input
        className="border border-gray-300 rounded-md p-2 w-64"
        type="text"
        placeholder="Search for a country"
        onChange={debouncedHandleInputChange}
      />
      {isLoading && <div>Loading...</div>}
      {isError && <div>Something went wrong...</div>}
      {data && (
        <ul className="mt-4">
          {data.map((country: Country) => (
            <li key={country.name}>{country.name}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default LiveSearch
