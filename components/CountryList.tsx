import React from 'react'
import { formatPopulation } from '../utils/utils'
import { Country } from '../types/types'

interface CountryListProps {
  countries: Country[]
  onCountrySelect: (country: Country) => void
}

const CountryList: React.FC<CountryListProps> = ({ countries, onCountrySelect }) => {
  return (
    <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-500 ease-in-out">
      {countries.map((country) => (
        <article
          onClick={() => onCountrySelect(country)}
          key={country.name}
          className="p-4 border border-gray-300 rounded-md cursor-pointer">
          <img src={country.flag} alt={country.name} className="h-32 w-full object-contain py-2" />
          <h3 className="text-md font-bold">{country.name}</h3>
          <p className="text-sm">{country.region}</p>
          <p className="text-sm">{formatPopulation(country.population)}</p>
        </article>
      ))}
    </div>
  )
}

export default CountryList
