//TMDB
// dab2c8f66df561816f3de5a1bdb51d3a
const API_KEY = 'api_key=dab2c8f66df561816f3de5a1bdb51d3a';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?'+API_KEY;


const genres = [
    {
       "id":28,
       "name":"Action"
    },
    {
       "id":12,
       "name":"Adventure"
    },
    {
       "id":16,
       "name":"Animation"
    },
    {
       "id":35,
       "name":"Comedy"
    },
    {
       "id":80,
       "name":"Crime"
    },
    {
       "id":99,
       "name":"Documentary"
    },
    {
       "id":18,
       "name":"Drama"
    },
    {
       "id":10751,
       "name":"Family"
    },
    {
       "id":14,
       "name":"Fantasy"
    },
    {
       "id":36,
       "name":"History"
    },
    {
       "id":27,
       "name":"Horror"
    },
    {
       "id":10402,
       "name":"Music"
    },
    {
       "id":9648,
       "name":"Mystery"
    },
    {
       "id":10749,
       "name":"Romance"
    },
    {
       "id":878,
       "name":"Science Fiction"
    },
    {
       "id":10770,
       "name":"TV Movie"
    },
    {
       "id":53,
       "name":"Thriller"
    },
    {
       "id":10752,
       "name":"War"
    },
    {
       "id":37,
       "name":"Western"
    }
 ]

const mainMovie = document.getElementById('movieWrapper');
const form = document.getElementById('headerForm');
const search = document.getElementById('searchHeader');
const tagsEl = document.getElementById('tags')
const genreEl = document.getElementsByClassName('movie_genres')

var selectedGenre = []
setGanre();
function setGanre() {
    tagsEl.innerHTML = '';
    genres.forEach(genre => {
        const t = document.createElement('div');
        t.classList.add('tag')
        t.id=genre.id;
        t.innerText= genre.name;
        t.addEventListener('click', () => {
            if(selectedGenre.length == 0) {
                selectedGenre.push(genre.id)
            }
            else {
                if (selectedGenre.includes(genre.id)) {
                    selectedGenre.forEach((id, idx) => {
                        if  (id == genre.id) {
                            selectedGenre.splice(idx, 1)
                        }
                    })
                }
                else {
                    selectedGenre.push(genre.id)
                }
            }
            console.log(selectedGenre)
            getMoviesPopular(API_URL+ '&with_genres='+ encodeURI(selectedGenre.join(',')))
            highlightSelection()
        })
        tagsEl.append(t)
    })
}

function highlightSelection() {
    const tags = document.querySelectorAll('.tag'); 
    tags.forEach(tag => {
        tag.classList.remove('tag__highlight')
    })
    if (selectedGenre.length != 0){
        selectedGenre.forEach(id => {
            const highlightedTag = document.getElementById(id);
            highlightedTag.classList.add('tag__highlight');
        })
    }
}
getMoviesPopular(API_URL);

function getMoviesPopular(url) {
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results)
        showMovies(data.results);
    })
}


function showMovies(data) {
    mainMovie.innerHTML = '';
    var i=0
    data.forEach(movie => {
        const {title, poster_path, vote_average, overview,genre_ids} = movie;
        const movieEl = document.createElement('div');
        
        function setMovieGenre(genre_ids) {

            genre_ids.forEach(gen_id => {
                const t = document.createElement('span')
                var movieID = 'movie'+i
                genres.forEach(genre => {
                    if (gen_id == genre.id) {
                        t.id = 'genre-'+gen_id
                        var gen_name;
                        gen_name = genre.name
                        t.textContent = gen_name
                        t.classList.add('movie__genre')
                        document.getElementById(movieID).append(t); 
                    }
                })
            })
        }


        movieEl.classList.add('movie');
        movieEl.innerHTML = `
        <img src="${poster_path? IMG_URL+poster_path: "http://via.placeholder.com/1080x1580"}" alt="${title}">
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getColor(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
            <h3>Overview</h3>
            ${overview}
            <div class="movie_genres-wrapper" id="movie${i}"></div>
        </div>
        
        `
        mainMovie.appendChild(movieEl)
        setMovieGenre(genre_ids)
        i++;
    });
}

function getColor(vote) {
    if (vote >= 8) {
        return 'green'
    }
    else if ( vote >= 5) {
        return 'orange'
    }
    else {
        return 'red'
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = search.value;

    if (searchTerm) {
        getMoviesPopular(searchURL+'&query='+ searchTerm)
    }
})
