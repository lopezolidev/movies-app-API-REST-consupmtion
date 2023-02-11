searchFormBtn.addEventListener('click', () => {
    location.hash = '#search='
});

trendingBtn.addEventListener('click', () => {
    location.hash = '#trends'
});

arrowBtn.addEventListener('click', () => {
    location.hash = '#home'
});


window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);
//both events for navigating in the page, allowing to navigate with different hashes and when the whole page loads


function navigator(){
    console.log( { location } );

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
}

function homePage(){
    console.log('Home');
    
    headerSection.classList.remove('.header-container--long');
    // making sure we don't have this class on the Home view

    headerSection.style.background = '';
    // as for every movie will have an image as a background, in the Home view it'll be no background image

    arrowBtn.classList.add('inactive');
    arrowBtn.classList.remove('header-arrow--white');

    headerTitle.classList.remove('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.remove('inactive');
    categoryPreviewSection.classList.remove('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');

    getTrendingMovies();
    getCategoriesPreview();    
}
//only calling movies and categories preview rendering when on Home page

function moviePage(){
    console.log('MOVIE!!');

    headerSection.classList.add('.header-container--long');
    // headerSection.style.background = '';
    
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white');

    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoryPreviewSection.classList.add('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');
}

function categoriesPage(){
    console.log('CATEGORIES');

    headerSection.classList.remove('.header-container--long');
    headerSection.style.background = '';
    
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');

    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoryPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
}

function searchPage(){
    console.log('SEARCH!');

    headerSection.classList.remove('.header-container--long');
    headerSection.style.background = '';
    
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');

    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoryPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
}

function trendsPage(){
    console.log('TRENDS!!!');

    headerSection.classList.remove('.header-container--long');
    headerSection.style.background = '';
    
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');

    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoryPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
}
