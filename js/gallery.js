import {createData} from './data.js';
import {createThumbnails} from './thumbnails.js';
import {showBigImage} from './big-image.js';

// генерируем данные
const inputData = createData();

// добавляем данные на страницу
createThumbnails(inputData);

// // ищем все картинки на странице
const picturesImg = document.querySelectorAll('.picture__img');

// действие по клику на картинку
const addPictureClickHandler = (picture, data) => {
  picture.addEventListener('click', (evt) => {
    evt.preventDefault();
    showBigImage(data);
  });
};

// добавляем обработчик клика на каждую картинку
for (let i = 0; i < picturesImg.length; i++) {
  addPictureClickHandler(picturesImg[i], inputData[i]);
}
