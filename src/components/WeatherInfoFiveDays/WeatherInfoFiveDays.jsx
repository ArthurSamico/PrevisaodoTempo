import './WeatherInfoFiveDays.css'

function WeatherInfoFiveDays({ weatherFiveDays }) {


    let dailyForecast = {}

    for (let forecast of weatherFiveDays.list) {
        const date = new Date(forecast.dt * 1000).toLocaleDateString()

        if (!dailyForecast[date]) {
            dailyForecast[date] = forecast
        }
    }

    const nextFiveDays = Object.values(dailyForecast).slice(1, 6)

    function convertDate(date) {
        const newDate = new Date(date.dt * 1000).toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit' })
        return newDate
    }

    return <>
        {
            nextFiveDays.map(forecast => (
                <div key={forecast.dt}>
                    <p>{convertDate(forecast)}</p>
                    <img src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`} alt="" />
                    <p>{forecast.weather[0].description}</p>
                    <p>{Math.round(forecast.main.temp_min)}°C / {Math.round(forecast.main.temp_max)}°C</p>
                </div>
            ))
        }
    </>
}
export default WeatherInfoFiveDays