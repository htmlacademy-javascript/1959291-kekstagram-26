const ALERT_SHOW_TIME = 10000;

const MAX_LENGTH = 140;

const isLengthCorrect = (str) => str.length <= MAX_LENGTH;

// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
const getRandomPositiveInteger = (a, b) => {
  if (a >= 0 && b >= 0)  {
    const min = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
    const max = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
    const result = Math.random() * (max - min + 1) + min;
    return Math.floor(result);
  }
  return('Введены некорректные данные, введите положительные числа или 0');
};

const getRandomArrayElement = (array) => array[getRandomPositiveInteger(0, array.length-1)];

const clearContainer = (container) =>  {
  container.innerHTML = '';
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const isEnterKey = (evt) => evt.key === 'Enter';

const showAlert = (message) => {
  const alertElement = document.createElement('p');
  alertElement.style.zIndex = '100';
  alertElement.style.position = 'fixed';
  alertElement.style.left = '0';
  alertElement.style.top = '0';
  alertElement.style.right = '0';
  alertElement.style.padding = '20px';
  alertElement.style.fontSize = '20px';
  alertElement.style.textAlign = 'center';
  alertElement.style.backgroundColor = '#ff0000';
  alertElement.textContent = message;

  document.body.append(alertElement);

  setTimeout(() => {
    alertElement.remove();
  }, ALERT_SHOW_TIME);
};

const debounce = (cb, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => cb.apply(this, rest), timeoutDelay);
  };
};

export { isLengthCorrect, getRandomArrayElement, clearContainer, isEscapeKey, isEnterKey, showAlert, debounce };

