import React from 'react'
import { IoCloseSharp } from 'react-icons/io5'
import { useWeatherSearch } from '../hooks/useWeatherSearch'
import { TailSpin } from 'react-loader-spinner'
import { MdError } from 'react-icons/md'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  query: string
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, query }) => {
  const { data: weatherData, isLoading, isError } = useWeatherSearch(query)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-90 flex justify-center items-center ">
      <div className="bg-white rounded-lg p-8 relative">
        <span>
          <IoCloseSharp size={25} className="text-black absolute top-2 right-2 cursor-pointer" onClick={onClose} />
        </span>
        <h2 className="text-2xl" onClick={onClose}>
          Current Weather in {query}
        </h2>
        {/* Loading */}
        {isLoading && (
          <div className="flex justify-center items-center">
            <TailSpin color="#000" height={80} width={80} />
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

        {!isLoading && !isError && weatherData && (
          <div className="flex flex-col items-center justify-center shadow-lg rounded-lg p-4 gap-2">
            <p>Temperature: {weatherData.current.temp_c}°C</p>
            <p>Weather: {weatherData.current.condition.text}</p>
            <img
              className="w-20 h-20"
              src={weatherData.current.condition.icon}
              alt={weatherData.current.condition.text}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default Modal
