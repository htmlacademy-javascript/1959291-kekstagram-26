// функция проверки длины строки
const MAX_LENGTH = 140;
const isLengthCorrect = (str) => str.length <= MAX_LENGTH;

// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// функция случайного целого числа из диапазона
const getRandomPositiveInteger = (a, b) => {
  if (a >= 0 && b >= 0)  {
    const min = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
    const max = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
    const result = Math.random() * (max - min + 1) + min;
    return Math.floor(result);
  }
  return('Введены некорректные данные, введите положительные числа или 0');
};

// функция случайного элемента из массива
const getRandomArrayElement = (array) => array[getRandomPositiveInteger(0, array.length-1)];

// функция очистки
const clearContainer = (container) =>  {
  container.innerHTML = '';
};

// функция проверки нажатой кнопки Escape
const isEscapeKey = (evt) => evt.key === 'Escape';

// функция проверки нажатой кнопки Enter
const isEnterKey = (evt) => evt.key === 'Enter';

export { isLengthCorrect, getRandomPositiveInteger, getRandomArrayElement, clearContainer, isEscapeKey, isEnterKey };
