class EventEmitter {

  _events: {[key: string]: Array<Function>};

  constructor() {
    this._events = {};
  }

  on(event: string, listener: Function) {
    (this._events[event] || (this._events[event] = [])).push(listener);
    return this;
  }

  emit(event: string, arg: object) {
    (this._events[event] || []).slice().forEach(listener => listener(arg));
  }
}