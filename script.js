document.getElementById("searchButton").addEventListener("click", async () => {
  const city = document.getElementById("search").value;
  const url = `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${city}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "1baafaa247msh6e99a11b37c70a0p18dbc0jsn435216609e58",
      "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    //   Temperature
    document.getElementById("temp").innerHTML = `${result.temp}°C`;
    document.getElementById("min_temp").innerHTML = result.min_temp + "°C";
    document.getElementById("max_temp").innerHTML = result.max_temp + "°C";

    //   Wind Info
    document.getElementById("wind_speed").innerHTML = result.wind_speed + "m/s";
    document.getElementById("wind_degrees").innerHTML =
      result.wind_degrees + "°";
    document.getElementById("humidity").innerHTML = result.humidity + "%";


    // Function to convert Unix timestamp to AM/PM time
    function unixTimeStampToAMPM(unixTimestamp) {
      // Create a new Date object with the Unix timestamp
      let date = new Date(unixTimestamp * 1000);

      // Get hours, minutes, and AM/PM
      let hours = date.getHours();
      let minutes = "0" + date.getMinutes();
      let ampm = hours >= 12 ? "PM" : "AM";

      // Convert hours to 12-hour format
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'

      // Construct the time string
      let timeString = hours + ":" + minutes.substr(-2) + " " + ampm;

      return timeString;
    }

    let sunrise = result.sunrise;
    let sunset = result.sunset;
    // Example usage
    let sunriseTimestamp = sunrise;
    let sunsetTimestamp = sunset;

    let sunriseTime = unixTimeStampToAMPM(sunriseTimestamp);
    let sunsetTime = unixTimeStampToAMPM(sunsetTimestamp);

    console.log("Sunrise:", sunriseTime);
    console.log("Sunset:", sunsetTime);

    document.getElementById("feels_like").innerHTML = result.feels_like + "°C";
    document.getElementById("sunset").innerHTML = sunriseTime;
    document.getElementById("sunrise").innerHTML = sunsetTime;
  } catch (error) {
    console.error(error);
  }
});