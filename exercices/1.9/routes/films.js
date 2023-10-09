const express = require('express');
const {
  ReadAllFilms,
  ReadOneFilm,
  CreateNewFilm,
  DeleteOneFilm,
  UpdateOneFilm,
} = require('../models/films');

const router = express.Router();

/* Read all the pizzas from the menu
   GET /pizzas?order=title : ascending order by title
   GET /pizzas?order=-title : descending order by title
*/
router.get('/', (req, res) => {

  const allFilmsPotentiallyOrdered = ReadAllFilms(req?.query?.order);

  return res.json(allFilmsPotentiallyOrdered);

});

router.get('/:id', (req, res) => {
  const foundFilms = ReadOneFilm(req.params.id);
  return res.json(foundFilms);
});

// Create a pizza to be added to the menu.------------------------------------------------------------------------------------------
router.post('/', (req, res) => {
  const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const duration = req?.body?.duration?.length !== 0 ? req.body.duration : undefined;
  const budget = req?.body?.budget?.length !== 0 ? req.body.budget : undefined;
  const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;

  if (!title || !duration || !budget || !link) return res.sendStatus(400); // error code '400 Bad request'

  const createdFilm = CreateNewFilm(title, duration, budget, link);

  return res.json(createdFilm);
});

// Delete a pizza from the menu based on its id---------------------------------------------------------------------------------
router.delete('/:id', (req, res) => {
  const deletedFilm = DeleteOneFilm(req.params.id);

  if (!deletedFilm) return res.sendStatus(404);

  return res.json(deletedFilm);
});


// Update a pizza based on its id and new values for its parameters------------------------------------------------------------
router.patch('/:id', (req, res) => {
  const title = req?.body?.title;
  const duration = req?.body?.duration
  const budget = req?.body?.budget;
  const link = req?.body?.link;

  if ((!title && !duration && !budget && !link) || title?.length === 0 || duration?.length === 0 || budget?.length === 0 || link?.length === 0) {
    return res.sendStatus(400);
  }

  const updatedFilm = UpdateOneFilm(req.params.id, { title, duration, budget, link});

  if (!updatedFilm) return res.sendStatus(404);

  return res.json(updatedFilm);
});

module.exports = router;
