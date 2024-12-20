// hooks e bibliotecas
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Toaster, toast } from 'sonner';

const key = import.meta.env.VITE_API_KEY
const baseUrl = import.meta.env.VITE_URL_BASE

// componentes
import "./App.css";
import WeatherInfo from "./components/WeatherInfo/WeatherInfo.jsx";
import WeatherInfoFiveDays from "./components/WeatherInfoFiveDays/WeatherInfoFiveDays.jsx";

function App() {
  const [weather, setWeather] = useState();
  const [weatherFiveDays, setWeatherFiveDays] = useState();
  const [climaAtual, setClimaAtual] = useState("");
  const [corFundo, setCorFundo] = useState("#2583fd");

  const inputRef = useRef();

  const coresPorClima = {
    CLEAR: "#87CEEB",
    CLOUDS: "#B0C4DE",
    RAIN: "#4682B4",
    DRIZZLE: "#5F9EA0",
    THUNDERSTORM: "#2F4F4F",
    SNOW: "#FFFafa",
    MIST: "#D3D3D3",
    HAZE: "#C0C0C0",
    DUST: "#DEB887",
    SAND: "#DEB887",
    ASH: "#DEB887",
    TORNADO: "#708090",
  };

  async function searchCity() {
    const city = inputRef.current.value;

    const url = `${baseUrl}weather?q=${city}&appid=${key}&lang=pt_br&units=metric`;
    const urlFiveDays = `${baseUrl}forecast?q=${city}&appid=${key}&lang=pt_br&units=metric`;

    try {
      const apiResponse = await axios.get(url);
      const apiResponseFiveDays = await axios.get(urlFiveDays);

      setWeather(apiResponse.data);
      setWeatherFiveDays(apiResponseFiveDays.data);

      const clima = apiResponse?.data?.weather[0]?.main.toUpperCase();

      setClimaAtual(clima);
      setCorFundo(coresPorClima[clima] || "#87CEEB");

      inputRef.current.value = "";
    } catch (error) {
      console.log(error.response.data.cod)
      if (error.response.data.cod == '404') {
        toast.error('Cidade não encontrada')
      }
    }

    console.log(weather)
  }

  useEffect(() => {
    document.body.style.transition = "background-color 1s ease";
    document.body.style.backgroundColor = corFundo;
  }, [corFundo]);

  return (
    <>
      <div className={`home${weather ? ("-top") : ("")}`}>
        <h1 className={`${weather && 'hidden'}`}>Previsão do Tempo</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className={`main-form${weather ? ("-top") : ("")}`}>
            <input className={`form-input${weather ? ("-top") : ("")}`} type="text" placeholder="Digite o nome da cidade" ref={inputRef} />
            <button className={`form-button${weather ? ("-top") : ("")}`} onClick={searchCity}><FaSearch className="search-icon" />Buscar </button>
          </div>
        </form>
      </div>

      {weather && <WeatherInfo weather={weather} />}
      {weatherFiveDays && <WeatherInfoFiveDays weatherFiveDays={weatherFiveDays} />}

      <Toaster richColors />
    </>
  );
}

export default App;