var express = require('express');
const {serialize, parse} = require('../utils/json');
var router = express.Router();
var i = 0;

const jsonDbPath = __dirname + '/../data/films.json';

const MENU = [
  {
    id: 1,
    title: "Interstellar",
    duration: 149,
    budget: 165,
    link: "https://www.imdb.com/title/tt0816692/",
  },
  {
    id: 2,
    title: "Memento",
    duration: 91,
    budget: 9,
    link: "https://www.imdb.com/title/tt0209144/",
  },
  {
    id: 3,
    title: "Ponyo",
    duration: 84,
    budget: 22,
    link: "https://www.imdb.com/title/tt0876563/",
  },
];

// Read all the films from the menu-------------------------------------------------------------------------------------------
router.get('/', (req, res, next) => {

  console.log(req.query.order);

  const orderByDuration =
  req?.query?.order?.includes('duration')
      ? req.query.order
      : undefined;

  
  
  console.log(`order by ${orderByDuration ?? 'not requested'}`);

  const films = parse(jsonDbPath, MENU);

  if(!orderByDuration) {
    console.log('vache');
    return res.json(films);
  }

  console.log('saucisse')
  let orderedMenu = [...films].sort((a, b) => a.duration - b.duration);
  if (orderByDuration === '-duration') orderedMenu = orderedMenu.reverse();


  console.log(orderByDuration);
  console.log(orderedMenu);

  console.log('GET /films');
  res.json(orderedMenu ?? films);
});

router.get('/:id', (req, res) => {
  console.log(`GET /films/${req.params.id}`);

  const films = parse(jsonDbPath, MENU);

  const indexOfFilmFound = films.findIndex((film) => film.id == req.params.id);

  if (indexOfFilmFound < 0) return res.sendStatus(400);



  return res.json(films[indexOfFilmFound]);
});

// Create a pizza to be added to the menu.------------------------------------------------------------------------------------------
router.post('/', (req, res) => {
  const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const duration = req?.body?.duration?.length !== 0 ? req.body.duration : undefined;
  const budget = req?.body?.budget?.length !== 0 ? req.body.budget : undefined;
  const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;

  console.log('POST /Film');

  if (!title || !duration || !budget || !link) return res.sendStatus(400); // error code '400 Bad request'

  let matchTitle;
  console.log(`try to match with ${matchTitle ?? 'not requested'}`);

    matchTitle = [...MENU].find(a => title === a.title);

  if(matchTitle != undefined) return res.sendStatus(409);

  const films = parse(jsonDbPath, MENU);

  const lastItemIndex = films?.length !== 0 ? films.length - 1 : undefined;
  const lastId = lastItemIndex !== undefined ? films[lastItemIndex]?.id : 0;
  const nextId = lastId + 1;

  const newFilm = {
    id: nextId,
    title: title,
    duration: duration,
    budget: budget,
    link: link,
  };

  films.push(newFilm);

  serialize(jsonDbPath, films);

  return res.json(newFilm);
});

// Delete a pizza from the menu based on its id---------------------------------------------------------------------------------
router.delete('/:id', (req, res) => {
  console.log(`DELETE /films/${req.params.id}`);

  const films = parse(jsonDbPath, MENU);

  const foundIndex = films.findIndex(film => film.id == req.params.id);

  if (foundIndex < 0) return res.sendStatus(404);

  const itemsRemovedFromMenu = films.splice(foundIndex, 1);
  const itemRemoved = itemsRemovedFromMenu[0];

  serialize(jsonDbPath, films);

  return res.json(itemRemoved);
});


// Update a pizza based on its id and new values for its parameters------------------------------------------------------------
router.patch('/:id', (req, res) => {
  console.log(`PATCH /films/${req.params.id}`);

  const title = req?.body?.title;

  console.log('POST /films');

  if (!title || title?.length === 0) return res.sendStatus(400);

  const films = parse(jsonDbPath, MENU);
  const foundIndex = films.findIndex(film => film.id == req.params.id);

  if (foundIndex < 0) return res.sendStatus(404);

  const updatedFilm = {...films[foundIndex], ...req.body};

  films[foundIndex] = updatedFilm;
  serialize(jsonDbPath, films);

  return res.json(updatedFilm);
});

module.exports = router;
