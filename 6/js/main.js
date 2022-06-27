import { createData } from './data.js';
import { createThumbnails } from './thumbnails.js';
import { renderGallery } from './gallery.js';

// генерируем данные
const serverData = createData();

// добавляем данные на страницу
createThumbnails(serverData);

// добавляем возможность показать большую картинку
renderGallery(serverData);
