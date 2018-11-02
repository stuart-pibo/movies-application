/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');

const $ = require('jquery');

/**
 * require style imports
 */
const {getMovies} = require('./api.js');

getMovies().then((movies) => {
  console.log('Here are all the movies:');

  let buildMoviesHTML = `<ul>`;
  movies.forEach(({title, rating, id}) => {
    console.log(`${title} - rating: ${rating}`);
    buildMoviesHTML += `<li class="eachMovie">${title} - rating: ${rating}</li>`;
  });
  buildMoviesHTML += `</ul>`;

  $('.moviesList').append(buildMoviesHTML + addMovie() + addRating());

}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.');
  console.log(error);
});

const addMovie = () => {
  return `<div class="row">
            <form class="col s12">
              <div class="row">
                <div class="input-field col s12">
                  <input id="email" type="email" class="validate">
                  <label for="email">Email</label>
                </div>
              </div>
            </form>
          </div>`
};

const addRating = () => {
  return `<div>Hey Pibo</div>`
};




