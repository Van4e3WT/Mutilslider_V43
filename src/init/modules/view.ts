export {renderSlider};

function renderSlider(parent: HTMLDivElement | null): void {
  const sliderText = document.createElement('div');
  sliderText.classList.add('multislider-v43__values');

  const slidersInput = document.createElement('div');
  slidersInput.classList.add('multislider-v43__slider');

  let slider: Array<HTMLElement>;

  switch('double') {

    case 'double':
      const sliderLeft = document.createElement('input');
      sliderLeft.classList.add('multislider-v43__inputLeft');
      sliderLeft.type = 'slider';
      slider.push(sliderLeft);

      const sliderRight = document.createElement('input');
      sliderRight.classList.add('multislider-v43__inputRight');
      sliderRight.type = 'slider';
      slider.push(sliderRight);
      break;

    default:
      const sliderAlone = document.createElement('input');
      sliderLeft.classList.add('multislider-v43__inputLeft');
      sliderLeft.type = 'slider';
      slider.push(sliderAlone);
      break;
  }

}