const API_KEY = "api_key=973a1956b7f61c8553e86c537c6d8e94";
const BASE_URL = "https://api.themoviedb.org/3/";
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY; 
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const searchURL = BASE_URL + "/search/movie?" + API_KEY;
const movieURL = "https://www.themoviedb.org/movie/";

getMovies(searchURL);

function getMovies(url){
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results);
        showMovies(data.results.slice(0,12));
    })
}

function showMovies(data) {
    main.innerHTML = ""

    data.forEach(movie =>    {
        const {title, poster_path, vote_average, overview, } = movie;
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");
        movieEl.innerHTML = `
        <img src="${IMG_URL+poster_path}" alt="${title}">
        
        <div class="movie-info">
            <h1>${title}</h1>
            <span class="${getColor(vote_average)} font-weight-bold">${vote_average}</span>
        </div>

        <div class="overview">
            <h3>Overview</h3>
            ${overview}
        </div>`

        main.appendChild(movieEl);

        if(main.classList.contains("d-none")){
            main.classList.remove("d-none")
        }
    });
}


function getColor(vote){
    if(vote>= 8){
        return "green"
    }else if(vote >= 5){
        return "orange"
    }else{
        return "red"
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if(searchTerm){
        getMovies(searchURL + "&query=" + searchTerm)
    }else{
        document.querySelectorAll(".movie").style.display = "none";
    }
})

