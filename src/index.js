import axios from "axios";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
//------------------------------------------------------


const API_KEY = '36885603-fb02061b93c5e3b035d34c370';
const BASE_URL = 'https://pixabay.com/api/';

const refs = {
    form: document.querySelector('.form'),
    inputSearch: document.querySelector('[name="searchQuery"]'),
    listCard: document.querySelector('.js-list-cards'),
    btnLoadMore: document.querySelector('.dtn-load-more')
}
let page = 1;
//events on btn
refs.form.addEventListener('submit', hendlerSearchForm);
// refs.btnLoadMore.addEventListener('click', hendlerLoadMore);

/**========================================================================
 * function hendler on form
 * @param {*string} event 
 */
function hendlerSearchForm(event) {
    event.preventDefault();

    //cleaning cards before new search:
    clearListCards();

    serviceSearchImages();
}

/**========================================================================
 * function for create request on server and get data
 */
async function serviceSearchImages(page = 1) {

    const inputValue = refs.inputSearch.value.trim();
    // console.log(inputValue)

    const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(inputValue)}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
    // console.log(inputValue)

    await axios.get(url)
        .then(response => {
            const { data } = response;
            const imagesAll = data.hits;
            const totalHits = data.totalHits;



            if (imagesAll.length === 0) {
                if (page === 1) {
                    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again!')
                }
            } else {
                Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`)
                renderDataImage(imagesAll);
            }
            if (imagesAll.length < totalHits) {
                observer.observe(guard);
            } else if (imagesAll.length === totalHits) {
                // Notiflix.Notify.info("We're sorry, but you've reached the end of search results.")
                observer.unobserve(guard);
            }

        })
        .catch(error => {
            console.log(error)
        });
}

/**========================================================================
 * function for create  markup 
 * @param {*object} image 
 */
function createMarkup(image, lightbox) {
    return `
    <div class="photo-card">
        <div class="gallery">
            <a class="gallery__link" href="${image.largeImageURL}">
                <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" width="335"/>
            </a>
        </div>
        <div class="info">
            <p class="info-item"><b>Likes: </b>${image.likes}</p>
            <p class="info-item"><b>Views: </b> ${image.views}</p>
            <p class="info-item"><b>Comments: </b>${image.comments}</p>
            <p class="info-item"><b>Downloads: </b>${image.downloads}</p>
        </div>
    </div>`;
}
/**==========================================================================
 * function for render data from array in markup
 * @param {string} array 
 */
function renderDataImage(array) {
    const cardsImage = array.map(image => createMarkup(image)).join('');
    // refs.listCard.innerHTML = cardsImage;
    refs.listCard.insertAdjacentHTML('beforeend', cardsImage);

}

/**==========================================================================
 * function for clear list with cards and input
 */
function clearListCards() {
    refs.listCard.innerHTML = '';
    // refs.inputSearch.value = '';
}


//--* INTRSECTION OBSERVER *----------------------------------------------------

const guard = document.querySelector('.js-guard');

let options = {
    root: null,
    rootMargin: "330px",
    threshold: 0,
}

let observer = new IntersectionObserver(handlerPagination, options);

/**
 * function callback Intersection observer
 * @param {*} entries 
 */
function handlerPagination(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            page += 1;
            serviceSearchImages(page);
        }
    })
}


//------- usage simplelightbox -----------------------------------

const lightbox = new SimpleLightbox('.gallery a');


//----------------* Smooth page scrolling *------------------------
const { height: cardHeight } = refs.listCard.firstElementChild.getBoundingClientRect();

window.scrollBy({
    top: cardHeight * 2,
    behavior: "smooth",
});