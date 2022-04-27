const input = document.getElementById('input')
const btn = document.getElementById('btn')
const main = document.getElementById('main')

const getDayWeek = async (value) => {
    let i = 0;
    let data = await { list: [ { dt: value } ] };

    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']; 
    let dayNum = await new Date(data.list[i].dt * 1000).getDay();
    var result = await days[dayNum];
    return result
}

const getCity = async (valor) => {
    const a = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${valor}&appid=fb5a3330cbda189a88ea916b183e971f`)
    const b = await a.json()
    if(b.length === 0) {
        return 'Please type the name of a city'
    } else {
        return b
    }
}

const getCurrentWeather = async (lat, lon) => {
    const a = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=fb5a3330cbda189a88ea916b183e971f`)
    const b = await a.json()
    return b
}

const getFutureWeather = async (lat, lon) => {
    const a = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=fb5a3330cbda189a88ea916b183e971f`)
    const b = await a.json()
    return b
}

const changeCurrentDom = async (currentImg, city, country, day, weather, actualTemp, max, min, wind, humidity, rain) => {
    document.getElementById('currentImg').src = `http://openweathermap.org/img/wn/${currentImg}@4x.png`
    document.getElementById('city').textContent = `${city}, ${country}`
    document.getElementById('day').textContent = day
    document.getElementById('weather').textContent = weather
    document.getElementById('actual-temp').textContent = `${actualTemp}ºC`
    document.getElementById('actual-max').textContent = `${max}ºC`
    document.getElementById('actual-min').textContent = `${min}ºC`
    document.getElementById('wind').textContent = `${wind}m/s`
    document.getElementById('humidity').textContent = `${humidity}%`
    document.getElementById('rain').textContent = `${rain}mm`
}

const changeDay1 = async (img, day, max, min) => {
    document.getElementById('img-day1').src = `http://openweathermap.org/img/wn/${img}@2x.png`
    document.getElementById('day-1').textContent = day
    document.getElementById('day1-max').textContent = `${max}ºC`
    document.getElementById('day1-min').textContent = `${min}ºC`
}

const changeDay2 = async (img, day, max, min) => {
    document.getElementById('img-day2').src = `http://openweathermap.org/img/wn/${img}@2x.png`
    document.getElementById('day-2').textContent = day
    document.getElementById('day2-max').textContent = `${max}ºC`
    document.getElementById('day2-min').textContent = `${min}ºC`
}

const changeDay3 = async (img, day, max, min) => {
    document.getElementById('img-day3').src = `http://openweathermap.org/img/wn/${img}@2x.png`
    document.getElementById('day-3').textContent = day
    document.getElementById('day3-max').textContent = `${max}ºC`
    document.getElementById('day3-min').textContent = `${min}ºC`
}

const changeDay4 = async (img, day, max, min) => {
    document.getElementById('img-day4').src = `http://openweathermap.org/img/wn/${img}@2x.png`
    document.getElementById('day-4').textContent = day
    document.getElementById('day4-max').textContent = `${max}ºC`
    document.getElementById('day4-min').textContent = `${min}ºC`
}

const changeDay5 = async (img, day, max, min) => {
    document.getElementById('img-day5').src = `http://openweathermap.org/img/wn/${img}@2x.png`
    document.getElementById('day-5').textContent = day
    document.getElementById('day5-max').textContent = `${max}ºC`
    document.getElementById('day5-min').textContent = `${min}ºC`
}

const changeDay6 = async (img, day, max, min) => {
    document.getElementById('img-day6').src = `http://openweathermap.org/img/wn/${img}@2x.png`
    document.getElementById('day-6').textContent = day
    document.getElementById('day6-max').textContent = `${max}ºC`
    document.getElementById('day6-min').textContent = `${min}ºC`
}

btn.addEventListener('click', async function() {
    const city = await getCity(input.value)
    let weather
    let future
    let currentDay
    let actualWeather
    let futureMax
    let futureMin
    let day1
    let day2
    let day3
    let day4
    let day5
    let day6
    if(city === 'Please type the name of a city') {
        console.log(city)
    } else {
        setTimeout(() => {main.style.display = 'grid'}, 900)
        weather = await getCurrentWeather(city[0].lat, city[0].lon)
        future = await getFutureWeather(city[0].lat, city[0].lon)
        currentDay = await getDayWeek(future.daily[0].dt)
        actualWeather = await Math.round(parseFloat(weather.main.temp) - 273.15)
        futureMax = await Math.round(parseFloat(future.daily[0].temp.max) - 273.15)
        futureMin = await Math.round(parseFloat(future.daily[0].temp.min) - 273.15)
        day1 = await getDayWeek(future.daily[1].dt)
        day2 = await getDayWeek(future.daily[2].dt)
        day3 = await getDayWeek(future.daily[3].dt)
        day4 = await getDayWeek(future.daily[4].dt)
        day5 = await getDayWeek(future.daily[5].dt)
        day6 = await getDayWeek(future.daily[6].dt)
    }
    changeCurrentDom(weather.weather[0].icon, weather.name, weather.sys.country, currentDay, weather.weather[0].main, actualWeather, futureMax, futureMin, weather.wind.speed, weather.main.humidity, future.daily[0].rain)
    changeDay1(future.daily[1].weather[0].icon, day1, Math.round(parseFloat(future.daily[1].temp.max) - 273.15), Math.round(parseFloat(future.daily[1].temp.min) - 273.15))
    changeDay2(future.daily[2].weather[0].icon, day2, Math.round(parseFloat(future.daily[2].temp.max) - 273.15), Math.round(parseFloat(future.daily[2].temp.min) - 273.15))
    changeDay3(future.daily[3].weather[0].icon, day3, Math.round(parseFloat(future.daily[3].temp.max) - 273.15), Math.round(parseFloat(future.daily[3].temp.min) - 273.15))
    changeDay4(future.daily[4].weather[0].icon, day4, Math.round(parseFloat(future.daily[4].temp.max) - 273.15), Math.round(parseFloat(future.daily[4].temp.min) - 273.15))
    changeDay5(future.daily[5].weather[0].icon, day5, Math.round(parseFloat(future.daily[5].temp.max) - 273.15), Math.round(parseFloat(future.daily[5].temp.min) - 273.15))
    changeDay6(future.daily[6].weather[0].icon, day6, Math.round(parseFloat(future.daily[6].temp.max) - 273.15), Math.round(parseFloat(future.daily[6].temp.min) - 273.15))
})