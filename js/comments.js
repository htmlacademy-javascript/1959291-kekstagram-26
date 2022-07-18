import { clearContainer } from './util.js';

// сколько комментариев показать за нажатие кнопки
const COMMENTS_TO_SHOW = 5;

// поиск необходимых элементов на странице
const socialCommentTemplate = document.querySelector('#comment')
  .content
  .querySelector('.social__comment');
const bigPictureSocialContainer = document.querySelector('.big-picture__social');
const socialCaptionElement = bigPictureSocialContainer.querySelector('.social__caption');
const likesCountElement = bigPictureSocialContainer.querySelector('.likes-count');
const socialCommentCountElement = bigPictureSocialContainer.querySelector('.social__comment-count');
const commentsCountElement = socialCommentCountElement.querySelector('.comments-count');
const socialCommentsListElement = bigPictureSocialContainer.querySelector('.social__comments');
const commentsLoaderButton = bigPictureSocialContainer.querySelector('.comments-loader');
const commentsCountShownElement = socialCommentCountElement.querySelector('.comments-count-shown');

// функция генерации комментария из данных
const renderComment = (comment) => {
  // создаем фрагмент для наполнения
  const socialCommentFragment = document.createDocumentFragment();

  // наполнение фрагмента данными
  const commentElement = socialCommentTemplate.cloneNode(true);
  commentElement.querySelector('img').src = comment.avatar;
  commentElement.querySelector('img').alt = comment.name;
  commentElement.querySelector('.social__text').textContent = comment.message;
  // добавляем класс чтобы коммент был скрыт по умолчанию
  commentElement.classList.add('hidden');
  socialCommentFragment.appendChild(commentElement);

  // добавляем фрагмент в блок
  socialCommentsListElement.appendChild(socialCommentFragment);
};

// функция генерации нескольких комментариев
const renderComments = (object) => {
  for (let i = 0; i < object.comments.length; i++) {
    renderComment(object.comments[i]);
  }
};

// Число показанных комментариев
let commentsShown;

const showHiddenComments = () => {
  // ищем все комментарии в блоке
  const socialCommentsListItems = socialCommentsListElement.querySelectorAll('.social__comment');

  for (let i = 0; i < COMMENTS_TO_SHOW; i++) {
    if (commentsShown === socialCommentsListItems.length) {
      commentsLoaderButton.classList.add('hidden');
    }
    if (commentsShown < socialCommentsListItems.length ) {
      socialCommentsListItems[commentsShown].classList.remove('hidden');
      commentsShown++;
    }
  }
  commentsCountShownElement.textContent = commentsShown;
};

// функция показа комментариев
const showComments = () => {
  // начальное число показанных комментариев
  commentsShown = 0;
  showHiddenComments();
};

// функция генерации всех данных области комментариев окна большого изображения
const renderCommentsArea = (object) => {
  // показываем кнопку загрузки доп. комментариев
  commentsLoaderButton.classList.remove('hidden');

  // заполняем данные social__caption
  socialCaptionElement.textContent = object.description;

  // заполняем данные likes-count
  likesCountElement.textContent = object.likes;

  // заполняем данные comments-count
  commentsCountElement.textContent = object.comments.length;

  // очищаем содержимое socialComments
  clearContainer(socialCommentsListElement);

  // создаем комментарии
  renderComments(object);

  // показываем комментарии
  showComments();

  // Обработчик кнопки загрузки новых комментов
  commentsLoaderButton.addEventListener('click', showHiddenComments);
};

export { renderCommentsArea };
