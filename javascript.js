const icons = {
	2: "wi-thunderstorm",
	3: "wi-sprinkle",
	5: "wi-rain",
	6: "wi-snow",
	7: "wi-fog",
};

function currentWeather(latitude, longitude){
	var request = new XMLHttpRequest();
	request.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			weatherInformation = JSON.parse(this.responseText);

			//Infos aus der API auslesen
			var location = weatherInformation.name;
			temperature = weatherInformation.main.temp;
			var weather = weatherInformation.weather[0].main;
			var weatherId = Math.floor((weatherInformation.weather[0].id)/100);
			var clouds = weatherInformation.weather[0].id;
			
			var icon = document.getElementById("icon");
			if(weatherId in icons){
				icon.className += " " + icons[weatherId];
			}else if(clouds == 800){
				//clear
				icon.className += " wi-day-sunny";
			}else{
				//clouds
				icon.className += " wi-cloud";
			}

			//HTML anpassen
			document.getElementById("location").innerHTML = location;
			document.getElementById("temperature").innerHTML = temperature +"°C";
			document.getElementById("weather").innerHTML = weather;
			document.getElementById("loading").style.display = "none";
			document.getElementById("scale").style.visibility = "visible";

		}
	};
	request.open("GET", "https://fcc-weather-api.glitch.me/api/current?lat=" + latitude + "&lon=" + longitude, true);
	request.send();
}

navigator.geolocation.getCurrentPosition(function(position) {
	var lat = position.coords.latitude;
	var lon = position.coords.longitude;

	currentWeather(lat, lon);
});

	/*var celsius = temperature;
	console.log(celsius)
	//Temperatur in fahrenheit umrechnen
	var fahrenheit;
	fahrenheit = celsius * 1.8 + 32;*/

function scaleFahrenheit(){
	//Temperatur in Fahrenheit umwandeln
	var fahrenheit = temperature * 1.8 + 32;
	//HTML anpassen
	document.getElementById("temperature").innerHTML = fahrenheit + "°F";

	//Aktivierten Button ändern
	var buttonFahrenheit = document.getElementById("fahrenheit");
	buttonFahrenheit.classList.add("active");

	var buttonCelsius = document.getElementById("celsius");
	buttonCelsius.classList.remove("active");
}

function scaleCelsius(){
	document.getElementById("temperature").innerHTML = temperature + "°C";

	//Aktivierten Button ändern
	var buttonCelsius = document.getElementById("celsius");
	buttonCelsius.classList.add("active");

	var buttonFahrenheit = document.getElementById("fahrenheit");
	buttonFahrenheit.classList.remove("active");
}