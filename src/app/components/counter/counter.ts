import { Component, input, linkedSignal, model } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.html',
})
export class Counter {
  value = model(0);

  initialValue = input(0);
  realValue = linkedSignal(() => this.initialValue());

  decrement(): void {
    if (this.realValue() > 0) {
      this.realValue.set(this.realValue() - 1);
    }
  }

  increment(): void {
    if (this.realValue() < 10) {
      this.realValue.update(old => old + 1);
    }
  }
}
