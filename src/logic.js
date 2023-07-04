const URL= "https://api.themoviedb.org/3/";
const baseImgURL = "https://image.tmdb.org/t/p/w500/"
//fixing size to 500 pixels

let lang = navigator.languages[1];

const api = axios.create({
    baseURL: URL,
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    params: {
        'api_key': API_KEY,
        'language': lang,
    }
});
// creating axios instance

function likedMoviesList(){
    const item =  JSON.parse(localStorage.getItem('liked_movies'));
    let movie;
    
    if(item){
        movie = item;
    } else {
        movie = {};
    }

    return movie;
} // only returns the object containing the liked movies

/*
    Structure of liked_movies key:
    {
        id_movie1: {...data from movie 1}, ← refering to the whole data that conforms a movie, like title, image, container etc.
        id_movie2: {...data from movie 2},
        id_movie3: {...data from movie 3},
        id_movie4: {...data from movie 4},
        id_movie5: {...data from movie 5},
    } 

    We're going to sort from this object some movie. If that movie exists then it'll be erase from localStorage, if not it'll be added to the favourite movies list and also to liked_movies
*/


function likeMovie(movie){
    const likedMovies = likedMoviesList();

    // console.log(likedMovies)

    if(likedMovies[movie.id]){ //checking if such object contains a property known as movie.id
        likedMovies[movie.id] = undefined; 
       
        //if there's a movie with that ID we'll set it as undefined
    } else {
        likedMovies[movie.id] = movie; 

        //if that movie.id key doesn't exists, we'll store it
    }

    localStorage.setItem('liked_movies', JSON.stringify(likedMovies)); //storing the object as it is in localStorage

    if (location.hash == ''){
        getLikedMovies();
        getTrendingMoviesPreview(); 
      }

} // inserting and extracting movie from localStorage 


// Intersection observer function

