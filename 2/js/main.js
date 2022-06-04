// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomIntInclusive(min, max) {
  if (min < max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return 'Ошибка! Число «до» меньшее, чем значение «от», или равное ему';
}

getRandomIntInclusive(1, 5);

function isLengthCorrect (str, maxStrLength) {
  return (str.length <= maxStrLength);
}

isLengthCorrect('Test', 10);
