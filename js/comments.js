import { clearContainer } from './util.js';

// поиск необходимых элементов на странице
const socialCommentTemplate = document.querySelector('#comment')
  .content
  .querySelector('.social__comment');
const bigPictureSocial = document.querySelector('.big-picture__social');
const socialCaption = bigPictureSocial.querySelector('.social__caption');
const likesCount = bigPictureSocial.querySelector('.likes-count');
const socialCommentCount = bigPictureSocial.querySelector('.social__comment-count');
const commentCount = socialCommentCount.querySelector('.comments-count');
const socialComments = bigPictureSocial.querySelector('.social__comments');
const commentsLoader = bigPictureSocial.querySelector('.comments-loader');

// функция генерации комментариев из данных
const renderComments = (dataObject) => {
  // заполняем данные social__caption
  socialCaption.textContent = dataObject.description;

  // заполняем данные likes-count
  likesCount.textContent = dataObject.likes;

  // заполняем данные comments-count
  commentCount.textContent = dataObject.comments.length;

  // очищаем содержимое socialComments
  clearContainer(socialComments);

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
  socialComments.appendChild(socialCommentFragment);

  // скрываем ненужные элементы
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
};

export { renderComments };
