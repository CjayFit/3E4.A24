import Planet from '../models/planet.model.js'; //Planet lien vers notre collection (table) planets en BD

const ZERO_KELVIN = -273.15;

class PlanetRepository {
  retrieveAll() {
    return Planet.find();
  }

  retrieveByUUID(uuidPlanet) {
    return Planet.findOne({ uuid: uuidPlanet });
  }

  retrieveWithCriteria(criteria) {
    //WHERE discoveredBy = 'Skadex' AND temperature > 50 AND position.x <= 70
    //$gt >, $gte >=, $lt <, $lte <=
    const testCriteria = {
      discoveredBy: 'Skadex',
      temperature: { $gt: 50 },
      'position.x': { $lte: 70 },
    };

    //WHERE discoveredBy = 'Skadex' OR temperature > 50
    const testCriteriaOr = {
      $or: [{ discoveredBy: 'Skadex' }, { temperature: { $gt: 50 } }],
    };

    //https://mongoosejs.com/docs/queries.html

    return Planet.find(criteria);
  }

  create(planet) {
    return Planet.create(planet);
  }

  deleteByUUID(uuidPlanet) {
    return Planet.findOneAndDelete({uuid : uuidPlanet});

  }

  transform(planet, options = {}) {
    if (options.unit) {
      if (options.unit === 'c') {
        // Transformation de Kelvin à Celsius
        planet.temperature = parseFloat((planet.temperature + ZERO_KELVIN).toFixed(2), 10);
      }
    }

    //Pour le TP qualité de l'air
    planet.newThing = {
      name: 'Yannick',
    };

    delete planet._id;
    delete planet.__v;

    return planet;
  }
}

export default new PlanetRepository();
