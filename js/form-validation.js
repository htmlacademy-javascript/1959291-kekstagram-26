import { isLengthCorrect, isEscapeKey } from './util.js';
import { imgUploadForm, closeImgUploadOverlay, hideImgUploadOverlay, unHideImgUploadOverlay } from './form.js';
import { sendData } from './api.js';

// максимальное число хештегов
const MAX_TAGS = 5;

// регулярное выражение для проверки хештега
const HASHTAG_REGEX = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

// необходимые элементы
const textHashtagElement = imgUploadForm.querySelector('.text__hashtags');
const textDescriptionElement = imgUploadForm.querySelector('.text__description');
const submitButtonElement = imgUploadForm.querySelector('.img-upload__submit');

// ищем шаблон и блок для сообщения когда отправка данных прошла успешно
const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

// ищем шаблон и блок для сообщения когда при отправке данных произошла ошибка запроса
const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

// функция действий при нажатии кнопки Esc в поле ввода
const onInputEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    // остановим всплытие
    evt.stopPropagation();
  }
};

// добавляем события полям
textHashtagElement.addEventListener('keydown', onInputEscKeydown);
textDescriptionElement.addEventListener('keydown', onInputEscKeydown);

const addFormValidation = () =>{
  // проверка 1 - теги начинаются с символа # и состоят из допустимых символов, длина не превышает 20 символов
  const isHashTagsCorrect = (data) => {
    if (data.length > 0) {
      // создаем из строки массив
      const tagsArray = data.split(' ');
      return(tagsArray.every((elem) => HASHTAG_REGEX.test(elem)));
    }
    return(true);
  };

  // проверка 2 - не более 5 тэгов
  const isHashTagsNumberCorrect = (data) => {
    const tagsArray = data.split(' ');
    return(tagsArray.length <= MAX_TAGS);
  };

  // проверка 3 - уникальные теги
  const isHashTagsDuplicate = (data) => {
    const tags = data.split(' ');
    // создаем новый массив из уникальных элементов первого массива, переводим каждый элемент в нижний регистр
    const uniqueTags = [...new Set(tags.map((elem) => elem.toLowerCase()))];
    // сравниваем длины массивов
    return (tags.length === uniqueTags.length);
  };

  // конфигурация для валидации
  const pristine = new Pristine(imgUploadForm, {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'img-upload__item--invalid',
    successClass: 'img-upload__item--valid',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'p',
    errorTextClass: 'img-upload__error'
  });

  pristine.addValidator(
    textHashtagElement,
    // в функцию будет передано значение textHashtagElement.value !!!!!!!!!!!!!!
    isHashTagsCorrect,
    'хэштег должен начинаться с #, быть длиной от 2 до 20 символов, содержать только буквы и цифры, отделяться от соседей пробелом'
  );

  pristine.addValidator(
    textHashtagElement,
    isHashTagsNumberCorrect,
    'возможно использовать не боле 5 тэгов'
  );

  pristine.addValidator(
    textHashtagElement,
    isHashTagsDuplicate,
    'все хештеги должны быть уникальными'
  );

  pristine.addValidator(
    textDescriptionElement,
    isLengthCorrect,
    'комментарий должен быть не более 140 символов'
  );

  let successMessageElement, successButtonElement, errorMessageElement, errorButtonElement;

  // функция убирает сообщение
  let removeSuccessMessage = () => {};
  let removeErrorMessage = () => {};

  // функция блокировки кнопки формы
  const blockSubmitButton = () => {
    submitButtonElement.disabled = true;
    submitButtonElement.textContent = 'Публикую...';
  };

  // функция снятия блокировки кнопки формы
  const unblockSubmitButton = () => {
    submitButtonElement.disabled = false;
    submitButtonElement.textContent = 'Опубликовать';
  };

  // функция действий при нажатии кнопки Esc
  const onSuccessMessageEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      removeSuccessMessage();
    }
  };
  const onErrorMessageEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      removeErrorMessage();
      // остановим всплытие
      evt.stopPropagation();
    }
  };

  const createSuccessMessage = () => {
  // создаем фрагмент для наполнения
    const dataFragment = document.createDocumentFragment();
    successMessageElement = successTemplate.cloneNode(true);
    dataFragment.appendChild(successMessageElement);
    document.body.appendChild(dataFragment);
    // кнопка в сообщении
    successButtonElement = successMessageElement.querySelector('.success__button');
  };

  const createErrorMessage = () => {
    const dataFragment = document.createDocumentFragment();
    errorMessageElement = errorTemplate.cloneNode(true);
    dataFragment.appendChild(errorMessageElement);
    document.body.appendChild(dataFragment);
    errorButtonElement = errorMessageElement.querySelector('.error__button');
  };

  // функция действий при клике вне окна
  const onSuccessMessageClick = (evt) => {
    if (evt.target === successMessageElement) {
      removeSuccessMessage();
    }
  };
  const onErrorMessageClick = (evt) => {
    if (evt.target === errorMessageElement) {
      removeErrorMessage();
    }
  };

  const addEventListenerToSuccessMessage = () => {
  // добавляем отслеживание клика по кнопке
    successButtonElement.addEventListener('click', removeSuccessMessage);
    // добавляем отслеживание клика не по сообщению
    successMessageElement.addEventListener('click', onSuccessMessageClick);
    // добавляем отслеживание нажатия кнопки Esc
    document.addEventListener('keydown', onSuccessMessageEscKeydown);
  };

  const addEventListenerToErrorMessage = () => {
    errorButtonElement.addEventListener('click', removeErrorMessage);
    errorMessageElement.addEventListener('click', onErrorMessageClick);
    document.addEventListener('keydown', onErrorMessageEscKeydown);
  };

  // функция убирает сообщение
  removeSuccessMessage = () => {
    successMessageElement.remove();
    document.removeEventListener('keydown', onSuccessMessageEscKeydown);
  };

  removeErrorMessage = () => {
    errorMessageElement.remove();
    document.removeEventListener('keydown', onErrorMessageEscKeydown);
    unHideImgUploadOverlay();
  };

  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      blockSubmitButton();
      sendData(
        () => {
          unblockSubmitButton();
          closeImgUploadOverlay();
          createSuccessMessage();
          addEventListenerToSuccessMessage();
        },
        () => {
          unblockSubmitButton();
          hideImgUploadOverlay();
          createErrorMessage();
          addEventListenerToErrorMessage();
        },
        new FormData(imgUploadForm)
      );
    }
  });
};

export { addFormValidation };
