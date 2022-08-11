let apiKey = "15164c9b619701724959dab0745876ae";
let btnEl = $('button');
let asideEl = $('aside');
var sectionEl = $('section');
let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];


// This generates geographic location
function generateGeo() {
  var inputEl
  if ($(this).attr('id') === "submit") {
    inputEl = $('input').val();

    var passedBtnEl = $('<button>');
    passedBtnEl.text(inputEl);
    asideEl.append(passedBtnEl);

  } else {
    inputEl = $(this).text()
  }

  const geoAPIUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${inputEl}&limit=1&appid=${apiKey}`;
  fetch(geoAPIUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      const lat = data[0].lat;
      const lon = data[0].lon;
      getWeather(lat, lon)
    })
};


// This function collects and displays weather info
function getWeather(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
  var inputEl
  $(sectionEl).empty();
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data.current.temp);
      console.log(data.current.humidity);
      console.log(data.current.uvi);


      inputEl = $('input').val();

      var city = $('<h1>');
      city.text(inputEl);

      var temp = $("<h2>");
      temp.text(data.current.temp);

      var humid = $("<h2>");
      humid.text(data.current.humidity);

      var uv = $("<h2>");
      uv.text(data.current.uvi);


      sectionEl.append(city);
      sectionEl.append(temp);
      sectionEl.append(humid);
      sectionEl.append(uv);


      var tempObject = {
        city: inputEl,
        temp: data.current.temp,
        humid: data.current.humidity,
        uv: data.current.uvi,
      }


      searchHistory.push(tempObject)
      localStorage.setItem('searchHistory', JSON.stringify(searchHistory))
    })
};

function createPastButtons(){


  
}


btnEl.on('click', generateGeo);
asideEl.on('click', 'button', generateGeo);


