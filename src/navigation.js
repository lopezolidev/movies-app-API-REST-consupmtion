let maxPage;
let counter = 1;
let infiniteScroll;

searchFormBtn.addEventListener('click', () => {
    location.hash = '#search=' + searchFormInput.value;
});

trendingBtn.addEventListener('click', () => {
    location.hash = '#trends'
});


window.addEventListener('DOMContentLoaded', browser, false);

window.addEventListener('hashchange', browser, false);
//both events for navigating in the page, allowing to navigate with different hashes and when the whole page loads

window.addEventListener('scroll', infiniteScroll, false)

arrowBtn.addEventListener('click', () => {
        window.history.back();  // this method makes us go back to the previous page
    
        /*  
        location.hash = '#home'
    */
});




function browser(){
    // console.log( { location } );

    if(infiniteScroll){
        window.removeEventListener('scroll', infiniteScroll, { passive: false });
        infiniteScroll = undefined;
    } //this function will help us to delete any value that infiniteScroll has, therefore releasing that space to assign another function dinamically every time we get to another page using this navigator function

    if(location.hash.startsWith('#trends')){
        trendsPage()
    } else if(location.hash.startsWith('#search=')){
        searchPage();
    } else if(location.hash.startsWith('#movie=')){
        moviePage();
    } else if(location.hash.startsWith('#category=')){
        categoriesPage();
    } else {
        homePage()
    }

    window.scrollTo({top: 0, behavior: 'smooth'});
    //using scrollTo event, scrolling to the top of the page instantly

    if(infiniteScroll){
        window.addEventListener('scroll', infiniteScroll, { passive: false });
    } //once the functions in each navigation page is executed, we assign there the value for infiniteScroll. Now that infiniteSroll has earned a new value this validation assigns to the window object the infiniteScroll function (the function according to such view in the website)

}

function homePage(){
    // console.log('Home');
    
    headerSection.classList.remove('header-container--long');
    languageSelection.classList.remove('inactive');
    // making sure we don't have this class on the Home view

    headerSection.style.background = '';
    // as for every movie will have an image as a background, in the Home view it'll be no background image

    arrowBtn.classList.add('inactive');
    arrowBtn.classList.remove('header-arrow--white');

    headerTitle.classList.remove('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.remove('inactive');
    likedMoviesArt.classList.remove('inactive');
    categoryPreviewSection.classList.remove('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');

    // trendingMoviesSkeleton.classList.remove('inactive');
    // skeletonMovieContainer.classList.remove('inactive');

    // const moviesChildren = trendingMoviePreviewList.children[0];
    // // console.log(moviesChildren)
    // const catChildren = categoriesPreviewList.children[0];
    // // console.log(children)

    // if(!moviesChildren && !catChildren) {
        console.log(lang)
        
        getTrendingMoviesPreview();
        getCategoriesPreview();   
        getLikedMovies();
    // }
    //if there's already any element in both containers, we won't call the API, that way optimizing the API consumption and not overloading the memory of the navigator

}
//only calling movies and categories preview rendering when on Home page

function moviePage(){
    console.log('MOVIE!!');

    headerSection.classList.add('header-container--long');
    languageSelection.classList.add('inactive');

    // headerSection.style.background = '';
    
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white');

    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    likedMoviesArt.classList.add('inactive');
    categoryPreviewSection.classList.add('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');

    const [_, searchParam] = location.hash.split('='); // ['#movie', 'id']

    getMovieById(searchParam);
}

function categoriesPage(){
    console.log('CATEGORIES');

    headerSection.classList.remove('header-container--long');
    languageSelection.classList.add('inactive');

    headerSection.style.background = '';
    
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');

    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    likedMoviesArt.classList.add('inactive');
    categoryPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    /* const id = location.hash.replace('#category=', '');
     //selecting substring from <category-id>-<category-name>

     const indexOfcategory = id.indexOf('-')
     //obtaining index of the '-' to know where will be selection limit

     const catId = id.slice(0, indexOfcategory)
     //selecting the specific number from the substring

        console.log(id)
        console.log(indexOfcategory)
        console.log(id.length)
        console.log(catId) */

    //Easier solution to selecting category id ↓
    const [_, categoryData] = location.hash.split('='); // ['#category', 'id-name']
    
    const [categoryId, categoryName] = categoryData.split('-'); // ['id', 'name']
    //taking advantage of ES6 syntax for destructuring the array elements

    let moviesCategoriesChildren = genericSection.children;
    // console.log(moviesCategoriesChildren)

    getMoviesByCategory(categoryId, categoryName);

    infiniteScroll = getPaginatedMoviesByCategory;

}

function searchPage(){
    console.log('SEARCH!');

    headerSection.classList.remove('.header-container--long');
    languageSelection.classList.add('inactive');

    headerSection.style.background = '';
    
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');

    // arrowBtn.removeEventListener('click', () => {
    //     history.back();
    // })
    // arrowBtn.addEventListener('click', () => {
    //     window.history.back();
    //     location.hash = "#home";
    // })

    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.add('inactive');
    likedMoviesArt.classList.add('inactive');
    categoryPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    const [_, searchParam] = location.hash.split('='); // ['#search', 'value']
    const query = searchParam.replaceAll('%20', ' ');

    getMoviesBySearch(query);
    
    infiniteScroll = getPaginatedMoviesBySearch(query); //using closures to call this function
}

function trendsPage(){
    console.log('TRENDS!!!');

    headerSection.classList.remove('header-container--long');
    languageSelection.classList.add('inactive');

    headerSection.style.background = '';
    
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');

    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    likedMoviesArt.classList.add('inactive');
    categoryPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    headerCategoryTitle.innerText = 'Trending';

    getTrendingMovies();
    
    infiniteScroll = getPaginatedTrendingMovies;

}
