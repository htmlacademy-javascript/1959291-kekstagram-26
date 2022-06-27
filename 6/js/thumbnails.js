const createThumbnails = (dataObjects) => {

  // ищем блок для вставки изображений
  const otherUserPictures = document.querySelector('.pictures');

  // ищем шаблон и блок для вставки
  const otherUserPicturesTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  // создаем фрагмент для наполнения
  const dataObjectsFragment = document.createDocumentFragment();

  // наполняем фрагмент данными
  dataObjects.forEach(({url, likes, comments, description}) => {
    const photoElement = otherUserPicturesTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = url;
    photoElement.querySelector('.picture__img').alt = description;
    photoElement.querySelector('.picture__likes').textContent = likes;
    photoElement.querySelector('.picture__comments').textContent = comments.length;
    dataObjectsFragment.appendChild(photoElement);
  });

  // добавляем фрагмент в блок
  otherUserPictures.appendChild(dataObjectsFragment);
};

export {createThumbnails};
