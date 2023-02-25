searchFormBtn.addEventListener('click', () => {
    location.hash = '#search=' + searchFormInput.value;
});

trendingBtn.addEventListener('click', () => {
    location.hash = '#trends'
});


window.addEventListener('DOMContentLoaded', navigator, false);

window.addEventListener('hashchange', navigator, false);
//both events for navigating in the page, allowing to navigate with different hashes and when the whole page loads

arrowBtn.addEventListener('click', () => {
        window.history.back();  // this method makes us go back to the previous page
    
        /*  
        location.hash = '#home'
    */
});




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

    window.scrollTo({top: 0, behavior: 'smooth'});
    //using scrollTo event, scrolling to the top of the page instantly
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

    const moviesChildren = trendingMoviePreviewList.children[0];
    // console.log(moviesChildren)
    const catChildren = categoriesPreviewList.children[0];
    // console.log(children)

    if(!moviesChildren && !catChildren) {
        getTrendingMoviesPreview();
        getCategoriesPreview();   
    }
    //if there's already any element in both containers, we won't call the API, that way optimizing the API consumption and not overloading the memory of the navigator

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
}

function searchPage(){
    console.log('SEARCH!');

    headerSection.classList.remove('.header-container--long');
    headerSection.style.background = '';
    
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');

    // goBackButton.addEventListener('click', () => {
    //     history.back();
    // })

    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoryPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    const [_, searchParam] = location.hash.split('='); // ['#search', 'value']
    const query = searchParam.replaceAll('%20', ' ');

    getMoviesBySearch(query);
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

    headerCategoryTitle.innerText = 'Trending';

    getTrendingMovies();
}
