import { clearContainer } from './util.js';

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

// сколько комментариев показать за нажатие кнопки
const COMMENTS_TO_SHOW = 5;

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

// функция показа комментариев
const showComments = () => {
  // ищем все комментарии в блоке
  const socialCommentsListItems = socialCommentsListElement.querySelectorAll('.social__comment');

  // начальное число показанных комментариев
  let commentsShown = 0;

  const showHiddenComments = () => {
    for (let i = 0; i < COMMENTS_TO_SHOW; i++) {
      if (commentsShown < socialCommentsListItems.length ) {
        socialCommentsListItems[commentsShown].classList.remove('hidden');
        commentsShown++;
      }
      if (commentsShown === socialCommentsListItems.length) {
        commentsLoaderButton.classList.add('hidden');
      }
    }
    commentsCountShownElement.textContent = commentsShown;
  };

  showHiddenComments();

  commentsLoaderButton.addEventListener('click', () => {
    showHiddenComments();
    commentsCountShownElement.textContent = commentsShown;
  });
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
};

export { renderCommentsArea };
