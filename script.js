//TMDB
// dab2c8f66df561816f3de5a1bdb51d3a
// {"success":true,"guest_session_id":"a2aaf32cb299ea85bf585b4ca65ec0ee","expires_at":"2021-12-18 08:49:05 UTC"}
// {"success":true,"expires_at":"2021-12-17 10:04:32 UTC","request_token":"13dbca390173dc0682f802cd30735fdb4dc32b62"}
// session_id: c0521fc84f9a8034f98b1d6e1e08baf96c724507
// account_id: 11489858

const API_KEY = 'api_key=dab2c8f66df561816f3de5a1bdb51d3a';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL_Movie = BASE_URL + '/search/movie?'+API_KEY;
const POST_WATCH = 'https://api.themoviedb.org/3/account/11489858/watchlist?api_key=dab2c8f66df561816f3de5a1bdb51d3a&session_id=db44e77af280715b2d5fd071072ede3d8bb78a87'
const POST_WATCH_SERIES = 'https://api.themoviedb.org/3/account/11489858/watchlist/tv?api_key=dab2c8f66df561816f3de5a1bdb51d3a&session_id=db44e77af280715b2d5fd071072ede3d8bb78a87'
const WISHLIST_URL = 'https://api.themoviedb.org/3/account/11489858/watchlist/movies?api_key=dab2c8f66df561816f3de5a1bdb51d3a&language=en-US&session_id=c0521fc84f9a8034f98b1d6e1e08baf96c724507&sort_by=created_at.desc&page=1'

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


const wishArr = [] 
async function getWishlist(url) {
    await fetch(url).then(res => res.json()).then(data => {
        var b = data.results
        b.forEach(wishMovie => {
            var x = wishMovie.id
            wishArr.push(x)
        })
    })
}
getWishlist(WISHLIST_URL)
console.log(wishArr)
console.log('wishArr[0]: ', wishArr[0])
console.log('wishArr length: ', wishArr.length)
wishArr.forEach(id => {
    console.log(id)
})
console.log('wishArr: ', wishArr)
console.log('wishArr[0]: ', wishArr[0])
console.log('wishArr length: ', wishArr.length)

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

setTimeout(() => {
    getMoviesPopular(API_URL);
}, 200);
function getMoviesPopular(url) {
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results)
        showMovies(data.results);
    })
}


var thumbsUpIcon = `<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181"/></svg>`
var wishListIcon = `<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="nonzero" clip-rule="nonzero"><path d="M5 0v24l7-6 7 6v-24h-14zm1 1h12v20.827l-6-5.144-6 5.144v-20.827z"/></svg>`
var wishListIconFull = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M18 24l-6-5.269-6 5.269v-24h12v24z"/></svg>`




