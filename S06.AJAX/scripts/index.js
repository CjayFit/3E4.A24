import { PLANETS_URL } from './constants.js';

$(document).ready(() => {
  //Une fois que la page(html) est chargée.
  retrievePlanets();
});

async function retrievePlanets() {
  try {
    const response = await axios.get(PLANETS_URL);
    if (response.status === 200) {
      const planets = response.data;
      planets.forEach(p => {
        $('#planets').append(displayPlanet(p));
      });

    }
  } catch (err) {
    console.log(err);
  }
}

function displayPlanet(planet) {
    let planetTag = `<a class="card col-2 mx-2 my-2" href="./details.html?planet=${planet.href}"><div>`;
    planetTag += `<img src="${planet.icon}" class="card-img-top" alt="L'image de la planète ${planet.name}." />`; 
    planetTag += `<h5 class="card-title">${planet.name}</h5>`
    planetTag += '</div></a>';

    return planetTag;
}

