import { isLengthCorrect, isEscapeKey } from './util.js';
import { imgUploadForm } from './form.js';

// Поля для валидации в форме
const textHashtagElement = imgUploadForm.querySelector('.text__hashtags');
const textDescriptionElement = imgUploadForm.querySelector('.text__description');

// максимальное число хештегов
const MAX_TAGS = 5;

// регулярное выражение для проверки хештега
const HASHTAG_REGEX = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

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
    const tagsArray = data.split(' ');
    // создаем новый массив из уникальных элементов первого массива, переводим каждый элемент в нижний регистр
    const uniqueTagsArray = [...new Set(tagsArray.map((elem) => elem.toLowerCase()))];
    // сравниваем длины массивов
    return (tagsArray.length === uniqueTagsArray.length);
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

  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      imgUploadForm.submit();
    }
  });
};

export { addFormValidation };
