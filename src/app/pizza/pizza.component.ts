import { Component, Input } from '@angular/core';
import { Pizza } from '../models/pizza';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pizza',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './pizza.component.html',
  styleUrl: './pizza.component.scss'
})
export class PizzaComponent {
  @Input(/*{ alias: 'toto' }*/) pizza!: Pizza;
}
