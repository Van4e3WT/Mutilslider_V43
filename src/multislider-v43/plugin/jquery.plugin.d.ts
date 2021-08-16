interface JQuery {
  multislider: Function & {
    value?: (values: { val1?: number, val2?: number }) => Array<number>,
    onChange?: (callback: Function, ...args: Array<unknown>) => void,
  };
}
