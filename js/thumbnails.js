import { showBigImage } from './big-image.js';
import { renderComments } from './comments.js';


// ищем блок для вставки изображений
const otherUserPictures = document.querySelector('.pictures');

// ищем шаблон и блок для вставки
const otherUserPicturesTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const createThumbnail = (dataObject) => {
  // создаем фрагмент для наполнения
  const dataObjectsFragment = document.createDocumentFragment();

  // наполнение фрагмента данными
  const photoElement = otherUserPicturesTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img').src = dataObject.url;
  photoElement.querySelector('.picture__img').alt = dataObject.description;
  photoElement.querySelector('.picture__likes').textContent = dataObject.likes;
  photoElement.querySelector('.picture__comments').textContent = dataObject.comments.length;
  dataObjectsFragment.appendChild(photoElement);

  // добавляем фрагмент в блок
  otherUserPictures.appendChild(dataObjectsFragment);

  // действие по клику на картинку
  photoElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    renderComments(dataObject);
    showBigImage(dataObject);
  });
};

export { createThumbnail };
