// Global Constants
const apiKey = '4a2ed3b5cb8fd78e1e35c5c623272ce8';
const pageSize = 9;

// Global Variables
var currentApiPage = 0;
var currentSearchTerm = '';

// Page Elements
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const movieAreaDiv = document.getElementById('movie-area');
const showMeMoreBtn = document.getElementById('show-me-more-btn');

/** Get results from API. */
async function getResults(searchTerm) {
    const offset = currentApiPage * pageSize;
    const response = await fetch(`http://api.giphy.com/v1/gifs/search?q=${searchTerm}&limit=${pageSize}&offset=${offset}&api_key=${apiKey}`);
    const jsonResponse = await response.json();
    return jsonResponse.data;
}

/** Render list of results. */
function displayResults(results) {
    const movieHTMLString = results.map(gif => `
        <div class="gif">
            <img src="${gif.images.original.url}" />
        </div>
    `).join('');

    movieAreaDiv.innerHTML = movieAreaDiv.innerHTML + movieHTMLString;
}

/** On form submit, get results and add to list. */
async function handleFormSubmit(event) {
    event.preventDefault();
    movieAreaDiv.innerHTML = '';
    currentSearchTerm = searchInput.value;
    const results = await getResults(currentSearchTerm);
    displayResults(results);
    searchInput.value = '';
    currentApiPage++;
    showMeMoreBtn.classList.remove('hidden');
}

searchForm.addEventListener('submit', handleFormSubmit);

async function handleShowMeMoreClick(event) {
    const results = await getResults(currentSearchTerm);
    displayResults(results);
    currentApiPage++;
}

showMeMoreBtn.addEventListener('click', handleShowMeMoreClick);


/*

//Global Constants
const api_key = "api_key=4a2ed3b5cb8fd78e1e35c5c623272ce8"
const url_base = "https://api.themoviedb.org/3"
const img_url = 'https://image.tmdb.org/t/p/w500';
const search_url = url_base + "/search/movie?" + api_key;
const page_size = 9;

//Global variables
var search_term = "";
var current_page = 0;

const offset = current_page * page_size;
const api_url = url_base +"/discover/movie?sort_by=popularity.desc&" +api_key+"&offset="+ offset+ "&limit=" +page_size;

//Page Elements
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const showMeMoreBtn = document.getElementById("showbutton")

getMovies(api_url)

//Get results from API
async function getMovies(url){
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results)
        showMovies(data.results);
    })
}

function showMovies(data){
   main.innerHTML = '';

    data.forEach(element => {
        const {title, poster_path, vote_average} = element;
        const movieEl = document.createElement("div");

        movieEl.classList.add("movie")
        movieEl.innerHTML = `
            <img id = "picture" src="${img_url+poster_path}" alt="${title}">
            <div class="movie-titles">
                <h4>${title}</h4>
                <span class="movie-rating">${vote_average}</span>
            </div>   
        `
        main.append(movieEl);
    })
}

async function handleFormSubmit(event) {
    event.preventDefault();
    search_term = search.value;

    if(search_term){
        getMovies(search_url+"&query="+search_term);
        current_page++;
    }
    else{
        getMovies(api_url);
    }
}
form.addEventListener('submit', handleFormSubmit);

async function handleShowMeMoreClick(event) {
    event.preventDefault();

    if(search_term){
        current_page++;
        getMovies(search_url+"&query="+search_term+"&offset=" + offset);

    }
}
showMeMoreBtn.addEventListener('click', handleShowMeMoreClick);

*/
