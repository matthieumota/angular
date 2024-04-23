import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

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
  @Output() incremented: EventEmitter<number> = new EventEmitter();

  @Output() valueChange: EventEmitter<number> = new EventEmitter();

  increment(value: number): void {
    this.value += value;

    this.incremented.emit(value);
    this.valueChange.emit(this.value);
  }
}
