//Afficher l'image uniquement lorsqu'une date est sélectionnée
document.getElementById("date").oninput = function () {
  fetchData();
};

//Récupérer la date saisie
function dateSaisie() {
  const saisie = document.getElementById("date").value;
  return saisie;
}
//Afficher l'image du jour (API APOD)
const url =
  "https://api.nasa.gov/planetary/apod?api_key=rAfAxs6xqfoUBzxLvSRyQUNgE7RYURRNkf2jrj2a&date=";

function fetchData() {
  fetch(url + dateSaisie() + "&")
    .then((response) => {
      return response.json();
    })
    .then((nasaData) => {
      const title = document.querySelector("#picture_title");
      title.innerHTML = `${nasaData.title} <br> by ${nasaData.copyright}`;
      title.style.setProperty("background-color", "#333");
      const description = document.querySelector("#picture_description");
      description.innerHTML = nasaData.explanation;
      description.style.setProperty("background-color", "#333");
      const picture = document.querySelector("#container-2");
      const nasaPicture = nasaData.hdurl;
      picture.style.setProperty(
        "background",
        `url(${nasaPicture}) no-repeat fixed center`
      );
      let oldButton = document.getElementsByClassName("media");
      if (oldButton.length > 0) {
        oldButton[0].href = `${nasaPicture}`;
      } else {
        let newLink = document.createElement("a");
        let newContent = document.createTextNode("See media in full-size");
        newLink.setAttribute("class", "media");
        newLink.href = `${nasaPicture}`;
        newLink.target = "_blank";
        newLink.appendChild(newContent);
        let currentDiv = document.getElementById("picture_description");
        currentDiv.after(newLink);
      }
    });
}

function displayPicture() {
  fetch(url + dateSaisie() + "&")
    .then((response) => {
      return response.json();
    })
    .then((nasaData) => {
      window.location.href = `${nasaData.hdurl}`;
    });
}

//Données météo sur Mars
function fetchWeather() {
  fetch(
    "https://mars.nasa.gov/rss/api/?feed=weather&category=msl&feedtype=json" //ancienne API : https://mars.nasa.gov/rss/api/?feed=weather&category=mars2020&feedtype=json&api_key=rAfAxs6xqfoUBzxLvSRyQUNgE7RYURRNkf2jrj2a
  )
    .then((results) => {
      return results.json();
    })
    .then((weatherData) => {
      const sols = document.querySelector("#sols");
      const dateOnEarth = weatherData.soles[0].terrestrial_date;
      const dateOnEarthsplitted = dateOnEarth.split("-");
      const newDateOnEarth =
        dateOnEarthsplitted[0] +
        " " +
        dicoDesMois[dateOnEarthsplitted[1] - 1] +
        " the " +
        dateOnEarthsplitted[2] +
        "th";
      sols.innerHTML = `Sol ${weatherData.soles[0].sol}</br>${newDateOnEarth}`;
      const temperature = document.querySelector("#temperature");
      temperature.innerHTML = `Highest : ${weatherData.soles[0].max_temp} ºC</br>Lowest : ${weatherData.soles[0].min_temp} ºC`;
      const season = document.querySelector("#season");
      season.innerHTML = `It's ${weatherData.soles[0].season} on Mars`;

      // Visualisation graphique des données météo sur MARS
      const ctx = document.getElementById("chart");
      Chart.defaults.color = "black";
      Chart.defaults.backgroundColor = "#9BD0F5";
      const getDataMin = () => {
        let dataMin = [];
        for (let i = 1; i < 7; i++) {
          dataMin.push(weatherData.soles[i].min_temp);
        }
        return dataMin;
      };
      const getDataMax = () => {
        let dataMax = [];
        for (let i = 1; i < 7; i++) {
          dataMax.push(weatherData.soles[i].max_temp);
        }
        return dataMax;
      };
      const temperatureChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: ["J-6", "J-5", "J-4", "J-3", "J-2", "J-1"],
          datasets: [
            {
              label: "Previous lowest temperatures",
              data: getDataMin(),
              backgroundColor: "#672a09",
              borderColor: "#672a09",
            },
            {
              label: "Previous highest temperatures",
              color: "white",
              data: getDataMax(),
              backgroundColor: "#eeae8a",
              borderColor: "#eeae8a",
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              labels: {
                fontColor: "black",
                padding: 24,
                font: {
                  family: "'Quicksand', Helvetica, sans-serif",
                  size: 16,
                },
              },
            },
          },
          scales: {
            y: {
              suggestedMax: -50,
              suggestedMin: -100,
              ticks: {
                font: {
                  family: "'Quicksand', Helvetica, sans-serif",
                  size: 16,
                },
                color: "black",
              },
            },
            x: {
              ticks: {
                font: {
                  size: 16,
                },
                color: "black",
              },
            },
          },
          responsive: true,
        },
      });
    });
}
let dicoDesMois = ["January", "February", "March", "April", "May"];
fetchWeather();

//Données sur les astéroides
document.getElementById("asteroid_date").oninput = function () {
  getDataAsteroids;
};

function getDateAsteroid() {
  const date = document.getElementById("asteroid_date").value;
  return date;
}

function getDataAsteroids() {
  const startURL = "https://api.nasa.gov/neo/rest/v1/feed?start_date=";
  const endURL = "&api_key=byMXZRYPDymQvCcgAEarTFUmCZVtf4OXrnRu5UPY";
  fetch(
    startURL + getDateAsteroid() + "&end_date=" + getDateAsteroid() + endURL
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      const length = data.near_earth_objects["2023-03-03"];
      const description = document.querySelector("#asteroid_description");
      description.innerHTML = `${length.length} asteroids were near the eart on this date`;
      description.style.setProperty("background-color", "#333");
    });
}

getDataAsteroids();

// document.getElementById("asteroid_date").oninput = getDataAsteroids();

// function fetchAsteroids () {
//   const dateAsteroid = () => {
//     return document.getElementById("asteroid_input").value
//   }
//   const asteroidsData = await fetch ("https://api.nasa.gov/neo/rest/v1/feed?start_date=" + dateAsteroid() +"&api_key=rAfAxs6xqfoUBzxLvSRyQUNgE7RYURRNkf2jrj2a&date=")
//   console.log(asteroidsData)
// }
