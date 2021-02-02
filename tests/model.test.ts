import { swap } from '../src/init/modules/model';

test('Sum should be swapped params', () => {
  expect(swap(1, 3)[0]).toBe(3);
  expect(swap(1, 3)[1]).toBe(1);
});
