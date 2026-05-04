// https://www.omdbapi.com/?i=tt3896198&apikey=add5cb2b
// SHOW 1ST 6 MOVIES + IMAGES
// ADD SORT FUNCTION
// ADD SKELETON LOADING STATE
// ADD FOOTER, SORT (A/Z & OLD/NEW)

const userListEl = document.querySelector(".user-list");
const loadingEl = document.getElementById("loading");

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let movies = [];

async function defaultSearch() {
  movies = await getMovies("batman");
  userListEl.innerHTML = movies
    .map((movie) => movieHTML(movie))
    .join("");
}

defaultSearch();

async function onSearchChange(event) {
  const title = event.target.value;

  loadingEl.classList.add("loading");
  userListEl.innerHTML = "";

  const [movies] = await Promise.all([
    getMovies(title),
    delay(1000)
  ]);

  loadingEl.classList.remove("loading");

  userListEl.innerHTML = movies
    .map((movie) => movieHTML(movie))
    .join("");
}

async function getMovies(title) {
  const res = await fetch(`https://www.omdbapi.com/?apikey=add5cb2b&s=${title}`);
  const data = await res.json();

  if (!data.Search) return [];

  return data.Search
    .filter(movie => movie.Title && movie.Year && movie.Poster)
    .slice(0, 6);
}

async function renderMovies(filter) {
  if (!movies.length) {
    movies = await getMovies();
  }

  if (filter === "A_TO_Z") {
    movies.sort((a, b) => a.Title.localeCompare(b.Title));
  } else if (filter === "Z_TO_A") {
    movies.sort((a, b) => b.Title.localeCompare(a.Title));
  } else if (filter === "NEWEST") {
    movies.sort((a, b) => Number(b.Year) - Number(a.Year));
  } else if (filter === "OLDEST") {
    movies.sort((a, b) => Number(a.Year) - Number(b.Year));
  }

  userListEl.innerHTML = movies.map((movie) => movieHTML(movie)).join("");
}

function filterMovies(event) {
  renderMovies(event.target.value);
}

function movieHTML(movie) {
  if (!movie || !movie.Title) return "";

  return `<div class="user-card">
    <div class="user-card__container">
      <h3 class="movie__title">${movie.Title || "N/A"}</h3>
      <p><b>Year:</b> ${movie.Year || "N/A"}</p>
      <p><b>imdbID:</b> ${movie.imdbID || "N/A"}</p>
      <img src="${movie.Poster !== "N/A" ? movie.Poster : ""}" alt="${movie.Title} Poster" />
    </div>
  </div>`;
}