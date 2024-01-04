import React, { useState, ChangeEvent, useEffect } from 'react'
import { useCountrySearch } from '../hooks/useCountrySearch'
import { debounce, formatPopulation } from '../utils/utils'
import { FaSearch } from 'react-icons/fa'
import { MdError } from 'react-icons/md'
import { MagnifyingGlass } from 'react-loader-spinner'

interface Country {
  name: string
  region: string
  population: number
  flag: string
}

const LiveSearch: React.FC = () => {
  const [query, setQuery] = useState<string>('')
  const [selectedOption, setSelectedOption] = useState<string>('')
  const { data, isLoading, isError } = useCountrySearch(query)
  const [sortedData, setSortedData] = useState<Country[] | null>([])

  // This effect main purpose is to sort the data based on the selected option
  useEffect(() => {
    if (!data) return

    let sorted = [...data]

    switch (selectedOption) {
      case 'region':
        sorted.sort((a, b) => (a.region > b.region ? 1 : -1))
        break
      case 'name':
        sorted.sort((a, b) => (a.name > b.name ? 1 : -1))
        break
      case 'population':
        sorted.sort((a, b) => (a.population > b.population ? 1 : -1))
        break
      default:
        break
    }

    setSortedData(sorted as Country[])
  }, [data, selectedOption])

  // This function will be called every time the input changes
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  // This function will be debounced
  const debouncedHandleInputChange = debounce(handleInputChange, 1000)

  // This function will be called every time the select changes
  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value)
  }

  return (
    <div className="flex flex-col w-full">
      {/* Search input */}
      <form className="flex gap-4">
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
        {/* Select */}
        <select
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg focus:outline-none font-bold"
          value={selectedOption}
          onChange={handleSelectChange}>
          <option value="" disabled hidden>
            Sort by...
          </option>
          <option value="region">Sort by Region</option>
          <option value="name">Sort by Name</option>
          <option value="population">Sort by Population</option>
        </select>
      </form>

      {/* Search results */}
      <div className="mt-4">
        {/* Loading */}
        {isLoading && (
          <div className="flex justify-center items-center">
            <MagnifyingGlass color="#000" height={80} width={80} />
          </div>
        )}
        {/* Error */}
        {isError && (
          <div className="flex justify-center items-center">
            <span className="mr-2">Country not found</span>
            <span>
              <MdError color="#000" size={30} />
            </span>
          </div>
        )}
        {/* Data */}
        <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-500 ease-in-out">
          {data &&
            sortedData?.map((country: Country) => (
              <div key={country.name} className="p-4 border border-gray-300 rounded-md">
                <img src={country.flag} alt={country.name} className="w-full h-32 object-cover mb-2" />
                <h3 className="text-md font-bold">{country.name}</h3>
                <p className="text-sm">{country.region}</p>
                <p className="text-sm">{formatPopulation(country.population)}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default LiveSearch
