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
      console.log(nasaData);
      const title = document.querySelector("#picture_title");
      title.innerHTML = `${nasaData.title} by ${nasaData.copyright}`;
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
      let newButton = document.createElement("button");
      let textButton = "See media in full-size";
      textButton.link(`${nasaPicture}`);
      let newContent = document.createTextNode("See media in full-size");
      newButton.appendChild(newContent);
      console.log(newButton);
      let currentDiv = document.getElementById("picture_description");
      currentDiv.after(newButton);
      //   const button = document.querySelector("#full-media");
      //   button.style.setProperty("display", "block");
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
