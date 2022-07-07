import { isEscapeKey } from './util.js';
import { hideSlider } from './form-picture.js';

// поиск необходимых элементов на странице
const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const uploadCancelButton = imgUploadForm.querySelector('#upload-cancel');

const showImgUploadForm = () => {
  // объявление функции открытия и закрытия формы
  let openImgUploadOverlay = () => {};
  let closeImgUploadOverlay = () => {};

  // функция действий при нажатии кнопки Esc
  const onImgUploadFormEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeImgUploadOverlay();
    }
  };

  // функция действий при клике на кнопку закрытия
  const onUploadCancelButtonClick = () => {
    closeImgUploadOverlay();
  };

  // функция открытия формы загрузки изображения
  openImgUploadOverlay = () => {
    imgUploadOverlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
    // добавляем отслеживание нажатия кнопки Esc к документу
    document.addEventListener('keydown', onImgUploadFormEscKeydown);
    // добавляем отслеживание кнопки закрытия формы загрузки
    uploadCancelButton.addEventListener('click', onUploadCancelButtonClick);
    hideSlider();
  };

  // функция закрытия формы загрузки изображения
  closeImgUploadOverlay = () => {
    imgUploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    // очищаем поля формы до состояния по умолчанию
    imgUploadForm.reset();
    // убираем отслеживание нажатия кнопки Esc
    document.removeEventListener('keydown', onImgUploadFormEscKeydown);
    // убираем отслеживание кнопки закрытия формы загрузки
    uploadCancelButton.removeEventListener('click', onUploadCancelButtonClick);
  };

  // открываем форму
  openImgUploadOverlay();
};

const addFormChangeHandler = () => {
  // ищем поле загрузки нового изображения
  const uploadFileElement = imgUploadForm.querySelector('#upload-file');
  // при изменении поля загрузки нового изображения открываем форму загрузки
  uploadFileElement.addEventListener('change', showImgUploadForm);
};

export { imgUploadForm, addFormChangeHandler };
