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
  CHANGE_VALUE = 'MODEL/CHANGE_VALUE',
}

enum ViewEvents {
  CHANGE_VALUE = 'VIEW/CHANGE_VALUE',
  CALCULATE_VALUE = 'VIEW/CALCULATE_VALUE',
}

enum SubViewEvents {
  CHANGE_VALUE = 'SUBVIEW/CHANGE_VALUE',
  CALCULATE_VALUE = 'SUBVIEW/CALCULATE_VALUE',
}

export { ModelEvents, ViewEvents, SubViewEvents };
export default EventEmitter;
