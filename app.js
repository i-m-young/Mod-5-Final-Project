// https://www.omdbapi.com/?i=tt3896198&apikey=add5cb2b&s=fast
// SHOW 1ST 6 MOVIES + IMAGES
// ADD SORT FUNCTION
// ADD SKELETON LOADING STATE
// ADD FOOTER, SORT (A/Z & OLD/NEW)

const userListEl = document.querySelector(".user-list");

let movies = [];

async function getMovies() {
  const res = await fetch("https://www.omdbapi.com/?apikey=add5cb2b&s=fast");
  const data = await res.json();
  return data.Search.slice(0, 6);
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
  return `<div class="user-card">
            <div class="user-card__container">
                <h3>${movie.Title}</h3>
                <p><b>Year:</b> ${movie.Year}</p>
                <p><b>imdbID:</b> ${movie.imdbID}</p>
                <img src="${movie.Poster}" alt="${movie.Title} Poster" />
            </div>
        </div>`;
}
renderMovies();