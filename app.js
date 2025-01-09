// Chargement du JSON dynamiquement depuis un fichier
fetch('scenes.json')
    .then(response => response.json())
    .then(data => {
        const scene2 = data.find(scene => scene.title === "Scène 2");
        const mainCharacter = "Philippe";

        // Génération et ajout au DOM
        const app = document.getElementById("app");
        const sceneHTML = generateSceneHTML(scene2, mainCharacter);
        app.appendChild(sceneHTML);
    })
    .catch(error => console.error('Error loading JSON:', error));

// Génération du contenu HTML
function generateSceneHTML(scene, mainCharacter) {
    const container = document.createElement("div");

    const title = document.createElement("h1");
    title.textContent = scene.title;
    container.appendChild(title);

    let previousDiv = null;
    let previousCharacter = null;

    scene.script.forEach((line) => {
        const div = document.createElement("div");
        div.classList.add("replica");

        if (line.caracter === "") {
            // Description
            div.classList.add("description");
            const p = document.createElement("p");
            p.textContent = line.text;
            div.appendChild(p);
        } else {
            // Réplique
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

            previousCharacter = line.caracter;
            previousDiv = div;
        }

        container.appendChild(div);
    });

    return container;
}
