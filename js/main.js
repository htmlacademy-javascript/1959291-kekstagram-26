import { createData } from './data.js';
import { createThumbnails } from './thumbnails.js';
// import { addFormChangeHandler2 } from './upload-form.js';

// генерируем данные
const serverData = createData();

// добавляем данные на страницу
createThumbnails(serverData);

