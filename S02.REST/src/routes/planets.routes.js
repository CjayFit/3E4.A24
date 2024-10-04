import { Router } from 'express';
import HttpErrors from 'http-errors'

import PLANETS from '../data/planets.js';

import planetRepository from '../repositories/planet.repository.js';

import methodMiddleware from '../middlewares/method.js';

const router = Router();

router.get('/', methodMiddleware, async (req, res, next) => {
  try {

    const transformOptions = {};

    if(req.query.unit) {
      if(req.query.unit === 'c') {
        transformOptions.unit = 'c';
      } else if(req.query.unit !== 'k') {
        return next(HttpErrors.BadRequest('Le paramètre unit doit être c ou k'));
      }
    }

    let planets = await planetRepository.retrieveAll();
    planets = planets.map(p => {
      p = p.toObject({getters: false, virtuals: false}); //Transforme la planète de la base de donnée en objet JS
      p = planetRepository.transform(p, transformOptions);
      return p;
    });


    console.log(req.info);
    res.status(200).json(planets);
  } catch (err) {
    return next(err);
  }
});

//: devant dans l'url => paramètre
router.get('/:uuidPlanet', async (req, res, next) => {

  //next = égale la gestion des erreurs
  try {
    //1. Trouver en base de données la planète avec uuid reçu en paramètre
    let planet = await planetRepository.retrieveByUUID(req.params.uuidPlanet);

    //2. La planète voulue n'existe pas
    if(!planet) {
      //Erreur 404
      return next(HttpErrors.NotFound(`Planet with uuid : ${req.params.uuidPlanet} not found`));
    }

    //3. Si l'existe envoyer la planète dans la réponse au client
    planet = planet.toObject({getters: false, virtuals: false});
    planet = planetRepository.transform(planet);
    res.status(200).json(planet);
  } catch (err) {
    //Gestion d'erreur
    return next(err);
  }

});

router.post('/', async (req, res, next) => {
  const newPlanet = req.body;
  const isEmpty = Object.keys(newPlanet).length === 0;

  if(isEmpty) {
    return next(HttpErrors.BadRequest('La planète doit contenir au moins une propriété'));
  }

  try {

    //1. Essayer de mettre la planète en base de données
    let planet = await planetRepository.create(newPlanet);

    //2. Transformer la planète avant de la retourner
    planet = planet.toObject({getters:false, virtuals:false});
    planet = planetRepository.transform(planet);

    //3. Retourner une réponse -> 201 CREATED
    res.status(201).json(planet);

  } catch(err) {
    return next(err);
  }
});

router.delete('/:uuidPlanet', async (req, res, next) => {
  try {
    const planet = await planetRepository.deleteByUUID(req.params.uuidPlanet);
    
    if(!planet) {
      return next(HttpErrors.NotFound(`La planète avec le uuid: ${req.params.uuidPlanet} n'existe pas.`));
    }
    //No Content
    res.status(204).end();

  } catch(err) {
    return next(err);
  }

  res.status(204).end();
});

router.patch('/:idPlanet', (req, res) => {
  res.status(405).end();
});

router.put('/:idPlanet', (req, res) => {
  res.status(501).end();
});

export default router;
