import axios from "axios";

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
refs.btnLoadMore.addEventListener('click', hendlerLoadMore);

/**========================================================================
 * function hendler on form
 * @param {*string} event 
 */
function hendlerSearchForm(event) {
    event.preventDefault();
    // const inputSearchValue = refs.inputSearch.value.trim();
    page = 1;
        //cleaning cards before new search:
    clearListCards();

    serviceSearchImages();
}

/**========================================================================
 * function for create request on server and get data
 */
async function serviceSearchImages() {
    const inputValue = refs.inputSearch.value.trim();
    const url = `${BASE_URL}?key=${API_KEY}&q=${inputValue}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`

    await axios.get(url)
        .then(response => {
            const { data } = response;
            const imagesAll = data.hits;
            const totalHits = data.totalHits;

            if (imagesAll.length === 0) {
                if (page === 1) {
                    alert('Sorry, there are no images matching your search query. Please try again!')
                }
            } else {
                renderDataImage(imagesAll);
                if (imagesAll.length < totalHits) {
                    refs.btnLoadMore.style.display = 'block';
                } else {
                    refs.btnLoadMore.style.display = 'none';
                }
            }
            
        })
        .catch(error => {
            console.log(error)
        });
}
// servisSearchImages()


/**========================================================================
 * function for create  markup 
 * @param {*object} image 
 */

function createMarkup(image) {
    return `
    <div class="photo-card">
        <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" width="335"/>
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

function clearListCards() {
    refs.listCard.innerHTML = '';
    refs.inputSearch.value = '';
}

function hendlerLoadMore() {
    page++;
    serviceSearchImages()
}