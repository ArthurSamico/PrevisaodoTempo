import './WeatherInfo.css'

function WeatherInfo({ weather }) {

    return <>
        <div className="content-wrap">
            <h1>{weather.name}</h1>
            <img className='icon-weather' src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="icone do clima" />
            <p>{weather.weather[0].description}</p>

            <div className='infos-wrap'>
                <div className='class-info'>
                    <h3>Temperatura atual</h3>
                    <p>{Math.round(weather.main.temp)}°C</p>
                </div>
                <div className='class-info'>
                    <h3>Sensação térmica</h3>
                    <p>{Math.round(weather.main.feels_like)}°C</p>
                </div>
                <div className='class-info'>
                    <h3>Velocidade do Vento</h3>
                    <p>{weather.wind.speed}</p>
                </div>
                <div className='class-info'>
                    <h3>Pressão</h3>
                    <p>{weather.main.pressure}</p>
                </div>
            </div>
        </div>

    </>
}
export default WeatherInfo