const form = document.querySelector(".top-box form");
const input = document.querySelector(".top-box input");
const msg = document.querySelector(".top-box .msg");
const list = document.querySelector(".ajax-section .cities");

const apiKey = "ee564acb56fcada98feae0fe27b57f40";

form.addEventListener("submit", e => {
  e.preventDefault();
  let inputVal = input.value;
  const listItems = list.querySelectorAll(".ajax-section .city");
  const listItemsArray = Array.from(listItems);

  if (listItemsArray.length > 0) {
    const filteredArray = listItemsArray.filter(el => {
      let content = "";

      if (inputVal.includes(",")) {

        if (inputVal.split(",")[1].length > 2) {
          inputVal = inputVal.split(",")[0];
          content = el
            .querySelector(".city-name span")
            .textContent.toLowerCase();
        } else {
          content = el.querySelector(".city-name").dataset.name.toLowerCase();
        }
      } else {
        
        content = el.querySelector(".city-name span").textContent.toLowerCase();
      }
      return content == inputVal.toLowerCase();
    });

    if (filteredArray.length > 0) {
      msg.textContent = `You already know the weather for ${
        filteredArray[0].querySelector(".city-name span").textContent
      } ...otherwise be more specific by providing the country code as well`;
      form.reset();
      input.focus();
      return;
    }
  }
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const {dt, main, name, sys, weather, wind } = data;
      const icon = `http://openweathermap.org/img/wn/${
        weather[0]["icon"]
      }.png`;

      const li = document.createElement("li");
      li.classList.add("city");
      const markup = `
      <div class="design"> 
      <div class="one">
        <h2 class="city-name" data-name="${name},${sys.country}">
          <span>${name}</span>
          <sup>${sys.country}</sup>
        </h2>
        </div>
        
        
        <p style="font-size:2em">Temperature</p>
        <div class="city-temp">${Math.round(main.temp)}<sup>&#8451</sup></div>
        
        <figure>
          <img class="city-icon" src="${icon}" alt="${
        weather[0]["description"]
      }">
          <figcaption>${weather[0]["description"]}</figcaption>
        </figure>
        
        </div>

        <div class="city-name">
        <p>Wind Speed</p>
        <div class="city-temp">${Math.round(wind.speed)}<sup>km/h</sup></div>
        </div>
        <div class="city-name">
        <p>Pressure</p>
        <div class="city-temp">${Math.round(main.pressure)}<sup>hpa</sup></div>
        </div>
        <div class="city-name">
        <p>Humidity</p>
        <div class="city-temp">${Math.round(main.humidity)}<sup>%</sup></div>
        </div>
        
        
      `;
      li.innerHTML = markup;
      form.reset();
      list.prepend(li);
    })
    .catch(() => {
      msg.textContent = "Please search for a valid city";
    });

  msg.textContent = "";
  
  input.focus();
});

function gettime() {
  var date= new Date();
  var hr = date.getHours();
  var m = date.getMinutes();
  var s = date.getSeconds();
  if(m < 10)
  {
      m = "0" + m
  }
  if(s < 10)
  {
      s = "0" + s
  }
  var time = hr + ":" + m + ":" + s;
  setTimeout("gettime()")
  document.getElementById("timer").innerHTML = time;
}