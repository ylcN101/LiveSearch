import React, { useState, ChangeEvent } from 'react'
import { useCountrySearch } from '../hooks/useCountrySearch'
import { debounce } from '../utils/utils'
import { FaSearch } from 'react-icons/fa'

interface Country {
  name: string
}

const LiveSearch: React.FC = () => {
  const [query, setQuery] = useState<string>('')
  const { data, isLoading, isError } = useCountrySearch(query)

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const debouncedHandleInputChange = debounce(handleInputChange, 1000)

  return (
    <>
      {/* Search input */}
      <div className="flex justify-center items-center relative">
        <input
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg focus:outline-none font-bold"
          type="text"
          placeholder="Search for a country"
          onChange={debouncedHandleInputChange}
        />
        <span className="absolute right-0 top-0 mt-3 mr-4">
          <FaSearch />
        </span>
      </div>

      {/* Search results */}
      <div className="mt-4">
        {isLoading && <div>Loading...</div>}
        {isError && <div>Something went wrong...</div>}
        <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {data?.map((country: Country) => (
            <div key={country.name} className="p-4 border border-gray-300 rounded-md">
              {country.name}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default LiveSearch
