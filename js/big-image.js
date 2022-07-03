import { isEscapeKey } from './util.js';

// поиск необходимых элементов на странице
const bigPictureContainer = document.querySelector('.big-picture');
const bigPictureImgElement = bigPictureContainer.querySelector('.big-picture__img')
  .querySelector('img');
const bigPictureCancelButton = bigPictureContainer.querySelector('.big-picture__cancel');

// функция отображения большого изображения
const showBigImage = (data) => {

  // объявление функции закрытия большого фото
  let closeBigPicture = () => {};

  // функция действий при нажатии кнопки Esc
  const onBigPictureEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeBigPicture();
    }
  };

  // функция открытия большого фото
  const openBigPicture = () => {
    bigPictureContainer.classList.remove('hidden');
    document.body.classList.add('modal-open');
    // добавляем отслеживание нажатия кнопки Esc
    document.addEventListener('keydown', onBigPictureEscKeydown);
  };

  // определение функции закрытия большого фото
  closeBigPicture = () => {
    bigPictureContainer.classList.add('hidden');
    document.body.classList.remove('modal-open');
    // убираем отслеживание нажатия кнопки Esc
    document.removeEventListener('keydown', onBigPictureEscKeydown);
  };

  // Действия для кнопки закрытия большого фото
  bigPictureCancelButton.addEventListener('click', () => {
    closeBigPicture();
  });

  // заполняем для фото src и alt
  bigPictureImgElement.src = data.url;
  bigPictureImgElement.alt = data.description;

  // открываем большое фото
  openBigPicture();
};

export { showBigImage };
