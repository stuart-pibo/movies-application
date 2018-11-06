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


const update = () => {
    getMovies().then((movies) => {
        console.log('Here are all the movies:');


        let buildMoviesHTML = `<ul id="movieList">`;
        movies.forEach(({title, rating, id}) => {
            buildMoviesHTML += `<li class="eachMovie" id="${id}"><button class="editBtn"><i class="fas fa-edit"></i></button>
            ${title} - rating: ${rating} <button class="deleteMovie"> X</button></li>`;
        });
        buildMoviesHTML += `</ul>`;

        $('.moviesList').html(buildMoviesHTML);

        deleteMovie();
        editMovie()



    })
        .catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.');
        console.log(error);
    })
};
update();

const addMovieHtml = () => {
  let form = `<form class="form-inline">

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
  <button class="btn addMovieButton my-1">ADD</button>
</form>`;
    return $('.addMovie').html(form)
};
addMovieHtml();




//delete movie

const addMovie = () => {
$('.addMovieButton').click((event) => {
    event.preventDefault();
    let newMovieName = $('#inlineFormInputName2').val();
    let newMovieRating = $('#inlineFormCustomSelectPref').val();
    console.log(newMovieName);
    console.log(newMovieRating);
    // $('#movieList').append(`<li> ${newMovieName} - rating: ${newMovieRating} <button class="deleteMovie"> X</button></li>`);
    let data = {
            "title": newMovieName,
            "rating": newMovieRating,
        };
    console.log(data);
    // we the data
    const url = 'api/movies';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    };
    fetch(url, options)
        .then(
            update()
        );
});
};

addMovie();

const deleteMovie = () => {

    $('.deleteMovie').click( (event) => {
        let clicked = $(event.target).parent();
        let id = clicked.attr('id');
        console.log(id);
        $.ajax(`/api/movies/${id}`, {
            method: 'DELETE',
            success: function (data) {
                console.log(data)
            }
        });
        update();
    })
};


const editMovieHtml = (data) => {
    const movieName = data.title;
    console.log(movieName);
    console.log(data.rating);
    console.log(data.id);
    const output = `<form class="form-inline">

        <label class="sr-only" for="inlineFormUpdateName" id="movieName" > </label>
        <input type="text" class="form-control mb-2 mr-sm-2" id="inlineFormUpdateName" value=" ${movieName} " >


        <label class="my-1 mr-2" for="inlineFormCustomSelectPrefUpdate">Movie Rating</label>
    <select class="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPrefUpdate">
        <option  value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
        <option value="4">Four</option>
        <option value="5">Five</option>

        </select>
        <button id="updateMovieButton" class="btn my-1">UPDATE</button>
        </form>`;
    return output

};

const editMovie = () => {
    $('.editBtn').click( (event) => {
        let clicked = $(event.target).parent().parent();
        let id = clicked.attr('id');
        // console.log(id);
        // let nameMovie = clicked.substring(0, clicked.length-15);
        // let  rating = clicked.substring(clicked.length-4 ,clicked.length-2 );
        // console.log(rating);
        // $('#7').css('background-color', 'yellow');
        const getTheData = $.ajax(`/api/movies/${id}`, {
            method: 'GET',
            success: function (data) {
                const selector = '#' + data.id;
                console.log(selector);
                const newHtml = editMovieHtml(data);
                console.log(newHtml);
                $(selector).html(newHtml);



            //     let editHTML =`<form class="form-inline">
            //
            //   <label class="sr-only" for="inlineFormInputName2">Name</label>
            //   <input type="text" class="form-control mb-2 mr-sm-2" id="inlineFormInputName2" placeholder="Movie Title">
            //
            //
            //   <label class="my-1 mr-2" for="inlineFormCustomSelectPref">Rate your movie</label>
            //   <select class="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref">
            //     <option selected value="data.id">One</option>
            //     <option value="2">Two</option>
            //     <option value="3">Three</option>
            //     <option value="4">Four</option>
            //     <option value="5">Five</option>
            //
            //   </select>
            //   <button class="btn  my-1">UPDATE</button>
            // </form>`;
            //     return $('.addMovie').html(form)
            }
        }).then( () => {
            updateMovie()
        });

        // console.log(getTheData);
        update();

    })
};
//
// const theTargetMovie =;
// const url = '/posts';
// const options = {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(blogPost),
// };
// fetch(url, options)
//     .then(/* post was created successfully */)
//     .catch(/* handle errors */);
const updateMovie = () => {
    $('#updateMovieButton').click((event) => {
        event.preventDefault();
        let updatedMovieName = $('#inlineFormUpdateName').val();
        let updatedMovieRating = $('#inlineFormCustomSelectPrefUpdate').val();
        let clicked = $(event.target).parent();
        let id = clicked.attr('id');
        console.log(updatedMovieName);
        console.log(updatedMovieRating);
        // $('#movieList').append(`<li> ${newMovieName} - rating: ${newMovieRating} <button class="deleteMovie"> X</button></li>`);
        let data = {
            "title": updatedMovieName,
            "rating": updatedMovieRating,
            "id": id
        };
        const url = `/api/movies/${id}`;
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        };
        fetch(url, options)
            .then(
                update()
            );
    });
};
