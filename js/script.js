var msg = "Sorry, we are unable to get your location";

if (Modernizr.geolocation) {
    navigator.geolocation.getCurrentPosition(success, fail);
} else {
	window.alert(msg);
}

function success(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;

    var url = "https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + lon;    

    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.onload = function() {
	    var data = JSON.parse(request.responseText);
	    render_html(data);
    };
    request.send();
    //console.log(lat)
    //console.log(lon);
}

function fail(msg) {
	window.alert(msg);
}

function render_html(data) {

	var main = document.getElementById("text");

	var text = main.childNodes[1].firstChild.nodeValue;
	text = data.weather[0].main;
	main.childNodes[1].firstChild.nodeValue = text;

    var description = main.childNodes[3].firstChild.nodeValue;
    description = data.weather[0].description;
    main.childNodes[3].firstChild.nodeValue = description;

    var icon = document.getElementById("icon").childNodes[1];
    icon.setAttribute("src", data.weather[0].icon);

    var ul = document.getElementById("second").childNodes[1];

    var temp = ul.childNodes[1].firstChild.nodeValue;
    temp = data.main.temp;
    ul.childNodes[1].firstChild.nodeValue = "Average (Celsius): " + temp;

    var max = ul.childNodes[3].firstChild.nodeValue;
    max = data.main.temp_max;
    ul.childNodes[3].firstChild.nodeValue = "Max temp (Celsius): " + max;

    var min = ul.childNodes[5].firstChild.nodeValue;
    min = data.main.temp_min;
    ul.childNodes[5].firstChild.nodeValue = "Min temp (Celsius): " + min;

    var humidity = ul.childNodes[7].firstChild.nodeValue;
    humidity = data.main.humidity;
    ul.childNodes[7].firstChild.nodeValue = "Humidity: " + humidity + "%";

    var milliseconds = data.sys.sunrise;
    var sunrise = new Date(milliseconds);
    var time = sunrise.toTimeString();

    var third_ul = document.getElementById("third").childNodes[1];
    var alba = third_ul.childNodes[3].firstChild.nodeValue;
    alba = time;
    third_ul.childNodes[3].firstChild.nodeValue = alba;

    var milliseconds_2 = data.sys.sunset;
    var sunset = new Date(milliseconds_2);
    var time_2 = sunset.toTimeString();

    var tramonto = third_ul.childNodes[7].firstChild.nodeValue;
    tramonto = time_2;
    third_ul.childNodes[7].firstChild.nodeValue = tramonto;

    var btn = document.getElementById("btn");
    var unit = btn.childNodes[0].firstChild.nodeValue;

    btn.addEventListener("click", function() {

        if (unit == "Fahrenheit") {
            unit = "Celsius";
            btn.childNodes[0].firstChild.nodeValue = unit;

            min = data.main.temp_min;
            min = (min*9)/5 + 32;
            ul.childNodes[5].firstChild.nodeValue = "Min temp (Fahrenheit): " + min;

            max = data.main.temp_max;
            max = (max*9)/5 + 32;
            ul.childNodes[3].firstChild.nodeValue = "Max temp (Fahrenheit): " + max;

            temp = data.main.temp;
            temp = (temp*9)/5 + 32;
            ul.childNodes[1].firstChild.nodeValue = "Average (Fahrenheit): " + temp;

        } else {
            unit = "Fahrenheit";
            btn.childNodes[0].firstChild.nodeValue = unit;

            min = data.main.temp_min;
            ul.childNodes[5].firstChild.nodeValue = "Min temp (Celsius): " + min;

            max = data.main.temp_max;
            ul.childNodes[3].firstChild.nodeValue = "Max temp (Celsius): " + max;

            temp = data.main.temp;
            ul.childNodes[1].firstChild.nodeValue = "Average (Celsius): " + temp;
        }
    
    });

}




