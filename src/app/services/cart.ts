import { computed, effect, Injectable, signal } from '@angular/core';
import { Pizza } from '../models/pizza';

export type CartItem = {
  pizza: Pizza;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class Cart {
  items = signal<CartItem[]>((() => {
    try {
      return JSON.parse(localStorage.getItem('items') ?? '[]');
    } catch {
      return [];
    }
  })());

  constructor() {
    effect(() => {
      try {
        localStorage.setItem('items', JSON.stringify(this.items()));
      } catch {}
    });
  }

  total = computed(() => this.items().reduce((acc, item) => acc + item.pizza.price * item.quantity, 0));
  count = computed(() => this.items().reduce((acc, item) => acc + item.quantity, 0));
  itemIds = computed(() => new Set(this.items().map(item => item.pizza.id)));

  total2 = computed(() => {
    let total = 0;
    for (const item of this.items()) {
      total += item.pizza.price * item.quantity;
    }
    return total;
  });

  add(pizza: Pizza) {
    // const a = [1, 2, 3];
    // a.push(4);
    // const b = [...a, 4];
    // this.items().push(pizza);
    // this.items.set(this.items());

    this.items.update((items) => {
      if (!this.itemIds().has(pizza.id)) {
        return [...items, { pizza, quantity: 1 }]
      } else {
        return items.map((item) => item.pizza.id === pizza.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
    });
  }

  remove(pizza: Pizza) {
    this.items.update((items) =>
      items
        .map(item => item.pizza.id === pizza.id ? { ...item, quantity: item.quantity - 1 } : item)
        .filter(item => item.quantity > 0)
    );
  }

  clear() {
    this.items.set([]);
  }
}
