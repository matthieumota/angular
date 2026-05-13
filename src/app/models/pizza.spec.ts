import { Pizza } from './pizza';

describe('Pizza', () => {
  it('should create an instance', () => {
    const pizza = new Pizza(1, 'Margherita', 10);
    expect(pizza).toBeTruthy();
    expect(pizza.id).toBe(1);
    expect(pizza.name).toBe('Margherita');
    expect(pizza.price).toBe(10);
    expect(pizza.image).toBeUndefined();
  });
});
