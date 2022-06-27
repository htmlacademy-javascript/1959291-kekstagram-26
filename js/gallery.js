import { showBigImage } from './big-image.js';
import { isEnterKey } from './util.js';

const renderGallery = (inputData) => {
  // ищем все ссылки для картинок на странице
  const linkImg = document.querySelectorAll('.picture');
  // ищем все картинки на странице
  const picturesImg = document.querySelectorAll('.picture__img');

  // действие по Enter на ссылку с картинкой
  const addPictureEnterHandler = (link, data) => {
    link.addEventListener('keydown', (evt) => {
      if (isEnterKey(evt)) {
        evt.preventDefault();
        showBigImage(data);
      }
    });
  };

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
};

export { renderGallery };
