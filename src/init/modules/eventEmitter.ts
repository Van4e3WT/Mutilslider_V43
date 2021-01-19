export default class EventEmitter {
  events: { [key: string]: Array<Function> };

  constructor() {
    this.events = {};
  }

  on(event: string, listener: Function) {
    (this.events[event] || (this.events[event] = [])).push(listener);
    return this;
  }

  emit(event: string, arg: object) {
    (this.events[event] || []).slice().forEach((listener) => listener(arg));
  }
}
