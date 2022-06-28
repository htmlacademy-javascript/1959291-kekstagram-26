import { createData } from './data.js';
import { createThumbnail } from './thumbnails.js';

// генерируем данные
const serverData = createData();

// добавляем данные на страницу
for (let i = 0; i < serverData.length; i++) {
  createThumbnail(serverData[i]);
}
