import { getData } from './api.js';
import { createThumbnails } from './thumbnails.js';
import { addFormChangeHandler } from './form.js';
import { addPreviewFunctional } from './form-picture.js';
import { addFormValidation } from './form-validation.js';
import { showAlert } from './util.js';
import { showFilters, addFilters } from './sorting.js';

getData(
  (serverData) => {
    createThumbnails(serverData);
    addFilters(serverData);
  },
  () => {
    showAlert('Не удалось загрузить данные с сервера. Попробуйте позже');
  }
);

// фильтры покажутся только после загрузки страницы
window.onload = () => showFilters();

// добавляем отслеживание изменения состояния ввода данных (открытие формы при изменении)
addFormChangeHandler();

// добавляем валидацию формы
addFormValidation();


// добавляем масштаб и эффекты для превью фото
addPreviewFunctional();
