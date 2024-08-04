document.addEventListener("DOMContentLoaded", () => {
    // console.log("loaded");
    document.querySelector("#weather-form").addEventListener("submit", (e) => {
        e.preventDefault();
    })
    document.querySelector("#curr-location").addEventListener("click", () => {
        // -- Get Current Location -- //
        function getLocation () {
            navigator.geolocation ? navigator.geolocation.getCurrentPosition(showPosition, showError) : console.log("error getting location")
        }

        // -- Show positions coordinates -- //
        function showPosition(position) {
            fetchData(position.coords.latitude, position.coords.longitude, 0, "dallas");
        }

        // -- Handle Errors -- //
        function showError () {
            console.log("Error")
        }
        getLocation();
    });
    document.querySelector("#searchBtn").addEventListener("click", () => {
            // -- Get Current Location -- //
            function getLocation () {
                navigator.geolocation ? navigator.geolocation.getCurrentPosition(showPosition, showError) : console.log("error getting location")
            }
    
            // -- Show positions coordinates -- //
            function showPosition(position) {
                let cityToSearch = document.querySelector("#searchedCity").value
                fetchData(position.coords.latitude, position.coords.longitude, 1, cityToSearch);
            }
    
            // -- Handle Errors -- //
            function showError () {
                console.log("Error")
            }
            getLocation();
    })
});



function fetchData (lat, lon, where, city) {
    let url;
    if (where == 0) {
        url = `http://api.weatherapi.com/v1/current.json?key=58ecff395d5346adb6f163402241607&q=${lat},${lon}`
        console.log("worked");
    }else{
        url = `http://api.weatherapi.com/v1/current.json?key=58ecff395d5346adb6f163402241607&q=${city}`
    }
    fetch(url)
                .then(response => response.json())
                .then(data => {
                    const { condition } = data.current
                    const { temp_f } = data.current
                    const { name } = data.location
                    populateDom(condition.text, temp_f, name)
                })
                .catch(error => {
                    console.error('Error fetching weather data:', error);
                });
}

function populateDom(condition, temp, name) {
    document.querySelector("#condition").innerHTML = condition
    document.querySelector("#temp").innerHTML = temp
    document.querySelector("#location").innerHTML = name

    // let weatherImg;
    // case
    let WeatherImg = document.querySelector("#weather-img");
    console.log(condition);
    if (condition == "Clear") {
        WeatherImg.src = "./assets/sun.png"
        console.log(clear);
    } else if (condition == "Cloudy" || condition == "Patchy rain nearby") {
        WeatherImg.src = "./assets/cloudy.png"
    } else if (condition == "rainy" || condition == "Light rain shower") {
        WeatherImg.src = "./assets/raining.png"
    } else {
        WeatherImg.src = "./assets/heavy-rain.png"
    }
}

//https://www.weatherapi.com/docs/

//https://stackoverflow.com/questions/1408790/how-do-i-pull-my-project-from-github

//git clone git@github.com:rasnerk/weather-app.git