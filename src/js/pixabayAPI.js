const searchText = document.querySelector('[data-search-input]');
const searchButton = document.querySelector('[data-search-button]');

const API_KEY = '49441477-341b75558156795e6f3713ba3';
const BASE_URL = 'https://pixabay.com/api/';

console.log('API_KEY:', API_KEY);
console.log('BASE_URL:', BASE_URL);

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
    console.log('Gelen data:', data);
    return data.hits;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
};

// Search button event listener and handler -------------------
const handleSearch = async event => {
  event.preventDefault();
  console.log('handleSearch function called');
  const query = searchText.value;
  const images = await fetchImages(query);
  fetchedData = images;
  console.log(images[0]);
  setGallery(images);
};
searchButton.addEventListener('click', handleSearch);
// ------------------------------------------------------------

// Gallery section
const gallerySection = document.querySelector('.gallery-section');

const createGalleryItem = image => {
  const galleryItem = document.createElement('div');
  galleryItem.classList.add('gallery-item');
  galleryItem.innerHTML = `
    <img width="${image.webformatWidth}" height="${image.webformatHeight}" src="${image.webformatURL}" alt="${image.tags}" />
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
};
