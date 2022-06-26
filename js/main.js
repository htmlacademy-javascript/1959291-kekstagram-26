import {createData} from './data.js';
import {createThumbnails} from './thumbnails.js';

// генерируем данные
const inputData = createData();

// добавляем данные на страницу
createThumbnails(inputData);
