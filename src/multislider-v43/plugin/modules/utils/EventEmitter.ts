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

enum ModelEvents {
  VALUE_CHANGED = 'VALUE_CHANGED',
}

enum ViewEvents {
  VALUE_CHANGED = 'VALUE_CHANGED',
  BODY_CLICKED = 'BODY_CLICKED',
}

enum SubViewEvents {
  VALUE_CHANGED = 'VALUE_CHANGED',
}

export { ModelEvents, ViewEvents, SubViewEvents };
export default EventEmitter;
