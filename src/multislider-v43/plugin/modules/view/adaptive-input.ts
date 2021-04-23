class AdaptiveInput {
  private values: Array<HTMLInputElement>;

  private valuesHided: Array<HTMLSpanElement>;

  constructor() {
    this.values = [];
    this.valuesHided = [];
  }

  public createGroup(addedClasses: string, value: number, isReadonly = false) {
    const inputElement = document.createElement('input');
    inputElement.type = 'number';
    inputElement.classList.add(addedClasses);
    inputElement.value = `${value}`;
    inputElement.readOnly = isReadonly;
    this.values.push(inputElement);

    const spanElement = document.createElement('span');
    spanElement.classList.add(`${addedClasses}-hided`);
    this.valuesHided.push(spanElement);

    return {
      input: inputElement,
      span: spanElement,
    };
  }

  public init() {
    function addInputEvents(i: number) {
      const { value } = this.values[i];

      if (value) {
        this.valuesHided[i].textContent = value;
        this.values[i].style.width = `${this.valuesHided[i].offsetWidth}px`;
      }
    }
    this.values.forEach((value, i) => {
      this.values[i].addEventListener('input', addInputEvents.bind(this, i));
      window.addEventListener('load', addInputEvents.bind(this, i));
    });
  }

  public getValues() {
    return this.values;
  }

  public updateN(n: number, value) {
    this.valuesHided[n].textContent = value;
    this.values[n].value = this.valuesHided[n].textContent;
    this.values[n].style.width = `${this.valuesHided[n].offsetWidth}px`;
  }

  public styleN(n: number, prop: string, value: number) {
    this.values[n].style[prop] = `${value}px`;
  }
}

export default AdaptiveInput;
