// // Titles: https://omdbapi.com/?s=thor&page=1&apikey=d8a461d3
// // details: //http://www.omdbapi.com/?i=tt3896198&apikey=d8a461d3

// const movieSearchBox = document.getElementById('movie-search-box');
// const searchList = document.querySelector('#search-list');
// const resultGrid = document.querySelector('#result-grid');

// // load movies from API
// async function loadMovies(searchTerm) {
//     const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=d8a461d3`;
//     const res = await fetch(`${URL}`);
//     const data = await res.json();
//     console.log(data.Search);
//     if (data.Response == "True") displayMovieList(data.Search);
// }

// function findMovies() {
//     let searchTerm = (movieSearchBox.value).trim();
//     if (searchTerm.length > 0) {
//         searchList.classList.remove('hide-search-list');
//         loadMovies(searchTerm);
//     } else {
//         searchList.classList.add('hide-search-list');
//     }
// }

// function displayMovieList(movies) {
//     searchList.innerHTML = "";
//     for (let idx = 0; idx < movies.length; idx++) {
//         let movieListItem = document.createElement('div');
//         movieListItem.dataset.id = movies[idx].imdbID;
//         movieListItem.classList.add('search-list-item');
//         if (movies[idx].Poster != "N/A")
//             moviePoster = movies[idx].Poster;
//         else
//             moviePoster = "image_not_found.png";

//         movieListItem.innerHTML = `
//         <div class = "search-item-thumbnail">
//             <img src = "${moviePoster}">
//         </div>
//         <div class = "search-item-info">
//             <h3>${movies[idx].Title}</h3>
//             <p>${movies[idx].Year}</p>
//         </div>
//         `;
//         searchList.appendChild(movieListItem);
//     }
//     loadMovieDetails();
// }

// function loadMovieDetails() {
//     const searchListMovies = searchList.querySelectorAll('.search-list-item');
//     searchListMovies.forEach(movie => {
//         movie.addEventListener('click', async () => {
//             console.log(movie.dataset.id);
//             searchList.classList.add('hide-search-list');
//             movieSearchBox.value = "";
//             const result = await fetch(`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=d8a461d3`);
//             const movieDetails = await result.json();
//             console.log(movieDetails);
//             displayMovieDetails(movieDetails);
//         });
//     });
// }

// function displayMovieDetails(details) {
//     resultGrid.innerHTML =
//         `<div class ="movie-poster">
//         <img src = "${(details.Poster != "N/A") ? details.Poster : "image_not_found.png"}" alt = "movie poster">
//     </div>

//     <div class = "movie-info">`
//     if (`${details.Ratings[0].Value}` > 8.5) {
//         ` <p class = "movie-imdb"><span>"Recommanded"</span>${details.Ratings[0].Value} </p>`
//     } else {
//         `<p class = "movie-imdb"> ${details.Ratings[0].Value} </p>`
//     }

//     `<h3 class = "movie-title">${details.Title}</h3>
//         <ul class = "movie-misc-info">
//             <li>Year: ${details.Year}</li>
//             <li class = "rated">Ratings:${details.Rated}</li>
//             <li class = "released">Released:${details.Released}</li>
//         </ul>
//         <p class = "genre"><b>Genre:</b> ${details.Genre}</p>
//         <p class = "writer"><b>Writer:</b> ${details.Writer}</p>
//         <p class = "actors"><b>Actors: </b>${details.Actors}</p>
//         <p class = "plot"><b>Plot:</b>${details.Plot}</p>
//         <p class = "language"><b>Language:</b>${details.Language}</p>
//         <p class = "awards"><b><i class = "fas fa-award"></i></b>${details.Awards}</p>
//     </div>`
// }


// window.addEventListener('click', (event) => {
//     if (event.target.className != "form-control") {
//         searchList.classList.add('hide-search-list');
//     }
// });



const movieSearchBox = document.getElementById("movie-search-box");
const searchList = document.querySelector("#search-list");
const resultGrid = document.querySelector("#result-grid");

// Get The Data From The Api
async function loadMovies(moviesearch) {
    const URL = `https://omdbapi.com/?s=${moviesearch}&page=1&apikey=d8a461d3`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
    console.log(data.Search);
    if (data.Response == "True") displayMovieList(data.Search);
}

function findMovies() {
    let moviesearch = movieSearchBox.value.trim();
    if (moviesearch.length > 0) {
        searchList.classList.remove("hide-search-list");
        loadMovies(moviesearch);
    } else {
        searchList.classList.add("hide-search-list");
    }
}

