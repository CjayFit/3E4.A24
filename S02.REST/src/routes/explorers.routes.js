import { Router } from 'express';
import HttpErrors from 'http-errors';

import planetRepository from '../repositories/planet.repository.js';

const router = Router();

router.get('/:explorerName/planets', async (req, res, next) => {

    try {

        //Retrouver les données
        const criteria = { discoveredBy: req.params.explorerName };
        let planets = await planetRepository.retrieveWithCriteria(criteria);

        //Transformer les données
        planets = planets.map(p => {
            p = p.toObject({getters:false, virtuals:false});
            p = planetRepository.transform(p);
            return p;
        })

        //Retourner une réponse
        res.status(200).json(planets);


    } catch(err) {
        return next(err);
    }
});


export default router;
