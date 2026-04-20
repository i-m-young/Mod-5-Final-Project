// https://www.omdbapi.com/?i=tt3896198&apikey=add5cb2b&s=fast
// SHOW 1ST 6 MOVIES + IMAGES
// ADD SORT FUNCTION
// ADD SKELETON LOADING STATE

const userListEl = document.querySelector(".user-list");

async function main() {
  const movies = await fetch("https://www.omdbapi.com/?apikey=add5cb2b&s=fast");
  const moviesData = await movies.json();

  const movieList = moviesData.Search.slice(0, 6);

  userListEl.innerHTML = movieList.map((movie) => movieHTML(movie)).join("");
}

main();

function movieHTML(movie) {
  return `<div class="user-card">
            <div class="user-card__container">
                <h3>${movie.Title}</h3>
                <p><b>Year:</b> ${movie.Year}</p>
                <p><b>imdbID:</b> ${movie.imdbID}</p>
                <p><b>Poster:</b> 
                  <a href="${movie.Poster}" target="_blank">
                    View Poster
                  </a>
                </p>
            </div>
        </div>`;
}