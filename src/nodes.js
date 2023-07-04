// Sections
const headerSection = document.getElementById('header');
const trendingPreviewSection = document.getElementById('trendingPreview');
const categoryPreviewSection = document.getElementById('categoriesPreview');
const genericSection = document.getElementById('genericList');
const movieDetailSection = document.getElementById('movieDetail');
const likedMoviesArt = document.getElementById('liked');

// List & Containers
const searchForm = document.getElementById('searchForm');
const trendingMoviePreviewList = document.querySelector('.trendingPreview-movieList');
const categoriesPreviewList = document.querySelector('.categoriesPreview-list');
const movieDetailCategoriesList = document.querySelector('#movieDetail .categories-list');
const relatedMoviesContainer = document.querySelector('.relatedMovies-scrollContainer'); 
const likedMoviesSection = document.querySelector('.liked-movieList');

// Elements
const headerTitle = document.querySelector('.header-title');
const arrowBtn = document.querySelector('.header-arrow');
const headerCategoryTitle = document.querySelector('.header-title--categoryView');

const searchFormInput = document.querySelector('#searchForm input');
const searchFormBtn = document.querySelector('#searchBtn');

const trendingBtn = document.querySelector('.trendingPreview-btn');

const movieDetailTitle = document.querySelector('.movieDetail-title');
const movieDetailDescription = document.querySelector('.movieDetail-description');
const movieDetailScore = document.querySelector('.movieDetail-score');

const languageSelection = document.querySelector('#lang-opt');

// Countries

countries = [
    {
        name: "usa",
        language: "en",
        flag: '🇺🇸'
    },
    {
        name: "spain",
        language: "es",
        flag: '🇪🇸'
    },
    {
        name: "france",
        language: "fr",
        flag: '🇫🇷'
    },
    {
        name: "brazil",
        language: "pt",
        flag: '🇧🇷'
    },
    {
        name: "germany",
        language: "de",
        flag: '🇩🇪'
    },
    {
        name: "italy",
        language: "it",
        flag: '🇮🇹'
    },
    {
        name: "russia",
        language: "ru",
        flag: '🇷🇺'
    },
    {
        name: "china",
        language: "zh",
        flag: '🇨🇳'
    },
    {
        name: "japan",
        language: "ja",
        flag: '🇯🇵'
    },
    {
        name: "saudi arabia",
        language: "ar",
        flag: '🇸🇦'
    }
]
