window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);
//both events for navigating in the page, allowing to navigate with different hashes and when the whole page loads

function navigator(){
    console.log( { location } );

    if(location.hash.startsWith('#trends')){
        trendsPage()
    } else if(location.hash.startsWith('#search=')){
        searchPage();
    } else if(location.hash.startsWith('#movie')){
        moviePage();
    } else if(location.hash.startsWith('#category=')){
        categoriesPage();
    } else {
        homePage()
    }
}

function homePage(){
    console.log('Home');
    
    getTrendingMovies();
    getCategoriesPreview();    
}
//only calling movies and categories preview rendering when on Home page

function moviePage(){
    console.log('MOVIE!!');
}

function categoriesPage(){
    console.log('CATEGORIES');
}

function searchPage(){
    console.log('SEARCH!');
}

function trendsPage(){
    console.log('TRENDS!!!');
}
