abstract class EventEmitter {
  private events: { [key: string]: Array<Function> };

  constructor() {
    this.events = {};
  }

  on(event: string, listener: Function) {
    const { events } = this;

    (events[event] || (events[event] = [])).push(listener);

    return this;
  }

  emit(event: string, arg: object) {
    const { events } = this;

    (events[event] || []).forEach((listener) => listener(arg));
  }
}

export default EventEmitter;
