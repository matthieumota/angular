import { computed, Injectable, signal } from '@angular/core';
import { Pizza } from '../models/pizza';

@Injectable({
  providedIn: 'root',
})
export class Cart {
  items = signal<Pizza[]>([]);
  total = computed(() => this.items().reduce((acc, item) => acc + item.price, 0));
  count = computed(() => this.items().length);
  itemIds = computed(() => new Set(this.items().map(item => item.id)));

  total2 = computed(() => {
    let total = 0;
    for (const item of this.items()) {
      total += item.price;
    }
    return total;
  })

  add(pizza: Pizza) {
    const a = [1, 2, 3];
    a.push(4);
    const b = [...a, 4];

    this.items.update((items) => [...items, pizza]);
  }

  remove(pizza: Pizza) {
    this.items.update((items) => items.filter((item) => item.id !== pizza.id));
  }

  clear() {
    this.items.set([]);
  }
}
