import React, { useState, ChangeEvent, useEffect } from 'react'
import Modal from './Modal'
import { useCountrySearch } from '../hooks/useCountrySearch'
import CountryList from './CountryList'
import { debounce, sortCountries } from '../utils/utils'
import { FaSearch } from 'react-icons/fa'
import { MdError } from 'react-icons/md'
import { MagnifyingGlass } from 'react-loader-spinner'
import { Country } from '../types/types'

const LiveSearch: React.FC = () => {
  const [query, setQuery] = useState<string>('')
  const [selectedOption, setSelectedOption] = useState<string>('')
  const [selectedCountry, setSelectedCountry] = useState<string>('')
  const { data, isLoading, isError } = useCountrySearch(query)
  const [sortedData, setSortedData] = useState<Country[] | null>([])
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  // This effect main purpose is to sort the data based on the selected option
  useEffect(() => {
    if (!data) return
    setSortedData(data ? sortCountries(data, selectedOption) : [])
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

  // This function will be called every time the user clicks on a country
  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country.capital)
    setIsModalOpen(true)
  }

  return (
    <div className="flex flex-col w-full">
      {/* Search input */}
      <form className="flex flex-col gap-4 sm:flex-row">
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
        <div className="flex items-center justify-center">
          <select
            className="border-2 border-gray-300 bg-white h-10 px-3 pr-10 rounded-lg focus:outline-none font-bold"
            value={selectedOption}
            onChange={handleSelectChange}>
            <option value="" disabled hidden>
              Sort by...
            </option>
            <option value="region">Sort by Region</option>
            <option value="name">Sort by Name</option>
            <option value="population">Sort by Population</option>
          </select>
        </div>

        {/* reset button */}
      </form>

      {/* Search results */}
      <section className="mt-8">
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
        {!isLoading && !isError && sortedData && (
          <CountryList countries={sortedData || []} onCountrySelect={handleCountrySelect} />
        )}
      </section>

      {/* Modal */}
      {isModalOpen && <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} query={selectedCountry} />}
    </div>
  )
}

export default LiveSearch
