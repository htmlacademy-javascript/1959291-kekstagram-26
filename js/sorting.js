import { picturesContainer } from './thumbnails.js';
import { getRandomArrayElement, debounce } from './util.js';
import { createThumbnails } from './thumbnails.js';

// число отображаемых фотографий
const PHOTOS_TO_SHOW = 10;

// время задержи перед обновлением фото
const DELAY = 500;

const imgFiltersElement = document.querySelector('.img-filters');
const imgFilterButtons = imgFiltersElement.querySelectorAll('.img-filters__button');

// функция сортировки элементов массива по числу комментариев
const compareComments = (dataA, dataB) => dataB.comments.length - dataA.comments.length;

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
    result.push(getRandomArrayElement(data));
    // сортируем массив результатов
    result = result.filter((k, i, arr) =>  arr.indexOf(k) === i);
  }
  createThumbnails(result);
};

// отображение фото упорядоченных по комментариям
const showDiscussed = (data) => {
  let results = data.slice();
  results = results.sort(compareComments);
  createThumbnails(results);
};

const addFilters = (data) => {
  // функция действий при клике на кнопку
  const onImgFilterButtonClick = (evt) => {
    evt.preventDefault();
    if (!evt.target.classList.contains('img-filters__button--active')) {
      // ищем активную кнопку
      const imgFilterButtonActiveElement = imgFiltersElement.querySelector('.img-filters__button--active');
      // убираем у нее класс
      imgFilterButtonActiveElement.classList.remove('img-filters__button--active');
      // добавляем класс к цели клика
      evt.target.classList.add('img-filters__button--active');
    }
    // убираем все картинки
    const pictures = picturesContainer.querySelectorAll('.picture');
    pictures.forEach((elem) => elem.remove());

    if (evt.target.id === 'filter-random') {
      showRandom(data);
      return;
    }

    if (evt.target.id === 'filter-discussed') {
      showDiscussed(data);
      return;
    }

    showDefault(data);
  };

  const debounceOnImgFilterButtonClick =  debounce(onImgFilterButtonClick, DELAY);

  // добавляем действие по клику на кнопку
  imgFilterButtons.forEach((elem) => elem.addEventListener('click', debounceOnImgFilterButtonClick));
};

export { showFilters, addFilters };
