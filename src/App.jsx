import axios from 'axios'
import { useRef, useState } from 'react'
import './App.css'
import WeatherInfo from './components/WeatherInfo.jsx'

function App() {
  const [weather, setWeather] = useState()
  const inputRef = useRef()

  async function searchCity() {
    const city = inputRef.current.value
    const key = "cf22507f5cd950fa85b72157cb3df718"

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`
    const urlFiveDays = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&lang=pt_br&units=metric`

    const apiResponse = await axios.get(url)
    const apiResponseFiveDays = await axios.get(urlFiveDays)

    console.log(apiResponseFiveDays)

    setWeather(apiResponse.data)
    console.log(apiResponse)

    inputRef.current.value = ""
  }

  return (
    <>
      <h1>Previsão do Tempo</h1>

      <form onSubmit={(e) => e.preventDefault()}>
        <input type="text" placeholder='Digite o nome da cidade' ref={inputRef} />
        <button onClick={searchCity}>Buscar</button>
      </form>

      {
        weather && (
          <WeatherInfo weather={weather} />
        )
      }

    </>
  )
}

export default App
