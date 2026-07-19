require('dotenv').config({
    path:__dirname + '/.env'
});

const express = require('express');
const cors = require('cors');
const path = require('path');
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());

app.use(express.static(path.join(__dirname,'../')))

// const apikey = weatherapikey;
// const second_api = weathersecondapi;

// console.log(apikey);
// console.log(second_api);

// app.get('/',(req, res) => {
//     res.send('Server is running...');
// });

app.get('/geo',async(req, res) => {
    const {lat, lon} = req.query;

    try{
        const currentResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.weatherapikey}&units=metric`
        ); 

        const currentData = await currentResponse.json();
        const forecastResponse = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=${process.env.weathersecondapi}&q=${currentData.coord.lat},${currentData.coord.lon}&days=7&aqi=yes&alerts=yes`
        )

        const forecastData = await forecastResponse.json();

        console.log(forecastData);
        res.json({
            current:currentData,
            forecast:forecastData
        });
    }catch(error){
        res.status(500).json({
            message:error.message
        });
    }
})

app.get('/search', async(req, res) => {
    const {city} = req.query;
    try{

        const currentResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.weatherapikey}&units=metric`
        );

        const currentData = await currentResponse.json();

        const forecastResponse = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=${process.env.weathersecondapi}&q=${currentData.name}&days=7&aqi=yes&alerts=yes`
        ); 

        const forecastData = await forecastResponse.json();
        console.log(forecastData);
        res.json({
            current:currentData, 
            forecast:forecastData
        });
    }catch(error){
        res.status(500).json({
            message:error.message
        }); 
    }
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})
