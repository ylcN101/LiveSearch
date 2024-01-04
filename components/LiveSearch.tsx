import React, { useState, ChangeEvent } from 'react'
import { useCountrySearch } from '../hooks/useCountrySearch'

interface Country {
  name: string
}

const LiveSearch: React.FC = () => {
  const [query, setQuery] = useState<string>('')
  const { data, isLoading, isError } = useCountrySearch(query)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <input
        className="border border-gray-300 rounded-md p-2 w-64"
        type="text"
        placeholder="Search for a country"
        value={query}
        onChange={handleInputChange}
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
