const countries = {
    'IN':'India', 
    'US':'USA',
    'AU':'Australia',
    'DE':'Germany'
}
function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(success, error); 
    }else{
        console.log('Geolocation is not supported by this browser')
    }
}

async function success(position){
    let lat = position.coords.latitude; 
    let lon = position.coords.longitude; 

    // const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`;
    // fetch(url)
    // .then((response) => {
    //     return response.json();
    // })
    // .then((data) => {
    const response = await fetch(
        `/geo?lat=${lat}&lon=${lon}`
    );

    const result = await response.json();

    const data = result.current;
    const forecastData = result.forecast;
    console.log(data);
    let temp = Math.round(data.main.temp); 
    document.getElementById("temprature").textContent = temp; 
    document.querySelector('.city').textContent = ' ' + data.name; 
    document.querySelector('.states').textContent = countries[data.sys.country] + ', '; 
    document.querySelector('#feelslike').textContent = data.main.feels_like;
    document.querySelector('#humidity').textContent = data.main.humidity; 
    document.querySelector('#winds').textContent = data.wind.speed + ' km/h';
    const rain = data.rain?.['1h'] || 0; 
    document.querySelector('#PrecipitationValue').textContent = rain + ' mm'; 

    // const url2 = `https://api.weatherapi.com/v1/forecast.json?key=${second_api}&q=${data.coord.lat},${data.coord.lon}&days=7&aqi=yes&alerts=yes`;
    //     console.log(url2);
    //     console.log(data.name);
    const weekDays = [
        'Sun', 
        'Mon', 
        'Tue',
        'Wed', 
        'Thu',
        'Fri',
        'Sat'
    ]
    // return fetch(url2)
    //     .then((res) => {
    //         return res.json();
    //     })
    //     .then((newdata) => {
    console.log(forecastData);
    forecastData.forecast.forecastday.forEach((day, index) => {
    const weekName = weekDays[new Date(day.date).getDay()];
    let week = document.querySelectorAll('.week'); 
    let images = document.querySelectorAll('.imgswa');
    const maxtemp = document.querySelectorAll('.maxtemp');
    const mintemp = document.querySelectorAll('.mintemp');
    const maxtemprature = Math.floor(day.day.maxtemp_c);
    const mintemprature = Math.floor(day.day.mintemp_c);
    week[index].textContent = weekName;
    const condition = day.day.condition.text;
    console.log(condition);
    if(condition === 'Sunny' || condition === 'Clear'){
        images[index].src = './assets/images/icon-sunny.webp';
        maxtemp[index].textContent = maxtemprature;
        mintemp[index].textContent = mintemprature;
    }else if(condition === 'Partly Cloudy'){
        images[index].src = './assets/images/icon-partly-cloudy.webp'; 
        maxtemp[index].textContent = maxtemprature;
        mintemp[index].textContent = mintemprature;
    }else if(condition === 'Cloudy' || condition === 'Overcast'){
        images[index].src = './assets/images/icon-overcast.webp';
        maxtemp[index].textContent = maxtemprature;
        mintemp[index].textContent = mintemprature; 
    }else if(condition === 'Mist' || condition === 'Fog' || condition === 'Freezing fog' || condition === 'Haze' || condition === 'Smoke' || condition === 'Dust' || condition === 'Sand' || condition === 'Sandstorm' || condition === 'Severe sandstorm'){
        images[index].src = './assets/images/icon-fog.webp'; 
        maxtemp[index].textContent = maxtemprature;
        mintemp[index].textContent = mintemprature;
    }else if(condition === 'Patchy rain nearby' || condition === 'Patchy light drizzle' || condition === 'Light drizzle' || condition === 'Freezing drizzle' || condition === 'Patchy light rain'){
        images[index].src = './assets/images/icon-drizzle.webp';
        maxtemp[index].textContent = maxtemprature;
        mintemp[index].textContent = mintemprature;
    }else if(condition === 'Light rain' || condition === 'Moderate rain' || condition === 'Heavy rain' || condition === 'Light rain shower' || condition === 'Moderate or heavy rain shower' || condition === 'Torrential rain shower' || condition === 'Heavy freezing drizzle'){
        images[index].src = './assets/images/icon-rain.webp';
        maxtemp[index].textContent = maxtemprature;
        mintemp[index].textContent = mintemprature;
    }else if(condition === 'Thundery outbreaks possible' || condition === 'Patchy light rain with thunder' || condition === 'Moderate or heavy rain with thunder' || condition === 'Thundery outbreaks in nearby'){
        images[index].src = './assets/images/icon-storm.webp';
        maxtemp[index].textContent = maxtemprature;
        mintemp[index].textContent = mintemprature;
    }else if(condition === 'Patchy snow nearby' || condition === 'Light snow' || condition === 'Moderate snow' || condition === 'Heavy snow' || condition === 'Blizzard' || condition === 'Blowing snow' || condition === 'Ice pellets' || condition === 'Light sleet' || condition === 'Moderate or heavy sleet' || condition === 'Light sleet showers' || condition === 'Patchy light showers of ice pellets' || condition === 'Moderate or heavy showers of ice pellets'){
        images[index].src = './assets/images/icon-snow.webp';
        maxtemp[index].textContent = maxtemprature;
        mintemp[index].textContent = mintemprature;
    }
    //         })
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     })
    // })
    // .catch((error) => {
    //     alert('Network Error', error);
    });
    
    const days = [
        'Monday', 
        'Tuesday',
        'Wednesday', 
        'Thursday', 
        'Friday', 
        'Saturday', 
        'Sunday'
    ]

    

}

