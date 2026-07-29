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

   
    const response = await fetch(
        `/geo?lat=${lat}&lon=${lon}`
    );

    const result = await response.json();

    console.log(result);
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

    
    const weekDays = [
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat',
        'Sun'
    ]

    const time = {
        15:'3pm',
        16:'4pm',
        17:'5pm',
        18:'6pm',
        19:'7pm',
        20:'8pm',
        21:'9pm',
        22:'10pm'

    }
 
    const weekvalues = {
        1:'Monday',
        2:'Tuesday',
        3:'Wednesday',
        4:'Thursday',
        5:'Friday',
        6:'Saturday',
        7:'Sunday'

    }
    console.log(forecastData);

    forecastData.daily.temperature_2m_max.forEach((maxtempvalue, index) => {
        const maxtemp = document.querySelectorAll('.maxtemp');
        const maxtemprature = Math.floor(maxtempvalue);
        maxtemp[index].textContent = maxtemprature;
    });

    forecastData.daily.temperature_2m_min.forEach((mintempvalue, index) => {
        const mintemp = document.querySelectorAll('.mintemp');
        const mintemprature = Math.floor(mintempvalue);
        mintemp[index].textContent = mintemprature;
    });

    forecastData.daily.weather_code.forEach((value, index) => {
        const images = document.querySelectorAll('.imgswa');
        let condition = value; 
        if(condition === 0){
            images[index].src = './assets/images/icon-sunny.webp';
        }else if(condition === 1 || condition === 2){
            images[index].src = './assets/images/icon-partly-cloudy.webp'; 
        }else if(condition === 3){
            images[index].src = './assets/images/icon-overcast.webp';
        }else if(condition === 45 || condition === 48){
            images[index].src = './assets/images/icon-fog.webp';
        }else if([51, 53, 55, 56, 57].includes(condition)){
            images[index].src = './assets/images/icon-drizzle.webp';
        }else if([61, 63, 65, 66, 67, 80, 81, 82].includes(condition)){
            images[index].src = './assets/images/icon-rain.webp';
        }else if([71, 73, 75, 77, 85, 86].includes(condition)){
            images[index].src = './assets/images/icon-snow.webp';
        }else if([95, 96, 99].includes(condition)){
            images[index].src = './assets/images/icon-storm.webp';
        }
    });

    forecastData.daily.time.forEach((day, index) => {
        const weekname = document.querySelector('.weekname');
        const weekName = weekDays[new Date(day).getDay()];   
        let week = document.querySelectorAll('.week'); 
        week[index].textContent = weekName;
        weekname.textContent = weekvalues[new Date(day).getDay() + 1];
    });

    const hourdatearray = [];
    const weathercodeData = []; 
    const temperaturearray = []; 
    forecastData.hourly.time.forEach((item, idx) => {
        const hourdate = new Date(item).getHours();
        if(hourdate >= 15 && hourdate <= 22){
            hourdatearray.push(hourdate);
            weathercodeData.push(forecastData.hourly.weather_code[idx]);
            temperaturearray.push(forecastData.hourly.temperature_2m[idx]);
        }
            
    })
    
    const newhourdatearray = [...new Set(hourdatearray)];
    const newweathercode = [...new Set(weathercodeData)];
    const newtemparray = [...new Set(temperaturearray)];
    newhourdatearray.forEach((item, idx) => {
        const timing = document.querySelectorAll('.timing');
        const hourlyimage = document.querySelectorAll('.hourlyimage');
        const tempvalues = document.querySelectorAll('.tempvalues');
        timing[idx].textContent = time[item];
        tempvalues[idx].textContent = Math.floor(newtemparray[idx]);

        if(newweathercode[idx] === 0){
            hourlyimage[idx].src = './assets/images/icon-sunny.webp';
        }else if(newweathercode[idx] === 1 || newweathercode[idx] === 2){
            hourlyimage[idx].src = './assets/images/icon-partly-cloudy.webp'; 
        }else if(newweathercode[idx] === 3){
            hourlyimage[idx].src = './assets/images/icon-overcast.webp';
        }else if(newweathercode[idx] === 45 || newweathercode[idx] === 48){
            hourlyimage[idx].src = './assets/images/icon-fog.webp';
        }else if([51, 53, 55, 56, 57].includes(newweathercode[idx])){
            hourlyimage[idx].src = './assets/images/icon-drizzle.webp';
        }else if([61, 63, 65, 66, 67, 80, 81, 82].includes(newweathercode[idx])){
            hourlyimage[idx].src = './assets/images/icon-rain.webp';
        }else if([71, 73, 75, 77, 85, 86].includes(newweathercode[idx])){
            hourlyimage[idx].src = './assets/images/icon-snow.webp';
        }else if([95, 96, 99].includes(newweathercode[idx])){
            hourlyimage[idx].src = './assets/images/icon-storm.webp';
        }
    })

    // let arr = []; 

    for(let i = 0; i < forecastData.hourly.time.length; i++){
        const weekname = document.querySelector('.weekname');
        let newdate = new Date(forecastData.hourly.time[i]).toDateString();
        const dateobj = new Date().toDateString();
        if(newdate === dateobj){
            let datematch = weekvalues[new Date(newdate).getDay()];
            weekname.textContent = datematch;
        }
    }

     
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

        maxtemp[index].textContent = maxtemprature;
        mintemp[index].textContent = mintemprature;

        if(condition === 'Sunny' || condition === 'Clear'){
            images[index].src = './assets/images/icon-sunny.webp';
        }else if(condition === 'Partly Cloudy'){
            images[index].src = './assets/images/icon-partly-cloudy.webp'; 
        }else if(condition === 'Cloudy' || condition === 'Overcast'){
            images[index].src = './assets/images/icon-overcast.webp'; 
        }else if(condition === 'Mist' || condition === 'Fog' || condition === 'Freezing fog' || condition === 'Haze' || condition === 'Smoke' || condition === 'Dust' || condition === 'Sand' || condition === 'Sandstorm' || condition === 'Severe sandstorm' || condition === 'Dust storm'){
            images[index].src = './assets/images/icon-fog.webp'; 
        }else if(condition === 'Patchy rain nearby' || condition === 'Patchy light drizzle' || condition === 'Light drizzle' || condition === 'Freezing drizzle' || condition === 'Patchy light rain'){
            images[index].src = './assets/images/icon-drizzle.webp';
        }else if(condition === 'Light rain' || condition === 'Moderate rain' || condition === 'Heavy rain' || condition === 'Light rain shower' || condition === 'Moderate or heavy rain shower' || condition === 'Torrential rain shower' || condition === 'Heavy freezing drizzle'){
            images[index].src = './assets/images/icon-rain.webp';
        }else if(condition === 'Thundery outbreaks possible' || condition === 'Patchy light rain with thunder' || condition === 'Moderate or heavy rain with thunder' || condition === 'Thundery outbreaks in nearby'){
            images[index].src = './assets/images/icon-storm.webp';
        }else if(condition === 'Patchy snow nearby' || condition === 'Light snow' || condition === 'Moderate snow' || condition === 'Heavy snow' || condition === 'Blizzard' || condition === 'Blowing snow' || condition === 'Ice pellets' || condition === 'Light sleet' || condition === 'Moderate or heavy sleet' || condition === 'Light sleet showers' || condition === 'Patchy light showers of ice pellets' || condition === 'Moderate or heavy showers of ice pellets'){
            images[index].src = './assets/images/icon-snow.webp';
        }

        const select = document.querySelector('.weekname');
        const unit = document.querySelector('.unitimage');

    });
});
