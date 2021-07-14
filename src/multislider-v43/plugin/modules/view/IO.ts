import { MoveStyleAxis } from 'Plugin/modules/utils/custom-types';

class IO {
  private postfix: string;

  private groupValues: Array<{
    parent: HTMLDivElement,
    input: HTMLInputElement,
    hided: HTMLSpanElement
  }>;

  private localeProps: Intl.NumberFormatOptions;

  constructor(props: {
    postfix: string | undefined,
    localeProps: Intl.NumberFormatOptions | undefined
  }) {
    const { postfix = '', localeProps = {} } = props;

    this.localeProps = localeProps;
    this.postfix = postfix;
    this.groupValues = [];
  }

  public createGroup(props: {
    parent: HTMLDivElement,
    selector: string,
    isReadonly?: boolean,
    isHided?: boolean,
    isVertical?: boolean,
  }) {
    const { postfix, groupValues } = this;
    const {
      parent,
      selector,
      isReadonly = false,
      isHided = true,
      isVertical = false,
    } = props;

    const groupElement = document.createElement('div');
    groupElement.classList.add(selector);

    if (isVertical) {
      groupElement.classList.add(`${selector}_vertical`);
    }

    if (isReadonly && !isHided) {
      groupElement.classList.add(`${selector}_visible`);
    }

    const inputElement = document.createElement('input');
    inputElement.type = 'text';
    inputElement.classList.add(`${selector}-input`);
    inputElement.readOnly = isReadonly;
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
