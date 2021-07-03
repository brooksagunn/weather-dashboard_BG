var key = '4df499f07bd89e71ed347810c57fb5b1';
var city;
var requestURL = "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,minutely&units=imperial&appid=" + key;

var weather;
var temp;
var wind;
var humidity;
var uvi;

var today = new Date();

var days = [String(today)];
var splitDates = [];
var dates = [];
var forecastObj = {};


function getForecast() {
    fetch(requestURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {

            for (var i = 0; i < 6; i++) {
                weather = data.daily[i].weather[0].main; //Weather
                temp = data.daily[i].temp.day; //Temperature
                wind = data.daily[i].wind_speed; //Wind Speed
                humidity = data.daily[i].humidity; //Humidity
                uvi = data.daily[i].uvi; //UV Index

                forecastObj[i] = [];

                forecastObj[i].push(weather);
                forecastObj[i].push(temp);
                forecastObj[i].push(wind);
                forecastObj[i].push(humidity);
                forecastObj[i].push(uvi);
            }
        })
}

getForecast();

var daySplit;
var newDayString;
var newDaySplit;
var newDaySlicify;

var monthAbbr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function getDate() {

    for (var i = 1; i < 6; i++) {
        newDay = new Date(days[i-1]);
        newDay.setDate(newDay.getDate() + 1);
        newDayString = String(newDay);

        days[i] = "";
        days[i] += newDayString;
    }

    for (var n = 0; n < days.length; n++) {
        newDaySplit = days[n].split(" ");
        newDaySlice = newDaySplit.slice(1, 4);
        splitDates[n] = "";
        splitDates[n] += newDaySlice;
    }

    for (var i = 0; i < splitDates.length; i++) {
        splitDates[i] = splitDates[i].split(",");
    }
   
    for (var i = 0; i < splitDates.length; i++) {
        splitDates[i][0] = convertDay(splitDates[i][0]);
    }

    return splitDates;
};

console.log(getDate()[0]);


function convertDay(month) { 
    for (var i = 0; i < monthAbbr.length; i++) {
        console.log(monthAbbr[i]);
        if (month === monthAbbr[i]) {
            return String(i + 1);
        }
    }
}