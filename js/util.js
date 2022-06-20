// функция проверки длины строки
function isLengthCorrect(str, maxStrLength) {
  return (str.length <= maxStrLength);
}

export {isLengthCorrect};

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

export {getRandomPositiveInteger};

// функция случайного элемента из массива
const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length-1)];

export{getRandomArrayElement};
