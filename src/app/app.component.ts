import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PizzaComponent } from './pizza/pizza.component';
import { Pizza } from './models/pizza';

const PIZZAS: Pizza[] = [
  { id: 1, name: 'Reine', price: 12 },
  { id: 2, name: '4 fromages', price: 13 },
  { id: 3, name: 'Orientale', price: 11 },
  { id: 4, name: 'Cannibale', price: 9 }
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PizzaComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'pizzaparty';
  selectedPizza!: Pizza;
  pizzas: Pizza[] = PIZZAS;

  onSelect(pizza: Pizza): void {
    this.selectedPizza = pizza;
  }
}
