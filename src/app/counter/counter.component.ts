import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="d-flex align-items-center gap-4">
      <button class="btn btn-primary"
        (click)="increment(-1)"
        [disabled]="value <= 0"
      >-</button>
      <h2 class="mb-0">{{ value }}</h2>
      <button class="btn btn-primary"
        (click)="increment(1)"
        *ngIf="value < 10"
      >+</button>
    </div>
  `
})
export class CounterComponent {
  @Input() value: number = 0;

  increment(value: number): void {
    this.value += value;
  }
}
