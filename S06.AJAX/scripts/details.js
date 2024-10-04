import { extractUrlParams } from './urlParams.js';

const urlParams = extractUrlParams();

$(document).ready(() => {
    const linkPlanet = urlParams.planet;
    retrievePlanet(linkPlanet);

    $('#btnAddPortal').click(() => {
        addPortal();
    })

    $('#btnExtraction').click(() =>{
        extraction();
    })
});
function clearScreen() {
    // Clear the content of the modalBody
    $('#elements').empty();
}
async function extraction() {
    try {
        const PORTALS_URL = `${urlParams.planet}/actions?type=mine`;
        // PORTALS_URL = https://api.andromia.science/planets/5f1ef4071d2fd12580bf11b8/portals 
        
        
        const response = await axios.get(PORTALS_URL);
        console.log(response);
        if(response.status === 200) {
            const portal = response.data;
            const portalRow = displayExtract(portal);

            $('#elements').prepend(portalRow);

        } else {
            console.log(response);
        }

    } catch (err) {
        console.log(err);
    }
}

function displayExtract(elements) {
 
    $('#elements tbody').empty();
   
    elements.forEach(e => {
        let elementRow = displayElement(e);
        console.log(elementRow);
        $('#elements tbody').append(elementRow);
    });
}
 
function displayElement(element) {
    let elementRow = `<tr> `;
    elementRow += `<td><img style = "width:50px" src="https://assets.andromia.science/elements/${element.element}.png">${element.element}</td> <td>${element.quantity}</td>`;
    elementRow += `</tr>`;
    return elementRow;
}

async function addPortal() {

    try {
        const PORTALS_URL = `${urlParams.planet}/portals`;
        //PORTALS_URL = https://api.andromia.science/planets/5f1ef4071d2fd12580bf11b8/portals 

        const body = {
            position: $('#txtPortalPosition').val(),
            affinity: $('#dtlAffinity').val()
        };
        const response = await axios.post(PORTALS_URL, body);
        if(response.status === 201) {
            const portal = response.data;
            const portalRow = displayPortal(portal);

            $('#portals tbody').prepend(portalRow);

        } else {
            console.log(response);
        }

    } catch(err) {
        console.log(err);
    }
}

async function retrievePlanet(linkPlanet) {
    try {
        const response = await axios.get(linkPlanet); //Le paramètre du get doit être une URL
        if(response.status === 200) {
            const planet = response.data;
            console.log(planet)
            $('#lblPlanetName').html(planet.name);
            $('#imgPlanet').attr('src', planet.icon);
            $('#lblDiscoveredBy').html(planet.discoveredBy);
            $('#lblDiscoveryDate').html(planet.discoveryDate);
            $('#lblTemperature').html(planet.temperature);
            $('#lblPosition').html(`(${planet.position.x.toFixed(2)};${planet.position.y.toFixed(2)};${planet.position.z.toFixed(2)})`);

            const satellites = planet.satellites;

            if(satellites.length > 0) {
                satellites.forEach(s => {
                    $("#satellites").append(`<li>${s}</li>`)
                });
            } else {
                $("#satellites").append('<li>Aucune Satellite</li>');
            }

            displayPortals(planet.portals);


        }
    } catch(err) {
        console.log(err);
    }
}

function displayPortals(portals) {

    portals.forEach(p => {
        let portalRow = displayPortal(p);
        $('#portals tbody').append(portalRow);
    });

}


function displayPortal(portal) {
    let portalRow = '<tr>';
    portalRow += `<td>${portal.position}</td><td><img src="./img/${portal.affinity}.png"></td>`;
    portalRow += '</tr>';
    return portalRow;
}
  /*
    discoveredBy: "Eyonix"
    discoveryDate: "2012-09-18"
    href: "https://api.andromia.science/planets/5f1ef4071d2fd12580bf11ca"
    icon: "https://assets.andromia.science/planets/13.png"
    lightspeed: "-3e2.47ae1d1fda@ef.8213fbfb2d@-383.b7d45bf30cc"
    name: "Soivis"
    portals: []
    position: {x: -994.2800005152476, y: 239.50811743623944, z: -899.7180840938934}
    satellites: (3) ["Antolok Ducan", "Praankor", "Svavin"]
    temperature: 288*/