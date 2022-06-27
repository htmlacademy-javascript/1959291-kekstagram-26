import {createData} from './data.js';
import {createThumbnails} from './thumbnails.js';
import {showBigImage} from './big-image.js';
import { isEnterKey } from './util.js';

// генерируем данные
const inputData = createData();

// добавляем данные на страницу
createThumbnails(inputData);

// вариант с делегированием событий (для работы нужен alt у картинки)
// ищем родительский контейнер для фото
const picturesContainer = document.querySelector('.pictures');

// событие по клику на картинку
picturesContainer.addEventListener('click', (evt) => {
  const target = evt.target;
  // только для элементов class="picture__img"
  if (target.matches('[class="picture__img"]')) {
    evt.preventDefault();
    // ищем данные по alt и отправляем их в модуль большой картинки
    for (let i = 0; i < inputData.length; i++) {
      if (inputData[i].description === target.alt) {
        showBigImage(inputData[i]);
      }
    }
  }
});

// событие по Enter на картинку
picturesContainer.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    const target = evt.target;
    // только для элементов class="picture"
    if (target.matches('[class="picture"]')) {
      evt.preventDefault();
      // ищем img в ссылке
      const myImg = target.querySelector('.picture__img');
      // ищем данные по alt и отправляем их в модуль большой картинки
      for (let i = 0; i < inputData.length; i++) {
        if (inputData[i].description === myImg.alt) {
          showBigImage(inputData[i]);
        }
      }
    }
  }
});


// // альтернативный вариант - обработчик не все картинки

// // ищем все ссылки для картинок на странице
// const linkImg = document.querySelectorAll('.picture');

// // действие по Enter на ссылку картинки
// const addPictureEnterHandler = (link, data) => {
//   link.addEventListener('keydown', (evt) => {
//     if (isEnterKey(evt)) {
//       evt.preventDefault();
//       showBigImage(data);
//     }
//   });
// };

// // ищем все картинки на странице
// const picturesImg = document.querySelectorAll('.picture__img');

// // действие по клику на картинку
// const addPictureClickHandler = (picture, data) => {
//   picture.addEventListener('click', (evt) => {
//     evt.preventDefault();
//     showBigImage(data);
//   });
// };

// // добавляем обработчик клика и Enter на каждую ссылку и картинку
// for (let i = 0; i < picturesImg.length; i++) {
//   addPictureClickHandler(picturesImg[i], inputData[i]);
//   addPictureEnterHandler(linkImg[i], inputData[i]);
// }

