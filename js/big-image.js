import { isEscapeKey } from './util.js';

// ищем блок большого фото
const bigPicture = document.querySelector('.big-picture');

// ищем шаблон и блок для вставки
const socialCommentTemplate = document.querySelector('#comment')
  .content
  .querySelector('.social__comment');

// ищем контейнер для комментариев .social__comments
const socialCommentsContainer = bigPicture.querySelector('.social__comments');

const showBigImage = (dataObject) => {

  // функция действий при нажатии кнопки Esc
  const onBigPictureEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeBigPicture();
    }
  };

  // функция открытия большого фото
  const openBigPicture = () => {
    bigPicture.classList.remove('hidden');
    document.body.classList.add('modal-open');
    // добавляем отслеживание нажатия кнопки Esc
    document.addEventListener('keydown', onBigPictureEscKeydown);
  };

  // функция очистки контейнера комментариев
  const clearSocialCommentsContainer = () => {
    socialCommentsContainer.innerHTML = '';
  };


  // функция закрытия большого фото
  function closeBigPicture () {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    // убираем отслеживание нажатия кнопки Esc
    document.removeEventListener('keydown', onBigPictureEscKeydown);
    // очищаем комментарии при закрытии окна
    clearSocialCommentsContainer();
  }

  // Действия для кнопки закрытия большого фото
  const bigPictureCancelButton = bigPicture.querySelector('.big-picture__cancel');

  bigPictureCancelButton.addEventListener('click', () => {
    closeBigPicture();
  });

  // ищем тег img в блоке .big-picture__img
  const bigPictureImg = bigPicture.querySelector('.big-picture__img')
    .querySelector('img');

  // заполняем для фото src и alt
  bigPictureImg.src = dataObject.url;
  bigPictureImg.alt = dataObject.description;

  // ищем .social__caption в блоке .big-picture__img
  const socialCaption = bigPicture.querySelector('.big-picture__social')
    .querySelector('.social__caption');

  // заполняем данные social__caption
  socialCaption.textContent = dataObject.description;

  // ищем .likes-count в блоке .big-picture__img
  const likeCount = bigPicture.querySelector('.big-picture__social')
    .querySelector('.likes-count');

  // заполняем данные social__likes
  likeCount.textContent = dataObject.likes;

  // ищем .comments-count в блоке .social__comment-count
  const commentCount = bigPicture.querySelector('.social__comment-count')
    .querySelector('.comments-count');

  // заполняем данные comments-count
  commentCount.textContent = dataObject.comments.length;

  // очищаем содержимое контейнера
  clearSocialCommentsContainer();

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
  socialCommentsContainer.appendChild(socialCommentFragment);

  // часть 7-2 № 3
  const socialCommentCount = bigPicture.querySelector('.social__comment-count');
  socialCommentCount.classList.add('hidden');

  const commentsLoader = bigPicture.querySelector('.comments-loader');
  commentsLoader.classList.add('hidden');

  // открываем большое фото
  openBigPicture();
};

export { showBigImage };