function callbackFun(entries, observer){
    entries.forEach(entry => {
        if(entry.isIntersecting){
            // console.log(entry.target)
            const url = entry.target.getAttribute('data-img');
            // console.log(entry);
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

//language selection
function changeLang(){
    languageSelection.innerHTML = ''; //cleaning the node every time we call the function

    const languages = []; //array to store languages

    countries.forEach(country =>{ //every object from countries array will be resorted to create an HTML node 
        const languageOption = document.createElement('option'); 

        languageOption.setAttribute('value', country.language);

        languageOption.setAttribute('for', 'language');

        const languageText = document.createTextNode(country.flag);

        languageOption.append(languageText);

        languages.push(languageOption);

    })

    languageSelection.append(...languages); //destructuring the array to drop every language in the HTML node
}

changeLang()
      

languageSelection.addEventListener('change', (e) => {
    // console.log(e.target.value)
    lang = e.target.value;
    
    homePage()
})

// TODO: SOLVE BUG FROM AXIOS NOT GETTING CHANGE IN LANGUAGE PARAMETER //

function renderMovies(
    movies, 
    moviesArray, 
    {lazyLoad = false,
    clean = true} = {}
    ){
    if(clean){
        genericSection.innerHTML = " "; //deleting loading skeleton → if we want that container to be cleared every time we load that section, if not the content will stack tops to bottom
    }
    
    movies.forEach( movie => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');

        // movieContainer
//         if(movie.poster_path == null){
//             console.log('null');
//             console.log({movie})

//             const movieWrapper = document.createElement('div');

//             movieWrapper.classList.add('movie-img--default')
            
//             const para = document.createElement('p');
            
//             para.innerText = movie.title;
            
//             console.log({para})
            

//             // para.append(textNode);
//             para.classList.add('movie-img--text');

//             movieWrapper.append(para);

//             console.log(movieWrapper)

//             movieContainer.append(movieWrapper) 
            
// //  ------------------------------------------>        TODO FINISH DEFAULT MOVIE    <------------------------------------------//

//         }else {
            const movieImage = document.createElement('img');
            movieImage.classList.add('movie-img');

            movieImage.addEventListener('click', () => {
                location.hash = `#movie=${movie.id}`;
            }) //this way we're setting the view of movie details according the specific movie we click
    
            movieImage.setAttribute('alt', movie.title);
            if(lazyLoad){
                movieImage.setAttribute('data-img', `${baseImgURL}${movie.poster_path}`)
            } else {
                movieImage.setAttribute('src', `${baseImgURL}${movie.poster_path}`);

            } //conditional to find out when to load the movie with dataset attribute instead of src
            movieImage.addEventListener('error', () => {
                movieImage.setAttribute('src', 
                'https://images.pexels.com/photos/274937/pexels-photo-274937.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')
            }) //strategy to load default image if there's an error in imdb

            const movieBtn = document.createElement('button');
            movieBtn.classList.add('movie-btn');
                
            if(likedMoviesList()[movie.id]){
                movieBtn.classList.add('movie-btn--liked');
            } //if the object of movies has the attribute id, then the movie button will have the class of liked


                movieBtn.addEventListener('click', () => {
                    movieBtn.classList.toggle('movie-btn--liked');
    
                    likeMovie(movie) //function to add movies to localStorage and to the favorites section
                })


            movieContainer.append(movieImage);
            movieContainer.append(movieBtn);

            if(lazyLoad){
                observer.observe(movieImage); //calling the method of observe for each image when lazyLoad is true
            }
        // }

        
        

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
    console.log(lang)
    
    const { data } = await api('/trending/movie/day');
    console.log(await api('/trending/movie/day'))

    //destructuring response object into data only
    const results = data.results;

    // const data = await res.json();
    //using Axios results in a simpler code
    
    const trendingMovies = [];
    //selecting outside rendering function the container where movies will be displayed.
    //array of trending movies

    renderMovies(results, trendingMovies, {lazyLoad: true, clean: true});
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

async function getMoviesByCategory(id, name, page = 1){

    const { data } = await api('discover/movie', {
        params: {
            page,
            with_genres: id
        }
    });
    //destructuring response object into data only
    maxPage = data.total_pages;

    const results = data.results;

    // const data = await res.json();
    //using Axios results in a simpler code
    
    const trendingMovies = [];
    //selecting outside rendering function the container where movies will be displayed.
    //array of trending movies

    const nameWithout20 = name.replaceAll('%20', ' ');
    

    headerCategoryTitle.innerText = nameWithout20;

    // genericSection.innerHTML = " ";

    renderMovies(
        results, 
        trendingMovies, 
        {lazyLoad: true,
        clean: page == 1}
        )
    // results.forEach( movie => renderMovies(movie, trendingMovies));

    genericSection.append(...trendingMovies)
    //appending movies array in the trending movies section, loading the DOM only once
}

async function getMoviesBySearch(searchValue, page = 1){
    const { data } = await api(`search/movie`, {
        params: {
            page,
            query: searchValue
        }
    });
    maxPage = data.total_pages;

    const results = data.results;

    const trendingMovies = [];

    // genericSection.innerHTML = " "; //deleting loading skeleton

    renderMovies(
        results, 
        trendingMovies, 
        {lazyLoad: true,
        clean: page == 1}
        );

    genericSection.append(...trendingMovies)

}

async function getTrendingMovies(page = 1){

    const { data } = await api('/trending/movie/day', {
        params: {
            page,
        }
    });
    maxPage = data.total_pages; //variable that will allow us to calculate when we should use the infinite scrolling function
    const results = data.results;
    
    const trendingMovies = [];
    
    // genericSection.innerHTML = " ";    

    

    // if(scrollIsBottom){
        renderMovies(
            results, 
            trendingMovies, 
            {lazyLoad: true,
            clean: page == 1}
            ); //first time we load the content the inner html must be cleared
            // clean: page == 1 means that if the page is equal to 1, then the comparisson throws a true value, therefore we use that validation to deleting the inner HTMl of the page.
        // results.forEach(movie => renderMovies(movie, trendingMovies));
        //renderMovies solves the DRY issue
    
        genericSection.append(...trendingMovies)
        //appending movies array in the trending movies section, loading the DOM only once
    
}



async function getPaginatedTrendingMovies(){

    const { 
        scrollTop,
        clientHeight,
        scrollHeight } = document.documentElement;
    
    const scrollIsBottom = (scrollTop + clientHeight) >= scrollHeight - 15;

    const pageIsNotMax = counter < maxPage; //this way we avoid the error of loading more pages than the total number of pages

    // console.log(maxPage)

        if(scrollIsBottom && pageIsNotMax){
            counter++
            getTrendingMovies(page = 1 + counter)
        } //this way we make sure we're loading new content only when the scrollIsBottom results TRUE and at the same time we're at the bottom of the page
    
}

async function getPaginatedMoviesByCategory(){
    const { 
        scrollTop,
        clientHeight,
        scrollHeight } = document.documentElement;
    
    const scrollIsBottom = (scrollTop + clientHeight) >= scrollHeight - 15;
    const pageIsNotMax = counter < maxPage;

    const [_, urlData] = location.hash.split('='); //with this variables we can call the function of getMoviesByCategory using those parameters without sending any parameter in the navigation function
    
    const [urlId, urlName] = urlData.split('-'); //Ex: 28-Action

        // console.log(maxPage)

        if(scrollIsBottom && pageIsNotMax){
            counter++
            getMoviesByCategory(urlId, urlName, page = 1 + counter)
        } //this way we make sure we're loading new content only when the scrollIsBottom results TRUE and at the same time we're at the bottom of the page
}

function getPaginatedMoviesBySearch(query){
    return async function(){
        const { 
            scrollTop,
            clientHeight,
            scrollHeight } = document.documentElement;
        
        const scrollIsBottom = (scrollTop + clientHeight) >= scrollHeight - 15;
        const pageIsNotMax = counter < maxPage;

        // const [_, urlData] = location.hash.split('='); //with this variables we can call the function of getMoviesByCategory using those parameters without sending any parameter in the navigation function

            // console.log(maxPage)

            if(scrollIsBottom && pageIsNotMax){
                counter++
                getMoviesBySearch(query, page = 1 + counter)
            }
    } //applying closures to return the expression of the function instead of the execution itself    
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

function getLikedMovies(){
    const likedMovies = likedMoviesList();

    const likedMoviesArr = Object.values(likedMovies)

    const moviesArray = [];

    renderMovies(likedMoviesArr, moviesArray, {lazyLoad: true, clean: true});

    likedMoviesSection.innerHTML = '';

    likedMoviesSection.append(...moviesArray)
}

