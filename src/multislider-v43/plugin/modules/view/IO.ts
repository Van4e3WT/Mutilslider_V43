import { MoveStyleAxis } from 'Plugin/custom-types';

import EventEmitter, { SubViewEvents } from '../utils/EventEmitter';

class IO extends EventEmitter {
  private postfix: string;

  private valueGroup: Array<{
    parent: HTMLDivElement,
    input: HTMLInputElement,
    hidden: HTMLSpanElement
  }>;

  private localeProps: Intl.NumberFormatOptions;

  private tooltipOfValue: boolean;

  constructor(props: {
    postfix?: string,
    localeProps?: Intl.NumberFormatOptions,
    tooltipOfValue?: boolean,
  }) {
    super();

    const {
      postfix = '',
      localeProps = {},
      tooltipOfValue = false,
    } = props;

    this.tooltipOfValue = tooltipOfValue;
    this.localeProps = { maximumFractionDigits: 10, ...localeProps };
    this.postfix = postfix;
    this.valueGroup = [];
  }

  public createGroup(props: {
    parent: HTMLDivElement,
    selector: string,
    isVertical?: boolean,
  }): void {
    const {
      postfix,
      valueGroup,
      tooltipOfValue,
    } = this;

    const {
      parent,
      selector,
      isVertical = false,
    } = props;

    const parentElement = document.createElement('div');
    parentElement.classList.add(selector);

    if (isVertical) {
      parentElement.classList.add(`${selector}_vertical`);
    }

    const inputElement = document.createElement('input');
    inputElement.type = 'text';
    inputElement.classList.add(`${selector}-input`);
    inputElement.readOnly = tooltipOfValue;

    if (tooltipOfValue) {
      inputElement.addEventListener('mousedown', this.preventDefault);
    }

    parentElement.appendChild(inputElement);

    if (postfix) {
      const postfixElement = document.createElement('span');
      postfixElement.classList.add(`${selector}-postfix`);
      postfixElement.textContent = postfix;
      parentElement.appendChild(postfixElement);
    }

    const hiddenElement = document.createElement('span');
    hiddenElement.classList.add(`${selector}-hidden`);
    valueGroup.push({
      parent: parentElement,
      input: inputElement,
      hidden: hiddenElement,
    });

    parent.appendChild(parentElement);
    parent.appendChild(hiddenElement);
  }

  public init(): void {
    const { valueGroup } = this;

    valueGroup.forEach((_value, i) => {
      valueGroup[i].input.addEventListener('input', this.handleInputUpdate.bind(this, i));
      window.addEventListener('load', this.handleInputUpdate.bind(this, i));
    });
  }

  public initEvents(): void {
    const { tooltipOfValue } = this;

    if (tooltipOfValue) return;

    this.getIOInputs().forEach((output, i) => {
      output.addEventListener('change', this.handleOutputChange.bind(this, i));
    });
  }

  public getIOParents(): Array<HTMLDivElement> {
    const { valueGroup } = this;

    return valueGroup.map((val) => val.parent);
  }

  public getIOInputs(): Array<HTMLInputElement> {
    const { valueGroup } = this;

    return valueGroup.map((val) => val.input);
  }

  public setIO(n: number, value: number): void {
    const { valueGroup, localeProps } = this;

    valueGroup[n].hidden.textContent = value.toLocaleString('ru', localeProps);
    valueGroup[n].input.value = valueGroup[n].hidden.textContent ?? '';
    valueGroup[n].input.style.width = `${valueGroup[n].hidden.offsetWidth + 2}px`;
  }

  public moveIO(props: { n: number, prop: MoveStyleAxis, value: number }): void {
    const { valueGroup, tooltipOfValue } = this;
    const { n, prop, value } = props;

    if (!tooltipOfValue) return;

    valueGroup[n].parent.style[prop] = `${value}px`;
  }

  private convertToValid = (token: string): string => {
    const newString = {
      ' ': '',
      ',': '.',
    }[token];

    return newString ?? '';
  };

  private handleInputUpdate = (i: number): void => {
    const { valueGroup } = this;
    const { value } = valueGroup[i].input;

    if (value) {
      valueGroup[i].hidden.textContent = value;
      valueGroup[i].input.style.width = `${valueGroup[i].hidden.offsetWidth + 2}px`;
    }
  };

  private calculateNewOutput = (n: number, value: number[]): void => {
    const newVal = this.getIOInputs()[n].value.replace(/\s|,/g, this.convertToValid);

    const isNewValue1Correct = Number(newVal) && n === 0;
    const isNewValue2Correct = Number(newVal) && n === 1;

    if (isNewValue1Correct) {
      this.emit(SubViewEvents.CHANGE_VALUE, { val1: Number(newVal) });
    } else if (isNewValue2Correct) {
      this.emit(SubViewEvents.CHANGE_VALUE, { val2: Number(newVal) });
    } else {
      this.setIO(n, value[n]);
    }
  };

  private handleOutputChange = (index: number): void => {
    this.emit(SubViewEvents.CALCULATE_VALUE, {
      handler: this.calculateNewOutput.bind(this, index),
    });
  };

  private preventDefault = (e: MouseEvent): void => {
    e.preventDefault();
  };
}

export default IO;
