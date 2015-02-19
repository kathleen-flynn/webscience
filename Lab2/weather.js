/* 
Creator: Kathleen Flynn
Class: ITWS 4500 Web Science Systems Development
Instructor: Professor Plotka
File Name: weather.js
Purpose: .js for Lab 2; reads in data from the created JSON file. 
Last Modified: 19 February 2015
*/

$(document).ready(function() {

  //Store element name in variable.
  var x = document.getElementById("weatherinfo"); 
  //Variables for grabbing current location. 
  var lat;
  var lon; 

  //HTML geolocation function. 
  function getLocation() {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(storePosition);
      } else { 
          x.innerHTML = "Geolocation is not supported by this browser.";
      }
  }

  //Save your current position, append data to HTML. 
  function storePosition(position) {
      var lat = position.coords.latitude; 
      var lon = position.coords.longitude; 
     
      
      $.ajax({
        type: "GET",
        //JSON data is stored on the web; from API. 
        url: "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon,
        dataType: "json",
        success: function(weather, status){ 

        //Loop through the JSON file and append to HTML
        $('#cityname').append(weather.name); 
        $('#description').append(weather.weather[0].description); 
        $('#windspeed').append("<strong>Wind: </strong>" + weather.wind.speed + " m/s"); 
        $('#humidity').append("<strong>Humidity: </strong>" + weather.main.humidity + "%"); 
        //Storing temperature in unit of personal choice.
        var kelvin = weather.main.temp; 
        var celcius = kelvin - 273.15; 
        var fahrenheit = Math.round((9/5)*celcius + 32); 
        $('#temperature').append(fahrenheit + "&deg;F"); 
        //Getting the image provided by the API. 
        $('#icon').append('<img src="http://openweathermap.org/img/w/' + weather.weather[0].icon + '.png" alt="weathericon">'); 
        }, 
        
        //In case the connection to the JSON file is unsuccessful. 
        error: function(msg, e) {
          alert("There was a problem: " + msg.status + " " + msg.statusText + e);
        }
    
     });
  }
  
  // Initiate call to function that gets current location. 
  getLocation();
});


 



 

