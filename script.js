const options ={
method: 'GET',
headers: {
'X-RapidAPI-Key': 'b45e96323fmshf5e4bc50d3b8a90p1e091djsnfb21cde4eb87',
'X-RapidAPI-Host':'weather-by-api-ninjas.p.rapidapi.com'
}
};
const getWeather = (city) =>{
    cityName.innerHTML=city
    fetch( 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city='+city, options)
    .then (response => response. json () )
    .then (response => {
        
        console.log(response)
        cloud_pct.innerHTML = response.cloud_pct
        temp.innerHTML = response.temp
        feels_like.innerHTML = response.feels_like
        humidity.innerHTML = response. humidity
        min_temp.innerHTML = response.min_temp
        max_temp.innerHTML = response.max_temp
        wind_speed.innerHTML = response.wind_speed
        wind_degrees.innerHTML = response.wind_degrees
        sunrise.innerHTML = response.sunrise
        sunset.innerHTML = response.sunset

        const toIST = (utcTimestamp) => {
            const date = new Date(utcTimestamp * 1000);
            date.setHours(date.getUTCHours() + 5);
            date.setMinutes(date.getUTCMinutes() + 30);
        
            let hours = date.getHours();
            const minutes = date.getMinutes();
            const formattedMinutes = minutes.toString().padStart(2, '0'); // ensure minutes are 2 digits
        
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12; // adjust for 12 AM and 12 PM
        
            return `${hours}:${formattedMinutes} ${ampm}`;
        }
        
        const sunrise1 = response.sunrise;
        const sunset1 = response.sunset;

        document.getElementById("sunrise").innerHTML = toIST(sunrise1);
        document.getElementById("sunset").innerHTML = toIST(sunset1);
        
        
    })
    .catch(err => console.error(err));
} 

submit.addEventListener("click",(e)=>{
    e.preventDefault(); 
    getWeather(city.value)
})

const getWeatherTable = (city, elements) => {
    elements.cityName.innerHTML = city;
    
    fetch('https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=' + city, options)
    .then(response => response.json())
    .then(response => {
        elements.cloud_pct.innerHTML = response.cloud_pct;
        elements.temp.innerHTML = response.temp+"°C";
        elements.feels_like.innerHTML = response.feels_like+"°C";
        elements.humidity.innerHTML = response.humidity;
        elements.min_temp.innerHTML = response.min_temp+"°C";
        elements.max_temp.innerHTML = response.max_temp+"°C";
        elements.wind_speed.innerHTML = response.wind_speed+" Km/hr";
        elements.wind_degrees.innerHTML = response.wind_degrees+"°";
   

        const toIST = (utcTimestamp) => {
            const date = new Date(utcTimestamp * 1000);
            date.setHours(date.getUTCHours() + 5);
            date.setMinutes(date.getUTCMinutes() + 30);
        
            let hours = date.getHours();
            const minutes = date.getMinutes();
            const formattedMinutes = minutes.toString().padStart(2, '0'); // ensure minutes are 2 digits
        
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12; // adjust for 12 AM and 12 PM
        
            return `${hours}:${formattedMinutes} ${ampm}`;
        }
        
        const sunrise1 = response.sunrise;
        const sunset1 = response.sunset;

        elements.sunrise.innerHTML = toIST(sunrise1);
        elements.sunset.innerHTML = toIST(sunset1);

    })
    .catch(err => console.error(err));
}


window.onload = function() {
    const tableRows = document.querySelectorAll('.table tbody tr');
    
    tableRows.forEach(row => {
        const cityElement = row.querySelector('th');
        const cityName = cityElement.innerText;

        const elements = {
            cityName: cityElement,
            cloud_pct: row.cells[1],
            feels_like: row.cells[2],
            humidity: row.cells[3],
            max_temp: row.cells[4],
            min_temp: row.cells[5],
            sunrise: row.cells[6],
            sunset: row.cells[7],
            temp: row.cells[8],
            wind_degrees: row.cells[9],
            wind_speed: row.cells[10],
        };

        getWeatherTable(cityName, elements);
    });
}


getWeather("Dehradun")