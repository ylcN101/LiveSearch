export interface Country {
  name: string
  region: string
  population: number
  flag: string
  capital: string
}

export interface CurrentWeather {
  last_updated: string
  condition: {
    text: string
    icon: string
  }
  temp_c: number
}
