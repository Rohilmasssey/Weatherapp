require('dotenv').config({
    path:__dirname + '/.env'
});

const express = require('express');
const cors = require('cors');
const path = require('path');
const weatherCache = new Map();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());

app.use(express.static(path.join(__dirname,'../')))


app.get('/geo',async(req, res) => {
    const {lat, lon} = req.query;

    const cacheKey = `${lat},${lon}`;

    // Check cache
    const cached = weatherCache.get(cacheKey);

    if(cached && Date.now() - cached.time < 10 * 60 * 1000){
        console.log('Returning cached data');

        return res.json(cached.data);
    }

    try{
        const currentResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.weatherapikey}&units=metric`
            // `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&hourly=temperature_2m,weather_code,relative_humidity_2m&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=7`
        ); 


        const currentData = await currentResponse.json();

        if(!currentResponse.ok){
            console.log('OpenWeather Error:', currentData)

            return res.status(currentResponse.status).json({
                message:'OpenWeather API error', 
                error:currentData
            })
        }

        const forecastResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${currentData.coord.lat}&longitude=${currentData.coord.lon}&current=temperature_2m,weather_code&hourly=temperature_2m,weather_code,relative_humidity_2m&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=7`
        )

        const forecastData = await forecastResponse.json();


        if (!forecastResponse.ok || forecastData.error) {
            console.log("Open-Meteo Error:", forecastData);
            return res.status(forecastResponse.status).json({
                message: "Open-Meteo API error",
                error: forecastData
            });
        }

        console.log(forecastData);
        console.log(currentData);
        // res.json({
        //     current:currentData,
        //     forecast:forecastData
        // });
        const result = {
            current: currentData, 
            forecast:forecastData
        }

        weatherCache.set(cacheKey, {
            data:result, 
            time:Date.now()
        })

        return res.json(result);
    }catch(error){
        res.status(500).json({
            message:error.message
        });
    }
})

app.get('/search', async(req, res) => {
    const {city} = req.query;

    const cacheKey = `${city}`;

    // Check cache
    const cached = weatherCache.get(cacheKey);

    if(cached && Date.now() - cached.time < 10 * 60 * 1000){
        console.log('Returning cached data');

        return res.json(cached.data);
    }

    try{

        const currentResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city.trim())}&appid=${process.env.weatherapikey}&units=metric`
            // `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
        );

        const currentData = await currentResponse.json();

        if(!currentResponse.ok){
            console.log('OpenWeather Error:', currentData)

            return res.status(currentResponse.status).json({
                message:'OpenWeather API error', 
                error:currentData
            })
        }

        const forecastResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${currentData.coord.lat}&longitude=${currentData.coord.lon}&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=7`
        ); 

        const forecastData = await forecastResponse.json();

        if (!forecastResponse.ok || forecastData.error) {
            console.log("Open-Meteo Error:", forecastData);
            return res.status(forecastResponse.status).json({
                message: "Open-Meteo API error",
                error: forecastData
            });
        }
        console.log(forecastData);
        // res.json({
        //     current:currentData, 
        //     forecast:forecastData
        // });
        const result = {
            current:currentData, 
            forecast:forecastData
        }

        weatherCache.set(cacheKey, {
            data:result, 
            time:Date.now()
        })

        return res.json(result);
    }catch(error){
        res.status(500).json({
            message:error.message
        }); 
    }
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})
