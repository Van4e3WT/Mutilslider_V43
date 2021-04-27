class AdaptiveInputView {
  private postfix: string;

  private groupValues: Array<{
    parent: HTMLDivElement,
    value: HTMLInputElement,
    hided: HTMLSpanElement
  }>;

  constructor(postfix = '') {
    this.postfix = postfix;
    this.groupValues = [];
  }

  public createGroup(props: {
    parent: HTMLDivElement,
    selector: string,
    isReadonly?: boolean
  }) {
    const {
      parent,
      selector,
      isReadonly = false,
    } = props;

    const groupElement = document.createElement('div');
    groupElement.classList.add(selector);

    const inputElement = document.createElement('input');
    inputElement.type = 'number';
    inputElement.classList.add(`${selector}-input`);
    inputElement.readOnly = isReadonly;
    groupElement.appendChild(inputElement);

    if (this.postfix) {
      const postfixElement = document.createElement('span');
      postfixElement.classList.add(`${selector}-postfix`);
      postfixElement.textContent = this.postfix;
      groupElement.appendChild(postfixElement);
    }

    const hidedElement = document.createElement('span');
    hidedElement.classList.add(`${selector}-hided`);
    this.groupValues.push({ parent: groupElement, value: inputElement, hided: hidedElement });

    parent.appendChild(groupElement);
    parent.appendChild(hidedElement);
  }

  public init() {
    function addInputEvents(i: number) {
      const { value } = this.groupValues[i].value;

      if (value) {
        this.groupValues[i].hided.textContent = value;
        this.groupValues[i].value.style.width = `${this.groupValues[i].hided.offsetWidth + 2}px`;
      }
    }
    this.groupValues.forEach((value, i) => {
      this.groupValues[i].value.addEventListener('input', addInputEvents.bind(this, i));
      window.addEventListener('load', addInputEvents.bind(this, i));
    });
  }

  public getValues() {
    return this.groupValues.map((val) => val.value);
  }

  public updateN(n: number, value) {
    this.groupValues[n].hided.textContent = value;
    this.groupValues[n].value.value = this.groupValues[n].hided.textContent;
    this.groupValues[n].value.style.width = `${this.groupValues[n].hided.offsetWidth + 2}px`;
  }

  public styleN(n: number, prop: string, value: number) {
    this.groupValues[n].parent.style[prop] = `${value}px`;
  }
}

export default AdaptiveInputView;
