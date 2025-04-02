import { useQuery, UseQueryResult } from 'react-query'
import { isAxiosError } from 'axios'
import axios from 'axios'
import { CurrentWeather } from '../types/types'

interface WeatherData {
  current: CurrentWeather
}

// This function is responsible for fetching the weather data from the API

const fetchWeather = async (cityName: string): Promise<WeatherData> => {
  const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}`
  try {
    const response = await axios.get<WeatherData>(apiUrl)
    return response.data
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.message ?? 'An error occurred')
    }
    throw new Error('An error occurred')
  }
}

// This hook is responsible for fetching the weather data from the API
export function useWeatherSearch(cityName: string): UseQueryResult<WeatherData, Error> {
  return useQuery(['weather', cityName], () => fetchWeather(cityName), {
    enabled: !!cityName,
  })
}
