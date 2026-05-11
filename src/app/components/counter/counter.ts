import { Component, input, linkedSignal } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.html',
})
export class Counter {
  value = input<number>(0);
  protected count = linkedSignal(this.value);

  decrement(): void {
    if (this.count() > 0) {
      this.count.set(this.count() - 1);
    }
  }

  increment(): void {
    if (this.count() < 10) {
      this.count.update(n => n + 1);
    }
  }
}
