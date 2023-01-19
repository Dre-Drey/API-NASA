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

// Visualisation graphique des données météo sur MARS
const ctx = document.getElementById("chart");
Chart.defaults.color = "white";
const temperatureChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: ["J-6", "J-5", "J-4", "J-3", "J-2", "J-1"],
    datasets: [
      {
        label: "Previous lowest temperatures",
        data: [-87.1, -84.8, -85, -85.4, -86.2, -84.4],
        backgroundColor: "#FFFFFF",
        borderColor: "white",
      },
      {
        label: "Previous highest temperatures",
        color: "white",
        data: [-20.3, -18.2, -14.6, -13.4, -13.8, -20.3],
        backgroundColor: "#FFFFFF",
        borderColor: "white",
      },
    ],
  },
  options: {
    plugins: {
      labels: {
        fontColor: "white",
      },
    },
    scales: {
      y: {
        suggestedMax: -50,
        suggestedMin: -100,
        ticks: {
          font: {
            size: 14,
          },
          color: "white",
        },
      },
      x: {
        ticks: {
          font: {
            size: 14,
          },
          color: "white",
        },
      },
    },
  },
});

function fetchWeather() {
  fetch(
    "https://mars.nasa.gov/rss/api/?feed=weather&category=mars2020&feedtype=json&api_key=rAfAxs6xqfoUBzxLvSRyQUNgE7RYURRNkf2jrj2a"
  )
    .then((results) => {
      return results.json();
    })
    .then((weatherData) => {
      console.log(weatherData.sols[6]);
      const sols = document.querySelector("#sols");
      const dateOnEarth = weatherData.sols[6].terrestrial_date;
      const dateOnEarthsplitted = dateOnEarth.split("-");
      const newDateOnEarth =
        dateOnEarthsplitted[0] +
        " " +
        dicoDesMois[dateOnEarthsplitted[1] - 1] +
        " the " +
        dateOnEarthsplitted[2] +
        "th";
      sols.innerHTML = `Sol ${weatherData.sols[6].sol}</br>${newDateOnEarth}`;
      const temperature = document.querySelector("#temperature");
      temperature.innerHTML = `High ${weatherData.sols[6].max_temp} ºC</br>Low ${weatherData.sols[6].min_temp} ºC`;
      const season = document.querySelector("#season");
      season.innerHTML = `It's ${weatherData.sols[6].season}`;
    });
}
let dicoDesMois = ["January", "February", "March", "April"];
fetchWeather();
