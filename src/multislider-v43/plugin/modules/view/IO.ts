import { MoveStyleAxis } from 'Plugin/modules/utils/custom-types';

class IO {
  private postfix: string;

  private groupValues: Array<{
    parent: HTMLDivElement,
    input: HTMLInputElement,
    hided: HTMLSpanElement
  }>;

  private localeProps: Intl.NumberFormatOptions;

  private tooltipOfValue: boolean;

  private tooltipIsHided: boolean;

  constructor(props: {
    postfix: string | undefined,
    localeProps: Intl.NumberFormatOptions | undefined,
    tooltipOfValue: boolean | undefined,
    tooltipIsHided: boolean | undefined,
  }) {
    const {
      postfix = '',
      localeProps = {},
      tooltipOfValue = false,
      tooltipIsHided = false,
    } = props;

    this.tooltipOfValue = tooltipOfValue;
    this.tooltipIsHided = tooltipIsHided;
    this.localeProps = localeProps;
    this.postfix = postfix;
    this.groupValues = [];
  }

  public createGroup(props: {
    parent: HTMLDivElement,
    selector: string,
    isVertical?: boolean,
  }) {
    const {
      postfix,
      groupValues,
      tooltipOfValue,
      tooltipIsHided,
    } = this;

    const {
      parent,
      selector,
      isVertical = false,
    } = props;

    const preventDefault = (e: MouseEvent) => {
      e.preventDefault();
    };

    const groupElement = document.createElement('div');
    groupElement.classList.add(selector);

    if (isVertical) {
      groupElement.classList.add(`${selector}_vertical`);
    }

    if (tooltipOfValue && !tooltipIsHided) {
      groupElement.classList.add(`${selector}_visible`);
    }

    const inputElement = document.createElement('input');
    inputElement.type = 'text';
    inputElement.classList.add(`${selector}-input`);
    inputElement.readOnly = tooltipOfValue;

    if (tooltipOfValue) {
      inputElement.addEventListener('mousedown', preventDefault);
    }

    groupElement.appendChild(inputElement);

    if (postfix) {
      const postfixElement = document.createElement('span');
      postfixElement.classList.add(`${selector}-postfix`);
      postfixElement.textContent = postfix;
      groupElement.appendChild(postfixElement);
    }

    const hidedElement = document.createElement('span');
    hidedElement.classList.add(`${selector}-hided`);
    groupValues.push({
      parent: groupElement,
      input: inputElement,
      hided: hidedElement,
    });

    parent.appendChild(groupElement);
    parent.appendChild(hidedElement);
  }

  public init() {
    const { groupValues } = this;

    function handleInputUpdate(i: number) {
      const { value } = groupValues[i].input;

      if (value) {
        groupValues[i].hided.textContent = value;
        groupValues[i].input.style.width = `${groupValues[i].hided.offsetWidth + 2}px`;
      }
    }

    groupValues.forEach((value, i) => {
      groupValues[i].input.addEventListener('input', handleInputUpdate.bind(this, i));
      window.addEventListener('load', handleInputUpdate.bind(this, i));
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

    const convertToValid = (symbol: string): string => {
      const newString = {
        ' ': '',
        ',': '.',
      }[symbol] ?? '';

      return newString;
    };

    const handleOutputChange = (n: number) => {
      const newVal = this.getIOInputs()[n].value.replace(/\s|,/g, convertToValid);

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

    if (!tooltipOfValue) {
      this.getIOInputs().forEach((output, i) => {
        output.addEventListener('change', handleOutputChange.bind(this, i));
      });
    }
  }

  public getIOparents() {
    const { groupValues } = this;

    return groupValues.map((val) => val.parent);
  }

  public getIOInputs() {
    const { groupValues } = this;

    return groupValues.map((val) => val.input);
  }

  public setIO(n: number, value: number) {
    const { groupValues, localeProps } = this;

    groupValues[n].hided.textContent = value.toLocaleString('ru', localeProps);
    groupValues[n].input.value = groupValues[n].hided.textContent ?? '';
    groupValues[n].input.style.width = `${groupValues[n].hided.offsetWidth + 2}px`;
  }

  public moveIO(props: { n: number, prop: MoveStyleAxis, value: number }) {
    const { groupValues } = this;
    const { n, prop, value } = props;

    groupValues[n].parent.style[prop] = `${value}px`;
  }
}

export default IO;
