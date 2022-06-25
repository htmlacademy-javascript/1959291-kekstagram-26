import {createMyDataObjects} from './data.js';

// ищем блок для вставки изображений
const otherUserPictures = document.querySelector('.pictures');

// ищем шаблон и блок для вставки
const otherUserPicturesTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

// генерируем данные
const similarPhotos = createMyDataObjects();

// создаем фрагмент для наполнения
const similarPhotosFragment = document.createDocumentFragment();

similarPhotos.forEach(({url, likes, comments}) => {
  const photoElement = otherUserPicturesTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img').src = url;
  photoElement.querySelector('.picture__likes').textContent = likes;
  photoElement.querySelector('.picture__comments').textContent = comments.length;
  similarPhotosFragment.appendChild(photoElement);
});

otherUserPictures.appendChild(similarPhotosFragment);
