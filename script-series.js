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


function showSeries(data) {
    mainSeries.innerHTML = '';
    var i=0
    data.forEach(series => {
        const {name, poster_path, vote_average, overview,genre_ids} = series;
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
        seriesEl.innerHTML = `
        <img src="${poster_path? IMG_URL+poster_path: "http://via.placeholder.com/1080x1580"}" alt="${name}">
        <div class="collection__item-info">
            <h3>${name}</h3>
            <span class="${getColor(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
            <h3>Overview</h3>
            ${overview}
            <div class="collection_genres-wrapper" id="series${i}"></div>
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

