import { loadJSON } from './utils.js';

const plays = '/data/plays.json'

loadJSON(plays)
  .then(data => generateIndexHTML(data))
  .catch(error => console.error('Erreur lors du chargement des pièces :', error));

function generateIndexHTML(data) {
  const app = document.getElementById("app");
  const title = document.createElement("h1");
  title.textContent = "Liste des pièces";
  app.appendChild(title);

  data.forEach(play => {
    const playTitle = document.createElement("h2");
    playTitle.textContent = play["play-title"];
    app.appendChild(playTitle);

    const ul = document.createElement("ul");
    play.scenes.forEach(scene => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = `scene.html?play=${encodeURIComponent(play["play-title"])}&id=${scene.id}`;
      a.textContent = scene.title;
      li.appendChild(a);
      ul.appendChild(li);
    });
    app.appendChild(ul);
  });
}