import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchText = document.querySelector('[data-search-input]');
const searchButton = document.querySelector('[data-search-button]');

const API_KEY = '49441477-341b75558156795e6f3713ba3';
const BASE_URL = 'https://pixabay.com/api/';

const iziToastSettings = {
  position: 'topCenter',
  timeout: 3000,
  progressBarColor: 'red',
  transitionIn: 'fadeInDown',
  transitionOut: 'fadeOutUp',
};

let fetchedData = [];

const otherParams = {
  lang: 'en',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
};

const fetchImages = async (query, page = 1) => {
  try {
    const response = await fetch(
      `${BASE_URL}?key=${API_KEY}&q=${query}&page=${page}&${otherParams}`
    );
    const data = await response.json();
    return data.hits;
  } catch (error) {
    iziToast.show({
      ...iziToastSettings,
      title: 'Error',
      message: `🟥 We cannot reach the server. Please try again later. 🟥`,
      color: 'red',
    });
    return [];
  }
};

// Search button event listener and handler -------------------
const handleSearch = async event => {
  event.preventDefault();
  gallerySection.innerHTML = `
  <div class="loader">
    <p>Loading...</p>
  </div>
  `;
  // Loader text
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.style.display = 'flex';
  }
  // -----------------

  const query = searchText.value;
  try {
    const images = await fetchImages(query);
    if (images.length === 0) {
      iziToast.show({
        ...iziToastSettings,
        title: 'Error',
        message: `No images found with "${query}" query.`,
        color: 'red',
      });
      return;
    }
    fetchedData = images;
    setGallery(images);
  } finally {
    if (loader) {
      loader.style.display = 'none';
    }
  }
};
searchButton.addEventListener('click', handleSearch);
// ------------------------------------------------------------

// Gallery section
const gallerySection = document.querySelector('.gallery-section');

let lightbox = new SimpleLightbox('.gallery-section a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const createGalleryItem = image => {
  const galleryItem = document.createElement('div');
  galleryItem.classList.add('gallery-item');
  galleryItem.innerHTML = `
    <a href="${image.largeImageURL}">
      <img width="${image.webformatWidth}" height="${image.webformatHeight}" src="${image.webformatURL}" alt="${image.tags}" />
    </a>
    <div class="info">
      <div class="info-box">
        <b>Likes</b>
        ${image.likes}
      </div>
      <div class="info-box">
        <b>Views</b>
        ${image.views}
      </div>
      <div class="info-box">
        <b>Comments</b>
        ${image.comments}
      </div>
      <div class="info-box">
        <b>Downloads</b>
        ${image.downloads}
      </div>
    </div>
  `;
  return galleryItem;
};

const setGallery = images => {
  gallerySection.innerHTML = '';
  images.forEach(image => {
    const galleryItem = createGalleryItem(image);
    gallerySection.appendChild(galleryItem);
  });
  lightbox.refresh();
};
