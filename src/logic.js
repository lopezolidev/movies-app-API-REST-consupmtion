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



async function getTrendingMovies(){
    const { data } = await api('/trending/movie/day');
    //destructuring response object into data only
    const results = data.results;

    // const data = await res.json();
    //using Axios results in a simpler code
    
    //const trendingMoviePreviewList = document.querySelector('#trendingPreview .trendingPreview-movieList')
    
    const trendingMovies = [];
    //selecting outside rendering function the container where movies will be displayed.
    //array of trending movies

    console.log('hello')

    results.forEach(movie => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');

        const movieImage = document.createElement('img');
        movieImage.classList.add('movie-img');

        movieImage.setAttribute('alt', movie.title);
        movieImage.setAttribute('src', `${baseImgURL}${movie.poster_path}`)

        movieContainer.append(movieImage)
        trendingMovies.push(movieContainer)

        //creating each movie container with is image
        //inserting each container inside the movieContainer array
    });

    trendingMoviePreviewList.append(...trendingMovies)
    //appending movies array in the trending movies section, loading the DOM only once
}

async function getCategoriesPreview(){
        const { data } = await api('/genre/movie/list');
        const results = data.genres;
        
        // const previewCategoriesContainer = document.querySelector('#categoriesPreview .categoriesPreview-list')
        
        const categoriesArray = [];
    
        results.forEach(category => {
    
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
            categoriesArray.push(categoryContainer);
        });
        categoriesPreviewList.append(...categoriesArray);
}

async function getMoviesByCategory(id){
    const { data } = await api('discover/movie', {
        params: {
            with_genres: id
        }
    });
    //destructuring response object into data only
    const results = data.results;

    // const data = await res.json();
    //using Axios results in a simpler code
    
    //const trendingMoviePreviewList = document.querySelector('#trendingPreview .trendingPreview-movieList')
    
    const trendingMovies = [];
    //selecting outside rendering function the container where movies will be displayed.
    //array of trending movies

    console.log('hello')

    results.forEach(movie => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');

        const movieImage = document.createElement('img');
        movieImage.classList.add('movie-img');

        movieImage.setAttribute('alt', movie.title);
        movieImage.setAttribute('src', `${baseImgURL}${movie.poster_path}`)

        movieContainer.append(movieImage)
        trendingMovies.push(movieContainer)

        //creating each movie container with is image
        //inserting each container inside the movieContainer array
    });

    trendingMoviePreviewList.append(...trendingMovies)
    //appending movies array in the trending movies section, loading the DOM only once
}