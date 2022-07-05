// ************************ часть 2.1 Масштаб ***********************************************

// необходимые элементы
const imgUploadForm = document.querySelector('.img-upload__form');
const scaleControlSmallerElement = imgUploadForm.querySelector('.scale__control--smaller');
const scaleControlBiggerElement = imgUploadForm.querySelector('.scale__control--bigger');
const scaleControlValueElement = imgUploadForm.querySelector('.scale__control--value');
const imgUploadPreviewElement = imgUploadForm.querySelector('.img-upload__preview')
  .querySelector('img');
const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const DEFAULT_SCALE_VALUE = 100;
const SCALE_VALUE_STEP = 25;
let scaleValue = DEFAULT_SCALE_VALUE;

// ************************ часть 2.2 Наложение эффекта на изображение ***********************************************
const effectLevelValueElement = imgUploadForm.querySelector('.effect-level__value');
const effectsListElement = imgUploadForm.querySelector('.effects__list');
const imgUploadEffectLevelElement = imgUploadForm.querySelector('.img-upload__effect-level');
const effectLevelSliderElement = imgUploadForm.querySelector('.effect-level__slider');

// состояния слайдера для всех эффектов
const SLIDER_EFFECT_PARAMETERS = {
  'chrome': {range: {min: 0, max: 1}, start: 1, step: 0.1}, /* filter: grayscale(0..1) с шагом 0.1 */
  'sepia': {range: {min: 0, max: 1}, start: 1, step: 0.1}, /* filter: sepia(0..1) с шагом 0.1 */
  'marvin' : {range: {min: 0, max: 100}, start: 100, step: 1}, /* filter: invert(0..100%) с шагом 1% */
  'phobos': {range: {min: 0, max: 3}, start: 3, step: 0.1}, /* filter: blur(0..3px) с шагом 0.1px */
  'heat': {range: {min: 1, max: 3}, start: 3, step: 0.1}, /* filter: brightness(1..3) с шагом 0.1 */
};

// типы фильтров для эффектов
const FILTER_EFFECT_TYPES = {
  'chrome': 'grayscale', /* filter: grayscale(0..1) */
  'sepia': 'sepia', /* filter: sepia(0..1)*/
  'marvin': 'invert', /* filter: invert(0..100%)*/
  'phobos': 'blur',  /* filter: blur(0..3px)*/
  'heat': 'brightness', /* filter: brightness(1..3) */
};

// функция изменения свойств элементов
const changeScale = () => {
  imgUploadPreviewElement.style.transform = `scale(${scaleValue/100})`;
  scaleControlValueElement.value = `${scaleValue} %`;
};

// функция увеличения значения scaleValue
const increaseScaleValue = () => {
  if (scaleValue + SCALE_VALUE_STEP <= MAX_SCALE_VALUE) {
    scaleValue += SCALE_VALUE_STEP;
    changeScale();
  }
};

// функция уменьшения значения scaleValue
const decreaseScaleValue = () => {
  if (scaleValue - SCALE_VALUE_STEP >= MIN_SCALE_VALUE) {
    scaleValue -= SCALE_VALUE_STEP;
    changeScale();
  }
};

const addImgUploadPreviewScale = () => {
  // добавляем  начальное состояние scale для фото
  changeScale();

  // добавляем функционал кнопок
  scaleControlSmallerElement.addEventListener('click', decreaseScaleValue);
  scaleControlBiggerElement.addEventListener('click', increaseScaleValue);
};

const hideSlider = () => {
  imgUploadEffectLevelElement.classList.add('hidden');

  // обнуляем значение эффекта в поле формы
  effectLevelValueElement.value = '';

  // убираем стиль фильтр из превью
  imgUploadPreviewElement.style.removeProperty('filter');
};

const showSlider = () => {
  imgUploadEffectLevelElement.classList.remove('hidden');
};

// создаем слайдер с помощью oUiSlider
noUiSlider.create(effectLevelSliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
  format: {
    to: (value) => {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: (value) => parseFloat(value),
  },
});

// функция добавления фильтра и его значения для превью фото
const addEffectPreviewFilter = (filter, filterValue) => {
  if (filter === 'phobos') {
    imgUploadPreviewElement.style.filter = `${FILTER_EFFECT_TYPES[filter]}(${filterValue}px)`;
    // записываем значение слайдера в поле ввода
    effectLevelValueElement.value = `${filterValue}px`;
    return;
  }
  if (filter === 'marvin') {
    imgUploadPreviewElement.style.filter = `${FILTER_EFFECT_TYPES[filter]}(${filterValue}%)`;
    effectLevelValueElement.value = `${filterValue}%`;
    return;
  }
  imgUploadPreviewElement.style.filter = `${FILTER_EFFECT_TYPES[filter]}(${filterValue})`;
  effectLevelValueElement.value = `${filterValue}`;
};

// функция добавления класса для превью фото
const addEffectPreviewClass = (str) => {
  imgUploadPreviewElement.classList.add(`effects__preview--${str}`);
};

const addSlider = (data) => {
  if (data.value === 'none') {
    // скрываем слайдер
    hideSlider();
  } else {
    // обновляем параметры шкалы слайдера
    effectLevelSliderElement.noUiSlider.updateOptions(SLIDER_EFFECT_PARAMETERS[`${data.value}`]);

    // показываем слайдер
    showSlider();

    // добавляем класс картинке превью
    addEffectPreviewClass(data.value);

    // добавляем стиль картинке превью
    addEffectPreviewFilter(data.value, effectLevelSliderElement.noUiSlider.get());

    // обновляем данные в поле ввода формы
    effectLevelValueElement.value = effectLevelSliderElement.noUiSlider.get();

    // при изменении слайдера добавляем стиль картинке превью
    effectLevelSliderElement.noUiSlider.on('update', () => {
      addEffectPreviewFilter(data.value, effectLevelSliderElement.noUiSlider.get());
    });
  }
};

const addPreviewEffects = () => {
  // событие на клик по списку эффектов
  effectsListElement.addEventListener('click', (evt) => {
    // если клик на эффект
    if (evt.target.name === 'effect') {
      imgUploadPreviewElement.removeAttribute('class');
      addSlider(evt.target);
    }
  });
};

const addPreviewFunctional = () => {
  addImgUploadPreviewScale();
  addPreviewEffects();
};

export { addPreviewFunctional , hideSlider };
