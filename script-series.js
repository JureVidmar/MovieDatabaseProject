const API_URL_SERIES = BASE_URL + '/tv/popular?'+API_KEY;
const searchURL_Series = BASE_URL + '/search/tv?'+API_KEY;

const mainSeries = document.getElementById('seriesWrapper');

getSeriesPopular(API_URL_SERIES);

function getSeriesPopular(url) {
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results)
        showSeries(data.results);
    })
}


var thumbsUpIcon = `<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181"/></svg>`
var wishListIcon = `<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="nonzero" clip-rule="nonzero"><path d="M5 0v24l7-6 7 6v-24h-14zm1 1h12v20.827l-6-5.144-6 5.144v-20.827z"/></svg>`
var wishListIconFull = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M18 24l-6-5.269-6 5.269v-24h12v24z"/></svg>`



function showSeries(data) {
    mainSeries.innerHTML = '';
    var i=0
    data.forEach(series => {
        const {name, poster_path, vote_average, overview,genre_ids, id} = series;
        const seriesEl = document.createElement('div');
        
        function setSeriesGenre(genre_ids) {

            genre_ids.forEach(gen_id => {
                const t = document.createElement('span')
                var series = 'series'+i
                genres.forEach(genre => {
                    if (gen_id == genre.id) {
                        t.id = 'genre-'+gen_id
                        var gen_name;
                        gen_name = genre.name
                        t.textContent = gen_name
                        t.classList.add('collection__item-genre')
                        document.getElementById(series).append(t); 
                    }
                })
            })
        }


        seriesEl.classList.add('collection__item');
        seriesEl.dataset.id = id;
        seriesEl.dataset.series = 'series'+i
        seriesEl.dataset.type = 'tv'
        seriesEl.innerHTML = `
        <img src="${poster_path? IMG_URL+poster_path: "http://via.placeholder.com/1080x1580"}" alt="${name}">
        <div class="collection__item-info" data-type="series" data-id="${id}">
            <h3>${name}</h3>
            <span class="${getColor(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
            <h3>Overview</h3>
            ${overview}
            <div class="collection_genres-wrapper" id="series${i}"></div>
            <div class="fav-wish"><span class="add-icon add-fav" data-fav="${id}" data-type="tv">${thumbsUpIcon}<span class="add-tooltip fav-tooltip">Add to Favourites</span></span><span class="add-icon add-wish" data-wish="${id}" data-type="tv">${wishListIcon}<span class="add-tooltip wish-tooltip">Add to Wishlist</span></span></div>
        </div>
        
        `
        mainSeries.appendChild(seriesEl)
        setSeriesGenre(genre_ids)
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
        getSeriesPopular(searchURL_Series+'&query='+ searchTerm)
    }
})

