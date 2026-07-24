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
        'Sun', 
        'Mon', 
        'Tue',
        'Wed', 
        'Thu',
        'Fri',
        'Sat'
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
        0:'Monday',
        1:'Tuesday',
        2:'Wednesday',
        3:'Thursday',
        4:'Friday',
        5:'Saturday',
        6:'Sunday'

    }
    console.log(forecastData);
    let weekdaynumber = '';
    forecastData.forecast.forecastday.forEach((day, index) => {
        const weekName = weekDays[new Date(day.date).getDay()];
        weekdaynumber = new Date(day.date).getDay();
        const dayvalue = new Date(day.date).getDay();    
        let week = document.querySelectorAll('.week'); 
        let images = document.querySelectorAll('.imgswa');
        const maxtemp = document.querySelectorAll('.maxtemp');
        const mintemp = document.querySelectorAll('.mintemp');
        const maxtemprature = Math.floor(day.day.maxtemp_c);
        const mintemprature = Math.floor(day.day.mintemp_c);

        week[index].textContent = weekName;
        const condition = day.day.condition.text;
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

      
    });

    const hourdatearray = []; 
    const hourimagearray = []; 
    const tempvalues = []; 

    forecastData.forecast.forecastday[weekdaynumber].hour.forEach((item) => {
        const hourdate = new Date(item.time).getHours();
        if(hourdate >= 15 && hourdate <= 22){
            hourdatearray.push(hourdate);
            hourimagearray.push(item.condition.text);
            tempvalues.push(Math.round(item.temp_c));
        }
            
    })

    console.log(hourdatearray);
    console.log(hourimagearray);
    console.log(tempvalues);
    hourdatearray.forEach((item, idx) => {

        const timing = document.querySelectorAll('.timing');
        const hourlyimage = document.querySelectorAll('.hourlyimage');  
        const weekname = document.querySelector('.weekname');
        const tempreatures_c = document.querySelectorAll('.tempvalues');
        tempreatures_c[idx].textContent = tempvalues[idx];
        timing[idx].textContent = time[item];
        weekname.textContent = weekvalues[weekdaynumber];
        if(hourimagearray[idx] === 'Sunny' || hourimagearray[idx] === 'Clear'){
            hourlyimage[idx].src = './assets/images/icon-sunny.webp';
        }else if(hourimagearray[idx] === 'Partly Cloudy'){
            hourlyimage[idx].src = './assets/images/icon-partly-cloudy.webp'; 
        }else if(hourimagearray[idx] === 'Cloudy' || hourimagearray[idx] === 'Overcast'){
            hourlyimage[idx].src = './assets/images/icon-overcast.webp';
        }else if(hourimagearray[idx] === 'Mist' || hourimagearray[idx] === 'Fog' || hourimagearray[idx] === 'Freezing fog' || hourimagearray[idx] === 'Haze' || hourimagearray[idx] === 'Smoke' || hourimagearray[idx] === 'Dust' || hourimagearray[idx] === 'Sand' || hourimagearray[idx] === 'Sandstorm' || hourimagearray[idx] === 'Severe sandstorm' || hourimagearray[idx] === 'Dust storm'){
            hourlyimage[idx].src = './assets/images/icon-fog.webp'; 
        }else if(hourimagearray[idx] === 'Patchy rain nearby' || hourimagearray[idx] === 'Patchy light drizzle' || hourimagearray[idx] === 'Light drizzle' || hourimagearray[idx] === 'Freezing drizzle' || hourimagearray[idx] === 'Patchy light rain'){
            hourlyimage[idx].src = './assets/images/icon-drizzle.webp';
        }else if(hourimagearray[idx] === 'Light rain' || hourimagearray[idx] === 'Moderate rain' || hourimagearray[idx] === 'Heavy rain' || hourimagearray[idx] === 'Light rain shower' || hourimagearray[idx] === 'Moderate or heavy rain shower' || hourimagearray[idx] === 'Torrential rain shower' || hourimagearray[idx] === 'Heavy freezing drizzle' || hourimagearray[idx] === 'Moderate rain at times'){
            hourlyimage[idx].src = './assets/images/icon-rain.webp';
        }else if(hourimagearray[idx] === 'Thundery outbreaks possible' || hourimagearray[idx] === 'Patchy light rain with thunder' || hourimagearray[idx] === 'Moderate or heavy rain with thunder' || hourimagearray[idx] === 'Thundery outbreaks in nearby'){
            hourlyimage[idx].src = './assets/images/icon-storm.webp';
        }else if(hourimagearray[idx] === 'Patchy snow nearby' || hourimagearray[idx] === 'Light snow' || hourimagearray[idx] === 'Moderate snow' || hourimagearray[idx] === 'Heavy snow' || hourimagearray[idx] === 'Blizzard' || hourimagearray[idx] === 'Blowing snow' || hourimagearray[idx] === 'Ice pellets' || hourimagearray[idx] === 'Light sleet' || hourimagearray[idx] === 'Moderate or heavy sleet' || hourimagearray[idx] === 'Light sleet showers' || hourimagearray[idx] === 'Patchy light showers of ice pellets' || hourimagearray[idx] === 'Moderate or heavy showers of ice pellets'){
            hourlyimage[idx].src = './assets/images/icon-snow.webp';
        }
    })
     
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
  
    });
});