function displayMovieList(movies) {
    searchList.innerHTML = "";
    for (let i = 0; i < movies.length; i++) {
        let movieListItem = document.createElement("div");
        movieListItem.dataset.id = movies[i].imdbID;
        movieListItem.classList.add("search-list-item");
        if (movies[i].Poster != "N/A") moviePoster = movies[i].Poster;
        else moviePoster = "image_not_found.png";

        movieListItem.innerHTML = `
        <div class = "search-item-thumbnail">
            <img src = "${moviePoster}">
        </div>
        <div class = "search-item-info">
            <h3>${movies[i].Title}</h3>
            <p>${movies[i].Year}</p>
        </div>
        `;
        searchList.appendChild(movieListItem);
    }
    loadMovieDetails();
}

function loadMovieDetails() {
    const searchListMovies = searchList.querySelectorAll(".search-list-item");
    searchListMovies.forEach((movie) => {
        movie.addEventListener("click", async () => {
            console.log(movie.dataset.id);
            searchList.classList.add("hide-search-list");
            movieSearchBox.value = "";
            const result = await fetch(
                `https://www.omdbapi.com/?i=${movie.dataset.id}&apikey=d8a461d3`
            );
            const movieDetails = await result.json();
            console.log(movieDetails);
            displayMovieDetails(movieDetails);
        });
    });
}

function displayMovieDetails(details) {
    resultGrid.innerHTML = null;

    let bag = document.createElement("div");
    bag.setAttribute("class", "movie-poster");
    let img = document.createElement("img");
    if (details.Poster != "N/A") {
        img.src = details.Poster;
    } else {
        img.src = "image_not_found.png";
    }
    bag.append(img);

    let datalist = document.createElement("div");
    datalist.setAttribute("class", "movie-info");

    let imdb = document.createElement("p");
    imdb.setAttribute("class", "id")
    if (details.Ratings[0].Value >= "8.5") {
        imdb.innerHTML = `<span id="rec">Recommnded</span> ${details.Ratings[0].Value}`
    } else {
        imdb.innerHTML = details.Ratings[0].Value;
    }

    let h2 = document.createElement("h2");
    h2.setAttribute("class", "movie-title");
    h2.innerHTML = details.Title;

    let ulist = document.createElement("ul");
    ulist.setAttribute("class", "movie-misc-info");

    let list = document.createElement("li");
    list.setAttribute("class", "year");
    list.innerHTML = "Year:" + details.Year;
    let list1 = document.createElement("li");
    list1.setAttribute("class", "rated");
    list1.innerHTML = "Ratings :" + details.Rated;
    let list2 = document.createElement("li");
    list2.setAttribute("class", "released");
    list2.innerHTML = "Date Of Release :" + details.Released;
    ulist.append(list, list1, list2);

    let Genre = document.createElement("p");
    Genre.setAttribute("class", "genre");
    Genre.innerHTML = "Genre: " + details.Genre;

    let writer = document.createElement("p");
    writer.setAttribute("class", "writer");
    writer.innerHTML = "Writer: " + details.Writer;

    let cast = document.createElement("p");
    cast.setAttribute("class", "actors");
    cast.innerHTML = "Cast: " + details.Actors;

    let plot = document.createElement("p");
    plot.setAttribute("class", "plot");
    plot.innerHTML = "Plot: " + details.Plot;

    let language = document.createElement("p");
    language.setAttribute("class", "language");
    language.innerHTML = "Language: " + details.Language;

    let award = document.createElement("p");
    award.setAttribute("class", "awards");
    award.innerHTML = `Award:<span> <i class = "fas fa-award"></i></span>${details.Awards};`;

    datalist.append(imdb, h2, ulist, Genre, writer, cast, language, award, plot);
    resultGrid.append(bag, datalist);

    //   resultGrid.innerHTML = `
    //     <div class = "movie-poster">
    //         <img src = "${
    //           details.Poster != "N/A" ? details.Poster : "image_not_found.png"
    //         }" alt = "movie poster">
    //     </div>

    //      <div class = "movie-info">;
    //   <p "${details.Ratings[0].Value>"8.5" ? "Recom "+details.Ratings[0].Value:details.Ratings[0].Value}</p>

    //       <h3 class = "movie-title">${details.Title}</h3>
    //       <ul class = "movie-misc-info">
    //           <li class = "year">Year: ${details.Year}</li>
    //           <li class = "rated">Ratings: ${details.Rated}</li>
    //           <li class = "released">Released: ${details.Released}</li>
    //       </ul>
    //       <p class = "genre"><b>Genre:</b> ${details.Genre}</p>
    //       <p class = "writer"><b>Writer:</b> ${details.Writer}</p>
    //       <p class = "actors"><b>Actors: </b>${details.Actors}</p>
    //       <p class = "plot"><b>Plot:</b> ${details.Plot}</p>
    //       <p class = "language"><b>Language:</b> ${details.Language}</p>
    //       <p class = "awards"><b><i class = "fas fa-award"></i></b> ${
    //         details.Awards
    //       }</p>
    //   </div>
    //   `;
}

// window.addEventListener("click", (event) => {
//   if (event.target.className != "form-control") {
//     searchList.classList.add("hide-search-list");
//   }
// });





