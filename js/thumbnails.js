import { showBigImage } from './big-image.js';
import { renderComments } from './comments.js';

// ищем блок для вставки изображений
const picturesContainer = document.querySelector('.pictures');

// ищем шаблон и блок для вставки
const picturesTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const createThumbnail = (data) => {
  // создаем фрагмент для наполнения
  const dataFragment = document.createDocumentFragment();

  // наполнение фрагмента данными
  const photoElement = picturesTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img').src = data.url;
  photoElement.querySelector('.picture__img').alt = data.description;
  photoElement.querySelector('.picture__likes').textContent = data.likes;
  photoElement.querySelector('.picture__comments').textContent = data.comments.length;
  dataFragment.appendChild(photoElement);

  // добавляем фрагмент в блок
  picturesContainer.appendChild(dataFragment);

  // действие по клику на картинку
  photoElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    renderComments(data);
    showBigImage(data);
  });
};

const createThumbnails = (data) => {
  for (let i = 0; i < data.length; i++) {
    createThumbnail(data[i]);
  }
};

export { createThumbnails };
