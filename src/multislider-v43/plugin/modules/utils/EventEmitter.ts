abstract class EventEmitter {
  private events: { [key: string]: Array<Function> };

  constructor() {
    this.events = {};
  }

  on(event: string, listener: Function): EventEmitter {
    const { events } = this;

    (events[event] || (events[event] = [])).push(listener);

    return this;
  }

  emit(event: string, arg: object): void {
    const { events } = this;

    (events[event] || []).forEach((listener) => listener(arg));
  }
}

enum EventTypes {
  VALUE_CHANGED = 'VALUE_CHANGED',
}

export { EventTypes };
export default EventEmitter;
