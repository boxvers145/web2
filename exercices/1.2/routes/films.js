var express = require('express');
var router = express.Router();
var i = 0;

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

// Read all the films from the menu
router.get('/', (req, res, next) => {
  const orderByDuration =
  req?.query?.order?.includes('duration')
      ? req.query.order
      : undefined;
  let orderedMenu;
  console.log(`order by ${orderByDuration ?? 'not requested'}`);
  if (orderByDuration)
    orderedMenu = [...MENU].sort((a, b) => a.duration == b.duration);
  if (orderByDuration === '-duration') orderedMenu = orderedMenu.reverse();


  console.log('GET /films');
  res.json(orderedMenu ?? MENU);
});

router.get('/:id', (req, res) => {
  console.log(`GET /films/${req.params.id}`);

  const indexOfFilmFound = MENU.findIndex((film) => film.id == req.params.id);

  if (indexOfFilmFound < 0) return res.sendStatus(404);

  res.json(MENU[indexOfFilmFound]);
});

// Create a pizza to be added to the menu.
router.post('/', (req, res) => {
  const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const duration = req?.body?.duration?.length !== 0 ? req.body.duration : undefined;
  const budget = req?.body?.budget?.length !== 0 ? req.body.budget : undefined;
  const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;

  console.log('POST /Film');

  if (!title || !duration || !budget || !link) return res.sendStatus(400); // error code '400 Bad request'

  const lastItemIndex = MENU?.length !== 0 ? MENU.length - 1 : undefined;
  const lastId = lastItemIndex !== undefined ? MENU[lastItemIndex]?.id : 0;
  const nextId = lastId + 1;

  const newFilm = {
    id: nextId,
    title: title,
    duration: duration,
    budget: budget,
    link: link,
  };

  MENU.push(newFilm);

  res.json(newFilm);
});

module.exports = router;
