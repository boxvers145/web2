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

// Read all the pizzas from the menu
router.get('/', (req, res, next) => {
    res.json(MENU);
  });

module.exports = router;
