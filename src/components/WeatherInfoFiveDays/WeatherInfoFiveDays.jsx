import './WeatherInfoFiveDays.css'

function WeatherInfoFiveDays({ weatherFiveDays }) {


    let dailyForecast = {}

    for (let forecast of weatherFiveDays.list) {
        const date = new Date(forecast.dt * 1000).toLocaleDateString()

        if (!dailyForecast[date]) {
            dailyForecast[date] = forecast
        }
    }

    console.log(dailyForecast)
    const nextFiveDays = Object.values(dailyForecast).slice(1, 6)

    function convertDate(date) {
        const newDate = new Date(date.dt * 1000).toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit' })
        return newDate
    }

    return <>
        <h2 className='main-title'>Previsão do tempo dos próximos cinco dias</h2>
        <div className='five-days-wrap'>
            {
                nextFiveDays.map(forecast => (
                    <div key={forecast.dt} className='content-five-days'>
                        <p>{convertDate(forecast)}</p>
                        <img className='content-icon' src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`} alt="" />
                        <p>{forecast.weather[0].description}</p>
                        <p>Temperatura média {Math.round(forecast.main.temp_max)}°C</p>
                    </div>
                ))
            }
        </div>
    </>
}
export default WeatherInfoFiveDays