import { isEscapeKey } from './util.js';

// поиск необходимых элементов на странице
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img')
  .querySelector('img');
const bigPictureCancelButton = bigPicture.querySelector('.big-picture__cancel');

// функция отображения большого изображения
const showBigImage = (dataObject) => {

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
    bigPicture.classList.remove('hidden');
    document.body.classList.add('modal-open');
    // добавляем отслеживание нажатия кнопки Esc
    document.addEventListener('keydown', onBigPictureEscKeydown);
  };

  // определение функции закрытия большого фото
  closeBigPicture = () => {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    // убираем отслеживание нажатия кнопки Esc
    document.removeEventListener('keydown', onBigPictureEscKeydown);
  };

  // Действия для кнопки закрытия большого фото
  bigPictureCancelButton.addEventListener('click', () => {
    closeBigPicture();
  });

  // заполняем для фото src и alt
  bigPictureImg.src = dataObject.url;
  bigPictureImg.alt = dataObject.description;

  // открываем большое фото
  openBigPicture();
};

export { showBigImage };
