import { clearContainer } from './util.js';

// поиск необходимых элементов на странице
const socialCommentTemplate = document.querySelector('#comment')
  .content
  .querySelector('.social__comment');
const bigPictureSocialContainer = document.querySelector('.big-picture__social');
const socialCaptionElement = bigPictureSocialContainer.querySelector('.social__caption');
const likesCountElement = bigPictureSocialContainer.querySelector('.likes-count');
const socialCommentCountElement = bigPictureSocialContainer.querySelector('.social__comment-count');
const commentCount = socialCommentCountElement.querySelector('.comments-count');
const socialCommentsList = bigPictureSocialContainer.querySelector('.social__comments');
const commentsLoaderElement = bigPictureSocialContainer.querySelector('.comments-loader');

// функция генерации комментариев из данных
const renderComments = (dataObject) => {
  // заполняем данные social__caption
  socialCaptionElement.textContent = dataObject.description;

  // заполняем данные likes-count
  likesCountElement.textContent = dataObject.likes;

  // заполняем данные comments-count
  commentCount.textContent = dataObject.comments.length;

  // очищаем содержимое socialComments
  clearContainer(socialCommentsList);

  // создаем фрагмент для наполнения
  const socialCommentFragment = document.createDocumentFragment();

  dataObject.comments.forEach(({avatar, name, message}) => {
    const commentElement = socialCommentTemplate.cloneNode(true);
    commentElement.querySelector('img').src = avatar;
    commentElement.querySelector('img').alt = name;
    commentElement.querySelector('.social__text').textContent = message;
    socialCommentFragment.appendChild(commentElement);
  });

  // добавляем фрагмент в блок
  socialCommentsList.appendChild(socialCommentFragment);

  // скрываем ненужные элементы
  socialCommentCountElement.classList.add('hidden');
  commentsLoaderElement.classList.add('hidden');
};

export { renderComments };
