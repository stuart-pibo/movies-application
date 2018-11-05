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
    buildMoviesHTML += `<li class="eachMovie">${title} - rating: ${rating} <button class="deleteMovie"> X</button></li>`;
  });
  buildMoviesHTML += `</ul>`;

  $('.moviesList').append(buildMoviesHTML + addMovieHtml());
    deleteMovie()
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.');
  console.log(error);
});

const addMovieHtml = () => {
  return `<form class="form-inline">

  <label class="sr-only" for="inlineFormInputName2">Name</label>
  <input type="text" class="form-control mb-2 mr-sm-2" id="inlineFormInputName2" placeholder="Movie Title">


  <label class="my-1 mr-2" for="inlineFormCustomSelectPref">Rate your movie</label>
  <select class="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref">
    <option selected value="1">One</option>
    <option value="2">Two</option>
    <option value="3">Three</option>
    <option value="4">Four</option>
    <option value="5">Five</option>

  </select>
  <button type="submit" class="btn btn-primary my-1">ADD</button>
</form>`
};



//delete movie
const deleteMovie = () => {

$('.deleteMovie').click( (event) => {
    $(event.target).parent().hide();
})

};

// const addNewMovie = () => {
//
// }




