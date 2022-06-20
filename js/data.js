import {getRandomArrayElement} from './util.js';
import {getRandomPositiveInteger} from './util.js';

const NAMES = [
  'Шерлок',
  'Пигги',
  'Анчоус',
  'Конфуций',
  'Васаби',
  'Зефир',
  'Кабачок',
  'Утюжок',
  'Нолик',
  'Гравицапа',
  'Лаваш',
  'Юстас',
  'Няша',
  'Фунтик',
  'Рубик',
  'Шнурок',
  'Миксер',
  'Чебурек',
  'Плюшка',
];

const DESCRIPTIONS = [
  'Отель и пляж',
  'Известная дорога',
  'Лагуна',
  'Фотоаппарат',
  'Вкусняшки',
  'Черная машинка',
  'На завтрак',
  'Компот',
  'Пролетая над пляжем',
  'На выбор',
  'Дорога на пляж',
  'Властелин колец',
  'Фрукты-овощи',
  'Не ешь меня',
  'Тепло и уют',
  'Небо, самолет',
  'Хор',
  'Старый стиль',
  'П -Полезно',
  'Вечерняя площадь',
  'Здоровый перекус',
  'Закат',
  'Краб смотрит на тебя как ...',
  'Шоу',
  'Какая встреча',
];


const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const OBJECT_COUNT = 25;
const MINIMUM_LIKES = 15;
const MAXIMUM_LIKES = 200;
const MINIMUM_AVATAR_NUMBER = 1;
const MAXIMUM_AVATAR_NUMBER = 6;
const MAXIMUM_COMMENTS_NUMBER = 4;
const MINIMUM_COMMENT_ID = 1;
const MAXIMUM_COMMENT_ID = 2000;

// функция создания массива уникальных чисел, длинна массива, диапазон чисел в массиве
const createUniqueCommentId = (arrayLength, a, b) => {
  // объявляем массив для случайных чисел и массив для уникальных id комментариев
  const randomArray = [];
  let uniqueCommentId = [];

  // если длина уникального массива меньше чем нам необходимо уникальных id, то
  while (uniqueCommentId.length < arrayLength) {

    /* наполняем массив случайными числами, в диапазоне допустимом для для COMMENT_ID
  (в два раза длиннее чем нам необходим - для того, чтобы нам хватило чисел для уникального массива после удаления повторяющихся)
  */
    for (let i = 0; i <= arrayLength*2; i++) {
      randomArray[i] = getRandomPositiveInteger(a, b);
    }
    // создаем уникальный массив из случайного массива и обрезаем его до необходимой длины
    uniqueCommentId = [...new Set(randomArray)].splice(0, arrayLength);
  }
  return uniqueCommentId;
};

const createComment = () => ({
  id: getRandomArrayElement(createUniqueCommentId(MAXIMUM_COMMENTS_NUMBER, MINIMUM_COMMENT_ID, MAXIMUM_COMMENT_ID)),
  avatar: `img/avatar-${  getRandomPositiveInteger(MINIMUM_AVATAR_NUMBER, MAXIMUM_AVATAR_NUMBER)  }.svg`,
  message: MESSAGES[getRandomPositiveInteger(0, MESSAGES.length - 1)],
  name: NAMES[getRandomPositiveInteger(0, NAMES.length - 1)],
});

const createObject = (i) => ({
  id: i,
  url: `photos/${  i  }.jpg`,
  description: DESCRIPTIONS[i-1],
  likes: getRandomPositiveInteger(MINIMUM_LIKES, MAXIMUM_LIKES),
  comments: Array.from({length: getRandomPositiveInteger(1, MAXIMUM_COMMENTS_NUMBER)}, createComment),
});

const createMyDataObjects = () => {
  const myDataObjects = [];

  for (let i = 0; i < OBJECT_COUNT; i++) {
  // чтобы на [0] месте массива id был 1
    myDataObjects[i] = createObject(i+1);
  }

  return (myDataObjects);
};

export {createMyDataObjects};
