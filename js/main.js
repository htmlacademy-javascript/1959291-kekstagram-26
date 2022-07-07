import { createDataObjects } from './data.js';
import { createThumbnails } from './thumbnails.js';
import { addFormChangeHandler } from './form.js';
import { addFormValidation } from './form-validation.js';
import { addPreviewFunctional  } from './form-picture.js';

// генерируем данные
const serverData = createDataObjects();

// добавляем данные на страницу
createThumbnails(serverData);

// добавляем отслеживание изменения состояния ввода данных (открытие формы при изменении)
addFormChangeHandler();

// добавляем валидацию формы
addFormValidation();

// добавляем масштаб и эффекты для превью фото
addPreviewFunctional();