function showMovies(data) {
    mainMovie.innerHTML = '';
    var i=0
    data.forEach(movie => {
        const {title, poster_path, vote_average, overview,genre_ids, id} = movie;
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
                        t.classList.add('collection__item-genre')
                        document.getElementById(movieID).append(t); 
                    }
                })
            })
        }

        var movieAdded= false

        for (let i = 0; i < wishArr.length; i++) {
            if (wishArr[i] == id) {
                movieAdded = true
            }
        }

        movieEl.classList.add('collection__item');
        movieEl.dataset.id = id;
        movieEl.dataset.movie = 'movie'+i
        movieEl.dataset.type = 'movie'
        movieEl.innerHTML = `
        <img src="${poster_path? IMG_URL+poster_path: "http://via.placeholder.com/1080x1580"}" alt="${title}">
        <div class="collection__item-info" data-type="movie" data-id="${id}">
            <h3>${title}</h3>
            <span class="${getColor(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
            <h3>Overview</h3>
            ${overview}
            <div class="collection_genres-wrapper" id="movie${i}"></div>
            <div class="fav-wish"><span class="add-icon add-fav" data-fav="${id}" data-type="movie">${thumbsUpIcon}<span class="add-tooltip fav-tooltip">Add to Favourites</span></span><span class="add-icon add-wish" data-wish="${id}" data-type="movie">${movieAdded? wishListIconFull: wishListIcon}<span class="add-tooltip wish-tooltip">Add to Wishlist</span></span></div>
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
        getMoviesPopular(searchURL_Movie+'&query='+ searchTerm)
    }
})


const addedToWish = []

setTimeout(() => {
function addToFavWish() {
    var x = localStorage.getItem('moviesId')

    const wishlist = document.querySelectorAll('.collection__item .add-wish')
    var wishlistNum = wishlist.length
    for (let i = 0; i < wishlistNum; i++) {
        wishlist[i].addEventListener('click', () => {
            var itemID = wishlist[i].dataset.wish
            var itemType = wishlist[i].dataset.type
            var xhr = new XMLHttpRequest();
            xhr.open("POST", POST_WATCH, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            addedToWish.push(itemID)
            localStorage.setItem("moviesId", JSON.stringify(addedToWish));
            xhr.send(JSON.stringify({
                media_type: `${itemType}`,
                media_id: itemID,
                watchlist: true
            }));
            wishlist[i].innerHTML = wishListIconFull
            console.log('Item added to Watchlist')
        })
    }

}
addToFavWish()
}, 600)


// dab2c8f66df561816f3de5a1bdb51d3a
// spiderman id: 634649
// hawkeye id: 88329


function getDetails(url) {
    fetch(url).then(res => res.json()).then(data => {
        console.log(data)
        showDetails(data);
    })
}
function showDetails(data) {
    var popupMain = document.getElementById('popupDetails')
    popupMain.innerHTML = ''
    
    const {genres , id, original_language, budget, original_name, title, release_date, first_air_date ,poster_path, overview, vote_average, number_of_episodes,number_of_seasons} = data
    var popupEl = document.createElement('div')

    popupEl.classList.add('popup__details-wrapper')
    
        let newArr= []
        let arrOut;
        genres.forEach(genre => {
            newArr.push('<span>'+genre.name+'</span>')
            
        })
        /* arrOut = JSON.stringify(newArr) */
        arrOut = newArr.join('\n')
    

    popupEl.innerHTML = `
    <div class="popup__banner">
        <div class="popup__banner-wrapper" style="background:linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://image.tmdb.org/t/p/original${poster_path});
        ">
            <div class="popup__banner-img-wrapper">
                <img class="popup__banner-img" src="${poster_path? IMG_URL+poster_path: "http://via.placeholder.com/1080x1580"}">
            </div>
            <div class="popup__banner-details">
                <div class="popup__banner-title"><h1>${title? title: original_name}</h1></div>
                <div class="popup__info popup__banner-release">Release date: ${release_date? release_date: first_air_date}</div>
                ${number_of_episodes? '<div class="popup__info popup__banner-episodes">Episodes: '+number_of_episodes+'</div>': ''}
                ${number_of_seasons? '<div class="popup__info popup__banner-episodes">Seasons: '+number_of_seasons+'</div>': ''}
                <div class="popup__info popup__banner-rating">Rating: ${vote_average}</div>
                <div class="popup__info popup__banner-genres">${arrOut}</div>
            </div>
        </div>
        <div class="popup__overview"><p>${overview}</p></div>
        <div class="popup__bottom">
        <div class="popup__actors-wrapper" id="actorsWrapper"></div>
        </div>
    </div>
    `
    popupMain.appendChild(popupEl)

}


function getActor(url) {
    fetch(url).then(res => res.json()).then(data => {
        console.log(data)
        showActors(data)
    })
}
function showActors(data) {
    var actorsWrapper = document.getElementById('actorsWrapper')
    actorsWrapper.innerHTML = ''
    data.cast.forEach(actor => {
        const {id, name, character, profile_path} = actor
        var actorsEl = document.createElement('div')
        actorsEl.classList.add('popup__actor')
        actorsEl.setAttribute('data-actor-id', id)

        actorsEl.innerHTML = `
        <div class="popup__actor-img">
            <img src="${profile_path? IMG_URL+profile_path: "http://via.placeholder.com/1080x1580"}">
        </div>
        <div class="popup__actor-name"><span class="actor-name">${name}</span><span class="character-name">${character}</span></div>
        `
        actorsWrapper.appendChild(actorsEl)
    })
}
setTimeout(() => {
    $(document).ready(function(){
        $('.collection__item').click(function() {
            var itemId = $(this).attr('data-id')
            var itemType = $(this).attr('data-type')
            var getDetails_URL = getDetails_URL = 'https://api.themoviedb.org/3/'+itemType+'/'+itemId+'?api_key=dab2c8f66df561816f3de5a1bdb51d3a&language=en-US'
            console.log(getDetails_URL)

            var getActors_URL = 'https://api.themoviedb.org/3/'+itemType+'/'+itemId+'/credits?api_key=dab2c8f66df561816f3de5a1bdb51d3a&language=en-US'
            
            getDetails(getDetails_URL)
            getActor(getActors_URL)
            $('.body__overlay').slideDown();
            $('.popup__details').slideDown();
            $('.popup__close').slideDown();
            $('.body__overlay').click(function(){
                $(this).slideUp()
                $('.popup__details').slideUp()
                $('.popup__close').slideUp();
            })
            $('.popup__close').click(function(){
                $('.body__overlay').slideUp()
                $('.popup__details').slideUp()
                $(this).slideUp()
            })

            setTimeout(() => {
                var popupDistance = jQuery('.popup__details-wrapper').offset().left +20
                console.log(popupDistance)
                $('.popup__close').css('top','220px' )
                $('.popup__close').css('right',popupDistance )
            }, 200);

        })

    })
}, 350);


