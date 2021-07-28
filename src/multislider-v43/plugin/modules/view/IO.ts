import { MoveStyleAxis } from 'Plugin/modules/utils/custom-types';

class IO {
  private postfix: string;

  private valueGroup: Array<{
    parent: HTMLDivElement,
    input: HTMLInputElement,
    hidden: HTMLSpanElement
  }>;

  private localeProps: Intl.NumberFormatOptions;

  private tooltipOfValue: boolean;

  private tooltipIsHidden: boolean;

  constructor(props: {
    postfix: string | undefined,
    localeProps: Intl.NumberFormatOptions | undefined,
    tooltipOfValue: boolean | undefined,
    tooltipIsHidden: boolean | undefined,
  }) {
    const {
      postfix = '',
      localeProps = {},
      tooltipOfValue = false,
      tooltipIsHidden = false,
    } = props;

    this.tooltipOfValue = tooltipOfValue;
    this.tooltipIsHidden = tooltipIsHidden;
    this.localeProps = localeProps;
    this.postfix = postfix;
    this.valueGroup = [];
  }

  public createGroup(props: {
    parent: HTMLDivElement,
    selector: string,
    isVertical?: boolean,
  }) {
    const {
      postfix,
      valueGroup,
      tooltipOfValue,
      tooltipIsHidden,
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

    if (tooltipOfValue && !tooltipIsHidden) {
      parentElement.classList.add(`${selector}_visible`);
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

  public init() {
    const { valueGroup } = this;

    valueGroup.forEach((value, i) => {
      valueGroup[i].input.addEventListener('input', this.handleInputUpdate.bind(null, i));
      window.addEventListener('load', this.handleInputUpdate.bind(null, i));
    });
  }

  public initEvents(props: {
    setValue: (props: {
      val1?: number,
      val2?: number,
    }) => void,
    getValue: () => number[],
  }) {
    const { tooltipOfValue } = this;
    const { setValue, getValue } = props;

    if (!tooltipOfValue) {
      this.getIOInputs().forEach((output, i) => {
        output.addEventListener('change', this.handleOutputChange.bind(null, {
          n: i,
          getValue,
          setValue,
        }));
      });
    }
  }

  public getIOParents() {
    const { valueGroup } = this;

    return valueGroup.map((val) => val.parent);
  }

  public getIOInputs() {
    const { valueGroup } = this;

    return valueGroup.map((val) => val.input);
  }

  public setIO(n: number, value: number) {
    const { valueGroup, localeProps } = this;

    valueGroup[n].hidden.textContent = value.toLocaleString('ru', localeProps);
    valueGroup[n].input.value = valueGroup[n].hidden.textContent ?? '';
    valueGroup[n].input.style.width = `${valueGroup[n].hidden.offsetWidth + 2}px`;
  }

  public moveIO(props: { n: number, prop: MoveStyleAxis, value: number }) {
    const { valueGroup } = this;
    const { n, prop, value } = props;

    valueGroup[n].parent.style[prop] = `${value}px`;
  }

  private convertToValid = (symbol: string): string => {
    const newString = {
      ' ': '',
      ',': '.',
    }[symbol] ?? '';

    return newString;
  };

  private handleInputUpdate = (i: number) => {
    const { valueGroup } = this;
    const { value } = valueGroup[i].input;

    if (value) {
      valueGroup[i].hidden.textContent = value;
      valueGroup[i].input.style.width = `${valueGroup[i].hidden.offsetWidth + 2}px`;
    }
  };

  private handleOutputChange = (props: {
    n: number,
    getValue: () => number[],
    setValue: (props: {
      val1?: number,
      val2?: number,
    }) => void,
  }) => {
    const { n, getValue, setValue } = props;
    const newVal = this.getIOInputs()[n].value.replace(/\s|,/g, this.convertToValid);

    if (Number(newVal)) {
      if (n === 0) {
        setValue({ val1: Number(newVal) });
      } else {
        setValue({ val2: Number(newVal) });
      }
    } else {
      this.setIO(n, getValue()[n]);
    }
  };

  private preventDefault = (e: MouseEvent) => {
    e.preventDefault();
  };
}

export default IO;
