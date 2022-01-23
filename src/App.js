import './index.css';
import React, { useState } from 'react';


const api ={
  key: "47adf0bea8189d49cb7f6d2a1f385a02",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState('{}');

  const search = evt =>{
    if (evt.key === "Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        console.log(weather);
      });
    }
  }

  const dateBuilder = (d) =>{
    let months =["January", "February", "March",  "April", "May", "June", "July", "August", "September", "October", "November", "December",];
    let days =["Sunday", "Monday", "Tuesday",  "Wednesday", "Thurdsay", "Friday", "Saturday"];


    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`
  }

  return (
    <div className="app">
      <main class="">
        <div class="search-box w-full max-w-sm m-auto mt-20">
          <div class="flex items-center border-b border-teal-500 py-2">
            <input 
            class=" appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:bg-white focus:outline-none rounded-lg" 
            type="text" 
            placeholder="Enter City..." 
            aria-label="Full name" on 
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
            />
          </div>
        </div>

      {(typeof weather.main != "undefined") ? (
        <div class=" font-serif font-light">
          <div class="location-box m-auto text-center mt-20 text-white">
            <h1 class=" text-4xl location m-auto italic">{weather.name}, {weather.sys.country}</h1>
            <h1 class="date text-2xl italic mt-4">{ dateBuilder(new Date())}</h1>
          </div>

          <div class="weather-box m-auto text-center mt-10 text-white">
            <h1 class="temp text-6xl font-semibold shadow-lg bg-slate-300 center inline-block p-4 rounded-lg">{Math.round(weather.main.temp)}°C</h1> 
            <h1 class="weather text-4xl mt-5">{weather.weather[0].main}</h1> 
          </div>
        </div>
      ) : ('')}


      </main>
    </div>
  );
}

export default App;
