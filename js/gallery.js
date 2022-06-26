import {createData} from './data.js';
import {createThumbnails} from './thumbnails.js';
import {showBigImage} from './big-image.js';
import { isEnterKey } from './util.js';

// генерируем данные
const inputData = createData();

// добавляем данные на страницу
createThumbnails(inputData);

// ищем все ссылки для картинок на странице
const linkImg = document.querySelectorAll('.picture');

// действие по клику на ссылку картинки
const addPictureEnterHandler = (link, data) => {
  link.addEventListener('keydown', (evt) => {
    if (isEnterKey(evt)) {
      evt.preventDefault();
      showBigImage(data);
    }
  });
};

// ищем все картинки на странице
const picturesImg = document.querySelectorAll('.picture__img');

// действие по клику на картинку
const addPictureClickHandler = (picture, data) => {
  picture.addEventListener('click', (evt) => {
    evt.preventDefault();
    showBigImage(data);
  });
};

// добавляем обработчик клика и Enter на каждую ссылку и картинку
for (let i = 0; i < picturesImg.length; i++) {
  addPictureClickHandler(picturesImg[i], inputData[i]);
  addPictureEnterHandler(linkImg[i], inputData[i]);
}
