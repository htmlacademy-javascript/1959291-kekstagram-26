import { isLengthCorrect, isEscapeKey } from './util.js';
import '../pristine/pristine.min.js';

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
  const uploadFile = imgUploadForm.querySelector('#upload-file');
  // при изменении поля загрузки нового изображения открываем форму загрузки
  uploadFile.addEventListener('change', showImgUploadForm);
};

//  ***********************  валидация формы  ***********************

// Поля для валидации в форме
const textHashtag = imgUploadForm.querySelector('.text__hashtags');
const textDescription = imgUploadForm.querySelector('.text__description');

// функция действий при нажатии кнопки Esc в поле ввода
const onInputEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    // остановим всплытие
    evt.stopPropagation();
  }
};

// добавляем события полям
textHashtag.addEventListener('keydown', onInputEscKeydown);
textDescription.addEventListener('keydown', onInputEscKeydown);

// регулярное выражение для проверки хештега
const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

const formValidation = () =>{
  // проверка 1 - теги начинаются с символа # и состоят из допустимых символов, длина не превышает 20 символов
  const isHashTagsCorrect = (data) => {
    if (data.length > 0) {
      // создаем из строки массив
      const tagsArray = data.split(' ');
      return(tagsArray.every((element) => re.test(element)));
    }
    return(true);
  };

  // проверка 2 - не более 5 тэгов
  const MAX_TAGS = 5;
  const isHashTagsNumberCorrect = (data) => {
    const tagsArray = data.split(' ');
    return(tagsArray.length <= MAX_TAGS);
  };

  // проверка 3 - уникальные теги
  const isHashTagsDuplicate = (data) => {
    const tagsArray = data.split(' ');
    // создаем новый массив из уникальных элементов первого массива, переводим каждый элемент в нижний регистр
    const uniqueTags = [...new Set(tagsArray.map((elem) => elem.toLowerCase()))];
    // сравниваем длины массивов
    return (tagsArray.length === uniqueTags.length);
  };

  const pristine = new Pristine(imgUploadForm, {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'form__item--invalid',
    successClass: 'form__item--valid',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'p',
    errorTextClass: 'form__error'
  });

  pristine.addValidator(
    textHashtag,
    // в функцию будет передано значение textHashtag.value !!!!!!!!!!!!!!
    isHashTagsCorrect,
    'хэштег должен начинаться с #, быть длиной от 2 до 20 символов, содержать только буквы и цифры, отделяться от соседей пробелом'
  );

  pristine.addValidator(
    textHashtag,
    isHashTagsNumberCorrect,
    'возможно использовать не боле 5 тэгов'
  );

  pristine.addValidator(
    textHashtag,
    isHashTagsDuplicate,
    'все теги должны быть уникальными'
  );

  // или это просто прописать в maxlength у поля?
  pristine.addValidator(
    textDescription,
    isLengthCorrect,
    'Ваш комментарий должен быть не более 140 символов'
  );

  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      imgUploadForm.submit();
    }
  });
};

export { addFormChangeHandler, formValidation };
