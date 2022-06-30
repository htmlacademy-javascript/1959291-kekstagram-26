import { createData } from './data.js';
import { createThumbnails } from './thumbnails.js';
import { addFormChangeHandler, formValidation } from './upload-form.js';

// генерируем данные
const serverData = createData();

// добавляем данные на страницу
createThumbnails(serverData);

// добавляем отслеживание изменения состояния ввода данных
addFormChangeHandler();

// добавляем валидацию формы
formValidation();
