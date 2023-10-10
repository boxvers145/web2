const path = require('node:path');
const { serialize, parse } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/films.json');

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

/* Read all the pizzas from the menu
   GET /pizzas?order=title : ascending order by title
   GET /pizzas?order=-title : descending order by title
*/
function ReadAllFilms (orderby){

  /* const orderByTitle = orderby?.includes('duration') ? orderby : undefined;
  const films = parse(jsonDbPath, MENU);
  
  let orderedMenu = [...films].sort((a, b) => a.duration - b.duration);
  if (orderByTitle === '-duration') orderedMenu = orderedMenu.reverse();

  const allFilmsPotentiallyOrderd = orderedMenu ?? films;
  return allFilmsPotentiallyOrderd; */

  


  const orderByDuration =
  orderby?.includes('duration')
      ? orderby
      : undefined;


  const films = parse(jsonDbPath, MENU);

  if(!orderByDuration) {
    return films;
  }

  console.log('saucisse')
  let orderedMenu = [...films].sort((a, b) => a.duration - b.duration);
  if (orderByDuration === '-duration') orderedMenu = orderedMenu.reverse();

  return orderedMenu ?? films;


}

function ReadOneFilm(id) {
  
  const films = parse(jsonDbPath, MENU);

  const idInRequest = parseInt(id, 10);

  const indexOfFilmFound = films.findIndex( (film) => film.id === idInRequest);
  

  if (indexOfFilmFound < 0) {return undefined;}



  return films[indexOfFilmFound];
}

// Create a pizza to be added to the menu.------------------------------------------------------------------------------------------
function CreateNewFilm(title, duration, budget, link) {

  const films = parse(jsonDbPath, MENU);

  const newFilm = {
    id: GetNextId(),
    title,
    duration,
    budget,
    link,
  };

  films.push(newFilm);

  serialize(jsonDbPath, films);

  return newFilm;
};

function GetNextId() {
    const films = parse(jsonDbPath, MENU);

    const lastItemIndex = films?.length !== 0 ? films.length - 1 : undefined;
    if (lastItemIndex === undefined) return 1;
    const lastId = lastItemIndex !== undefined ? films[lastItemIndex]?.id : 0;
    const nextId = lastId + 1;

    return nextId;

}

// Delete a pizza from the menu based on its id---------------------------------------------------------------------------------
function DeleteOneFilm (id) {

  const idNumber = parseInt(id, 10);
  const films = parse(jsonDbPath, MENU);

  const foundIndex = films.findIndex(film => film.id === idNumber);

  if (foundIndex < 0) return undefined;

  const itemsRemovedFromMenu = films.splice(foundIndex, 1);
  const itemRemoved = itemsRemovedFromMenu[0];

  serialize(jsonDbPath, films);

  return itemRemoved;
}


// Update a pizza based on its id and new values for its parameters------------------------------------------------------------
function UpdateOneFilm(id, propertiesToUpdate) {
  const idNumber = parseInt(id, 10);

  const films = parse(jsonDbPath, MENU);
  const foundIndex = films.findIndex(film => film.id === idNumber);

  if (foundIndex < 0) return undefined;

  const updatedFilm = {...films[foundIndex], ...propertiesToUpdate};

  films[foundIndex] = updatedFilm;
  serialize(jsonDbPath, films);

  return updatedFilm;
}

module.exports = {
    ReadAllFilms,
    ReadOneFilm,
    CreateNewFilm,
    DeleteOneFilm,
    UpdateOneFilm,
  };
