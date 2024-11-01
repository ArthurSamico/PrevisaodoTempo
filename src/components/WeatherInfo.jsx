function WeatherInfo({ weather }) {
    return <>
        <div>
            <h1>{weather.name}</h1>
            <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="icone do clima" />
            <p>{Math.round(weather.main.temp)}°C</p>
        </div>

        <div>
            <p>{weather.weather[0].description}</p>
            <p>{weather.wind.speed}</p>
            <p>{Math.round(weather.main.feels_like)}°C</p>
        </div>

    </>
}
export default WeatherInfo