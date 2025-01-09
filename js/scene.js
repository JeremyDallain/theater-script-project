import { loadJSON } from './utils.js';

const plays = '/data/plays.json'

loadJSON(plays)
  .then(data => {
    const params = new URLSearchParams(window.location.search);
    const playTitle = params.get('play');
    const sceneId = parseInt(params.get('id'));

    const play = data.find(play => play["play-title"] === playTitle);
    if (play) {
      const scene = play.scenes.find(scene => scene.id === sceneId);
      if (scene) {
        generateSceneHTML(play["play-title"], scene);
      } else {
        displayError("Scène non trouvée.");
      }
    } else {
      displayError("Pièce non trouvée.");
    }
  })
  .catch(error => console.error('Erreur lors du chargement des pièces :', error));

function generateSceneHTML(playTitle, scene) {
  const app = document.getElementById("app");
  const backLink = document.createElement("a");
  backLink.href = "index.html";
  backLink.textContent = "⬅ Retour à l'accueil";
  app.appendChild(backLink);

  const title = document.createElement("h1");
  title.textContent = `${playTitle} - ${scene.title}`;
  app.appendChild(title);

  let previousDiv = null;
  const mainCharacter = "Philippe"; // Dynamique si nécessaire

  scene.script.forEach(line => {
    const div = document.createElement("div");
    div.classList.add("replica");

    if (line.caracter === "") {
      div.classList.add("description");
      const p = document.createElement("p");
      p.textContent = line.text;
      div.appendChild(p);
    } else {
      const span = document.createElement("span");
      span.textContent = line.caracter;
      const p = document.createElement("p");
      p.textContent = line.text;

      div.appendChild(span);
      div.appendChild(p);

      if (line.caracter === mainCharacter) {
        div.classList.add("main-caracter");
        if (previousDiv) {
          previousDiv.classList.add("before-main-caracter");
        }
      }

      previousDiv = div;
    }

    app.appendChild(div);
  });
}

function displayError(message) {
  const app = document.getElementById("app");
  app.textContent = message;
}