import EventEmitter from './eventEmitter';
import { ISliderModel, ISliderView } from './interfaces';
import type { Config } from './customTypes';

// ======================================
//              Double Slider
// ======================================
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default class SliderView extends EventEmitter implements ISliderView {
  model: ISliderModel;

  outputValues: Array<HTMLDivElement>;

  sliderThumbs: Array<HTMLDivElement>;

  sliderRange: HTMLDivElement;

  parentThumbs: HTMLDivElement;

  constructor(model: ISliderModel, parent: HTMLDivElement, cfg: Config) {
    super();

    this.model = model;
    this.outputValues = [];
    this.sliderThumbs = [];

    if (cfg.orientation === 'vertical') {
      parent.classList.add('vertical');
    }

    const sliderHeader = document.createElement('div');
    sliderHeader.classList.add('multislider-v43-header');
    parent.appendChild(sliderHeader);

    const sliderDescription = document.createElement('div');
    sliderDescription.classList.add('multislider-v43-header__description');
    sliderDescription.innerText = cfg.description ?? '';
    sliderHeader.appendChild(sliderDescription);

    const sliderOutput = document.createElement('div');
    sliderOutput.classList.add('multislider-v43-header__output');
    sliderHeader.appendChild(sliderOutput);

    const sliderValueFirst = document.createElement('div');
    sliderValueFirst.classList.add('multislider-v43-header__value');
    sliderValueFirst.innerText = `${cfg.minValue}`;
    sliderOutput.appendChild(sliderValueFirst);
    this.outputValues.push(sliderValueFirst);

    if (model.thumbs.length === 2) {
      const sliderSpacer = document.createElement('div');
      sliderSpacer.classList.add('multislider-v43-header__spacer');
      sliderSpacer.innerText = '\xa0–\xa0';
      sliderOutput.appendChild(sliderSpacer);

      const sliderValueSecond = document.createElement('div');
      sliderValueSecond.classList.add('multislider-v43-header__value');
      sliderValueSecond.innerText = `${cfg.maxValue}`;
      sliderOutput.appendChild(sliderValueSecond);
      this.outputValues.push(sliderValueSecond);
    }

    const sliderBody = document.createElement('div');
    sliderBody.classList.add('multislider-v43-body');
    parent.appendChild(sliderBody);
    this.parentThumbs = sliderBody;

    const sliderThumbFirst = document.createElement('div');
    sliderThumbFirst.classList.add('multislider-v43-body__thumb');
    sliderBody.appendChild(sliderThumbFirst);
    this.sliderThumbs.push(sliderThumbFirst);

    if (cfg.isProgressBar || (cfg.sliderType === 'double')) {
      const sliderRange = document.createElement('div');
      sliderRange.classList.add('multislider-v43-body__range');
      sliderBody.appendChild(sliderRange);
    }

    if (cfg.sliderType === 'double') {
      const sliderThumbSecond = document.createElement('div');
      sliderThumbSecond.classList.add('multislider-v43-body__thumb');
      sliderBody.appendChild(sliderThumbSecond);
      this.sliderThumbs.push(sliderThumbSecond);
    }

    this.update();
  }

  update() {
    const thumbsValues = this.model.getValue();

    this.sliderThumbs[0].style.bottom = `${this.parentThumbs.getBoundingClientRect().height * ((thumbsValues[0].value - thumbsValues[0].min) / (thumbsValues[0].max - thumbsValues[0].min))}px`;
    this.outputValues[0].innerText = `${thumbsValues[0].value}`;
    // надо будет еще добавить ограничители значения присвоения value в пределах от 0px, до val1px;

    this.sliderThumbs[1].style.bottom = `${(this.parentThumbs.getBoundingClientRect().height * ((thumbsValues[1].value - thumbsValues[1].min) / (thumbsValues[1].max - thumbsValues[1].min)) - 30)}px`;
    this.outputValues[1].innerText = `${thumbsValues[1].value}`;
    // в дальнейшем можно [axis], где axis: string = 'top' | 'bottom'
    // сюда же можно сделать вычисление с учетом step, а вместо деления нацело юзать ~~
    // здесь необходимо обратиться к модели, получить данные текущих значений бегунков
    // после этого обновить блоки output value и задать новое положение бегункам,
    // а также пересчитать размер и положение прогресс-бара
  }
}
