import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-twoway',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p (click)="valueChange.emit('NEW')">{{ value }}</p>

    <ul>
      <li *ngFor="let item of array">
        <span (click)="remove(item)">{{ item }}</span>
      </li>
    </ul>
    <button (click)="add()">Ajouter</button>
  `,
})
export class TwowayComponent {
  @Input() value!: string;
  @Output() valueChange: EventEmitter<string> = new EventEmitter();

  @Input() array!: any[];
  @Output() arrayChange: EventEmitter<any[]> = new EventEmitter();

  remove(item: any) {
    this.arrayChange.emit(this.array.filter(el => el !== item));
  }

  add() {
    this.arrayChange.emit([ ...this.array, 18 ]);
  }
}
