import { picturesContainer } from './thumbnails.js';
import { getRandomArrayElement, debounce } from './util.js';
import { createThumbnails } from './thumbnails.js';

// число отображаемых фотографий
const PHOTOS_TO_SHOW = 10;

// время задержи перед обновлением фото
const DELAY = 500;

const imgFiltersElement = document.querySelector('.img-filters');
const imgFilterButtons = imgFiltersElement.querySelectorAll('.img-filters__button');

// функция сортировки элементов массива по числу лайков
const compareLikes = (dataA, dataB) => dataB.likes - dataA.likes;

// функция показать фильтры
const showFilters = () => {
  imgFiltersElement.classList.remove('img-filters--inactive');
};

// отображение по-умолчанию
const showDefault = (data) => {
  createThumbnails(data);
};

// отображение случайных фото
const showRandom = (data) => {
  let result = [];
  while (result.length < PHOTOS_TO_SHOW) {
    // добавляем случайный элемент в массив
    result.push(getRandomArrayElement(data));
    // сортируем массив результатов
    result = result.filter((k, i, arr) =>  arr.indexOf(k) === i);
  }
  createThumbnails(result);
};

// отображение фото упорядоченных по просмотрам
const showDiscussed = (data) => {
  let result = data.slice();
  result = result.sort(compareLikes);
  createThumbnails(result);
};

const addFilters = (data) => {
  // функция действий при клике на кнопку
  const onImgFilterButtonClick = (evt) => {
    evt.preventDefault();
    imgFilterButtons.forEach((elem) => elem.classList.remove('img-filters__button--active'));
    evt.target.classList.add('img-filters__button--active');
    // убираем все картинки
    const pictures = picturesContainer.querySelectorAll('.picture');
    pictures.forEach((elem) => elem.remove());

    if (evt.target.id === 'filter-default') {
      showDefault(data);
      return;
    }

    if (evt.target.id === 'filter-random') {
      showRandom(data);
      return;
    }

    if (evt.target.id === 'filter-discussed') {
      showDiscussed(data);
    }
  };

  const debounceOnImgFilterButtonClick =  debounce(onImgFilterButtonClick, DELAY);

  // добавляем действие по клику на кнопку
  imgFilterButtons.forEach((elem) => elem.addEventListener('click', debounceOnImgFilterButtonClick));
};

export { showFilters, addFilters };
