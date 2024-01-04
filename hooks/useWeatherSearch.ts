import { useQuery, UseQueryResult } from 'react-query'

interface CurrentWeather {
  last_updated: string
  condition: {
    text: string
    icon: string
  }
  temp_c: number
}

interface WeatherData {
  current: CurrentWeather
}

const fetchWeather = async (cityName: string): Promise<WeatherData> => {
  const apiKey = '327b017e746e450fa1f80145230412'
  const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}`
  try {
    const response = await fetch(apiUrl)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const weatherData: WeatherData = await response.json()
    return weatherData
  } catch (error) {
    console.error('Error fetching weather from API:', error)
    throw new Error('Failed to fetch weather')
  }
}

export function useWeatherSearch(cityName: string): UseQueryResult<WeatherData, Error> {
  return useQuery(['weather', cityName], () => fetchWeather(cityName), {
    enabled: !!cityName,
  })
}
