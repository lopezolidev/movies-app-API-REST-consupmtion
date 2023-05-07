const URL= "https://api.themoviedb.org/3/";
const baseImgURL = "https://image.tmdb.org/t/p/w500/"
//fixing size to 500 pixels

const api = axios.create({
    baseURL: URL,
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    params: {
        'api_key': API_KEY,

    }
});
// creating axios instance

// Intersection observer function

function callbackFun(entries, observer){
    entries.forEach(entry => {
        if(entry.isIntersecting){
            // console.log(entry.target)
            const url = entry.target.getAttribute('data-img');
            // console.log(url);
            entry.target.setAttribute('src', url);
            observer.unobserve(entry.target); //good practice to stop observing the element once the image is loaded
        }
    })
} //callback function to change the dataset attribute to src and load the image

function createObserver(handler, ops){
    const observer = new IntersectionObserver(handler, ops);
    
    return observer;
} //function to create intersectionObserver instances

let observer = createObserver(callbackFun); //instancing the observer



// Utils

function renderMovies(movies, moviesArray, lazyLoad = false){
    genericSection.innerHTML = " "; //deleting loading skeleton

    movies.forEach( movie => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');

        movieContainer.addEventListener('click', () => {
            location.hash = `#movie=${movie.id}`;
        }) //this way we're setting the view of movie details according the specific movie we click

        if(movie.poster_path == null){
            console.log('null');
            console.log({movie})

            const movieWrapper = document.createElement('div');

            movieWrapper.classList.add('movie-img--default')
            
            const para = document.createElement('h2');
            para.classList.add('movie-img--text')
            const textNode = document.createTextNode('???') 
            para.append(textNode);

            movieWrapper.append(para);

            console.log(movieWrapper)

            movieContainer.append(movieWrapper) //TODO FINISH DEFAULT MOVIE
        }else {
            const movieImage = document.createElement('img');
            movieImage.classList.add('movie-img');

            movieImage.setAttribute('alt', movie.title);
            if(lazyLoad){
                movieImage.setAttribute('data-img', `${baseImgURL}${movie.poster_path}`)
            } else {
                movieImage.setAttribute('src', `${baseImgURL}${movie.poster_path}`);

            } //conditional to find out when to load the movie with dataset attribute instead of src
            
            movieContainer.append(movieImage);

            if(lazyLoad){
                observer.observe(movieImage); //calling the method of observe for each image when lazyLoad is true
            }
        }

        
        
        

        moviesArray.push(movieContainer);
        //creating each movie container with is image
        //inserting each container inside the movieContainer array
    })
    
}

function renderCategories(categories, array){

    categories.forEach(category => {
    
        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');

        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute('id', `id${category.id}`);
        categoryTitle.addEventListener('click', () => {
            location.hash = `#category=${category.id}-${category.name}`
        }) //adding the click event to the category name button to change the hash from location. That way navigating through categories and filtering movies according to this criteria

        categoryTitle.textContent = category.name;

        categoryContainer.append(categoryTitle);
        array.push(categoryContainer);
    });
}

//functions


async function getTrendingMoviesPreview(){
    const { data } = await api('/trending/movie/day');
    //destructuring response object into data only
    const results = data.results;

    // const data = await res.json();
    //using Axios results in a simpler code
    
    const trendingMovies = [];
    //selecting outside rendering function the container where movies will be displayed.
    //array of trending movies

    renderMovies(results, trendingMovies, true)
    // results.forEach(movie => renderMovies(movie, trendingMovies));
    //renderMovies solves the DRY issue

    trendingMoviePreviewList.innerHTML = '';

    trendingMoviePreviewList.append(...trendingMovies)
    //appending movies array in the trending movies section, loading the DOM only once
}

async function getCategoriesPreview(){
        const { data } = await api('/genre/movie/list');
        const results = data.genres;
        
        // const previewCategoriesContainer = document.querySelector('#categoriesPreview .categoriesPreview-list')
        
        const categoriesArray = [];

        renderCategories(results, categoriesArray);
        //abstracting this categories rendering forEach with an Util function

        categoriesPreviewList.innerHTML = ' ';

        categoriesPreviewList.append(...categoriesArray);
}

async function getMoviesByCategory(id, name){

    const { data } = await api('discover/movie', {
        params: {
            with_genres: id
        }
    });
    //destructuring response object into data only
    
    const results = data.results;

    // const data = await res.json();
    //using Axios results in a simpler code
    
    const trendingMovies = [];
    //selecting outside rendering function the container where movies will be displayed.
    //array of trending movies

    const nameWithout20 = name.replaceAll('%20', ' ');

    headerCategoryTitle.innerText = nameWithout20;

    // genericSection.innerHTML = " ";

    renderMovies(results, trendingMovies)
    // results.forEach( movie => renderMovies(movie, trendingMovies));

    genericSection.append(...trendingMovies)
    //appending movies array in the trending movies section, loading the DOM only once
}

async function getMoviesBySearch(searchValue){
    const { data } = await api(`search/movie`, {
        params: {
            query: searchValue
        }
    });

    const results = data.results;

    const trendingMovies = [];

    // genericSection.innerHTML = " "; //deleting loading skeleton

    renderMovies(results, trendingMovies, true)

    genericSection.append(...trendingMovies)

}

async function getTrendingMovies(){
    const { data } = await api('/trending/movie/day');
    const results = data.results;
    
    const trendingMovies = [];
    
    // genericSection.innerHTML = " ";
    
    renderMovies(results, trendingMovies, true)
    // results.forEach(movie => renderMovies(movie, trendingMovies));
    //renderMovies solves the DRY issue

    genericSection.append(...trendingMovies)
    //appending movies array in the trending movies section, loading the DOM only once
}

async function getMovieById(id){
    const { data: movie} = await api(`movie/${id}`);

    const movieImgUrl = `${baseImgURL}${movie.poster_path}`
    //getting the image from the movie we're checking the details

    headerSection.style.background = `
    linear-gradient(
        180deg, 
        rgba(0, 0, 0, 0.35) 19.27%, 
        rgba(0, 0, 0, 0) 29.17%
        ),
    url(${movieImgUrl})
    `;

    movieDetailTitle.textContent = movie.title;
    movieDetailDescription.textContent = movie.overview;
    movieDetailScore.textContent = ((movie.vote_average*10) /10).toFixed(1);

    genresList = [];

    movieDetailCategoriesList.innerHTML = " ";

    renderCategories(movie.genres, genresList);
    
    movieDetailCategoriesList.append(...genresList);
    
    getRelatedMoviesById(id);
}

async function getRelatedMoviesById(id){
    const { data} = await api(`movie/${id}/similar`);
    const relatedMovies = data.results;

    const relatedMoviesArray = [];

    relatedMoviesContainer.innerHTML = " ";

    renderMovies(relatedMovies, relatedMoviesArray);

    relatedMoviesContainer.append(...relatedMoviesArray);
    relatedMoviesContainer.scrollTo(0, 0);

}

const callback = (entries) => {
    entries.forEach(element => {
        element.src;
    })
}