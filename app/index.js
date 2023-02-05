const key = '90e758c5fd7441676ca7b1dbc9d44f6c';

const getWeather = async (event) => {
    event.preventDefault();

    const city_name = event.target.city_name.value;
    const urlName = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${key}`;

    const res = await fetch(urlName);
    
    const data = await res.json();

    const name = data['name'];
    const feels_like = data.main.feels_like;
    const humidity = data.main.humidity;
    const temp_max = data.main.temp_max;
    const temp_min = data.main.temp_min;
    const wind = data.wind.speed;
    // const icon = data.weather[0].icon
    console.log(data)
    
  

    const myData = {
        name: name,
        feels_like: feels_like,
        humidity: humidity,
        temp_max: temp_max,
        temp_min: temp_min,
        wind: wind
        // icon: icon
    
    }

    // console.log(icon)
    addToPage(myData)
    
};

const addToPage = (specs) => {
    
    const feelsLike = Math.trunc((specs.feels_like)- 273.15)*9/5 + 32;
    
    const maxTemp = Math.trunc((specs.temp_max)- 273.15)*9/5 + 32;
    
    const minTemp = Math.trunc((specs.temp_min)- 273.15)*9/5 + 32;


    const card = document.createElement('div')
    card.innerHTML =`
    <div class="card" style="width: 18rem;">
    <img src="../static/sun.png" class="card-img-top" alt=" ${specs.name}">
    <div class="card-body">
        <h3 class="card-title">${specs.name}</h3>
        <h5 class="card-title">Real Temp: ${feelsLike}°F</h5>
        <h5 class="card-title">Humidity: ${specs.humidity}%</h5>
        <h5 class="card-title">Max Temp: ${maxTemp}°F</h5>
        <h5 class="card-title">Min Temp: ${minTemp}°F</h5>
        <h5 class="card-title">Wind Speed: ${specs.wind} MPH</h5>
       
    </div>
    </div>
    `
    const container = document.querySelector('.container');
    if (container.innerHTML !== ''){
        container.innerHTML = ''
    }
    container.append(card)
};



const myForm = document.getElementById('myForm');
myForm.addEventListener('submit', getWeather)