function error(){
    alert('Sorry, no position available.')
}

getLocation(); 


const button = document.querySelector(".search"); 

button.addEventListener('click', async () => {
    let city = document.querySelector('.inputbar').value; 
    // const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;

    // fetch(url)
    // .then((response) => {
    //     return response.json();
    // })
    // .then((data) => {

    const response = await fetch(
        `/search?city=${city}`
    );

    const result = await response.json();
    const data = result.current; 
    const forecastData = result.forecast;
    console.log(data);
    let temp = Math.round(data.main.temp); 
    document.getElementById("temprature").textContent = temp; 
    document.querySelector('.city').textContent = data.name; 
    document.querySelector('.states').textContent = countries[data.sys.country] + ', '; 
    document.querySelector('#feelslike').textContent = data.main.feels_like; 
    document.querySelector('#humidity').textContent = data.main.humidity; 
    document.querySelector('#winds').textContent = data.wind.speed;
    const rain = data.rain?.['1h'] || 0; 
    document.querySelector('#PrecipitationValue').textContent = rain + ' mm'; 

    // const url2 = `https://api.weatherapi.com/v1/forecast.json?key=${second_api}&q=${data.name}&days=7&aqi=yes&alerts=yes`;
    //     return fetch(url2)
    //     .then((res) => {
    //         return res.json();
    //     })
    //     .then((newdata) => {
    //         console.log(newdata);
    //         const url2 = `https://api.weatherapi.com/v1/forecast.json?key=${second_api}&q=${data.coord.lat},${data.coord.lon}&days=7&aqi=yes&alerts=yes`;
        // console.log(url2);
    console.log(data.name);
    const weekDays = [
        'Sun', 
        'Mon', 
        'Tue',
        'Wed', 
        'Thu',
        'Fri',
        'Sat'
    ]
        // return fetch(url2)
        // .then((res) => {
        //     return res.json();
        // })
        // .then((newdata) => {
    console.log(forecastData);
    forecastData.forecast.forecastday.forEach((day, index) => {
    const weekName = weekDays[new Date(day.date).getDay()];
    const week = document.querySelectorAll('.week'); 
    const images = document.querySelectorAll('.imgswa');
    const maxtemp = document.querySelectorAll('.maxtemp');
    const mintemp = document.querySelectorAll('.mintemp');
    week[index].textContent = weekName;
    const condition = day.day.condition.text;
    const maxtemprature = Math.floor(day.day.maxtemp_c);
    const mintemprature = Math.floor(day.day.mintemp_c);
    console.log(condition);
    console.log(maxtemprature);
    console.log(condition);
    if(condition === 'Sunny' || condition === 'Clear'){
        images[index].src = './assets/images/icon-sunny.webp';
        maxtemp[index].textContent = maxtemprature;
        mintemp[index].textContent = mintemprature;
    }else if(condition === 'Partly Cloudy'){
        images[index].src = './assets/images/icon-partly-cloudy.webp'; 
        maxtemp[index].textContent = maxtemprature;
        mintemp[index].textContent = mintemprature;
    }else if(condition === 'Cloudy' || condition === 'Overcast'){
        images[index].src = './assets/images/icon-overcast.webp'; 
        maxtemp[index].textContent = maxtemprature;
        mintemp[index].textContent = mintemprature;
    }else if(condition === 'Mist' || condition === 'Fog' || condition === 'Freezing fog' || condition === 'Haze' || condition === 'Smoke' || condition === 'Dust' || condition === 'Sand' || condition === 'Sandstorm' || condition === 'Severe sandstorm'){
        images[index].src = './assets/images/icon-fog.webp'; 
        maxtemp[index].textContent = maxtemprature;
        mintemp[index].textContent = mintemprature;
    }else if(condition === 'Patchy rain nearby' || condition === 'Patchy light drizzle' || condition === 'Light drizzle' || condition === 'Freezing drizzle' || condition === 'Patchy light rain'){
        images[index].src = './assets/images/icon-drizzle.webp';
        maxtemp[index].textContent = maxtemprature;
        mintemp[index].textContent = mintemprature;
    }else if(condition === 'Light rain' || condition === 'Moderate rain' || condition === 'Heavy rain' || condition === 'Light rain shower' || condition === 'Moderate or heavy rain shower' || condition === 'Torrential rain shower' || condition === 'Heavy freezing drizzle'){
        images[index].src = './assets/images/icon-rain.webp';
        maxtemp[index].textContent = maxtemprature;
        mintemp[index].textContent = mintemprature;
    }else if(condition === 'Thundery outbreaks possible' || condition === 'Patchy light rain with thunder' || condition === 'Moderate or heavy rain with thunder' || condition === 'Thundery outbreaks in nearby'){
        images[index].src = './assets/images/icon-storm.webp';
        maxtemp[index].textContent = maxtemprature;
        mintemp[index].textContent = mintemprature;
    }else if(condition === 'Patchy snow nearby' || condition === 'Light snow' || condition === 'Moderate snow' || condition === 'Heavy snow' || condition === 'Blizzard' || condition === 'Blowing snow' || condition === 'Ice pellets' || condition === 'Light sleet' || condition === 'Moderate or heavy sleet' || condition === 'Light sleet showers' || condition === 'Patchy light showers of ice pellets' || condition === 'Moderate or heavy showers of ice pellets'){
        images[index].src = './assets/images/icon-snow.webp';
        maxtemp[index].textContent = maxtemprature;
        mintemp[index].textContent = mintemprature;
    }
    //         })
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     })
    // })
    // .catch((error) => {
    //     console.log(error);
    // })
    });
});

