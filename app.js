const apiKey = "20fc73ff7b243f71f9b8cd4f797d177a"; //key to use during request
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="; //api of the website to get info from
const searchButton = document.querySelector("button"); //button to make a search request
const weatherIcon = document.querySelector(".weather-icon"); //part of the web site to show weather info

//
//function to make api request to get weather info in the entered city 
function checkWeather(){
    var city = document.getElementById("searchCity").value; //the city name usr entered

    fetch(apiUrl + city + `&appid=${apiKey}`) //make request according to the api rules
    .then((response) => response.json())
    .then((data) => {
        if(data.cod == 404){
            //if name of the city cannot be found display the div with a message about it and hide the weather info div
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
            document.getElementById("searchCity").value = "";
        }
        else{
            //if name of the city can be found display the weather info div and hide the div with a message about non existent city
            document.querySelector(".error").style.display = "none";
            document.querySelector(".weather").style.display = "block";
            document.getElementById("searchCity").value = "";

            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c"; //display temperature
            document.querySelector(".city").innerHTML = data.name; //display city name
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%"; //display humidity
            document.querySelector(".wind").innerHTML = Math.round(data.wind.speed) + " km/h"; //display wind speed
    
            var weather = data.weather[0].main; //variety with info about the precipitation
            //get the name of the precipitation and display the corresponding image
            if(weather === "Clear"){
                weatherIcon.src = "images/clear.png";
            }
            else if(weather === "Clouds"){
                weatherIcon.src = "images/clouds.png";
            }
            else if(weather === "Drizzle"){
                weatherIcon.src = "images/drizzle.png";
            }
            else if(weather === "Mist"){
                weatherIcon.src = "images/mist.png";
            }
            else if(weather === "Rain"){
                weatherIcon.src = "images/rain.png";
            }
            else if(weather === "Snow"){
                weatherIcon.src = "images/snow.png";
            }
        }
    });
}

searchButton.addEventListener("click", checkWeather, false); //add event listener to the search button