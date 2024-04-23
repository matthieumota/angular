import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PizzaComponent } from './pizza/pizza.component';
import { Pizza } from './models/pizza';
import { CounterComponent } from './counter/counter.component';
import { AuthorComponent } from './author/author.component';
import { User } from './models/user';
import { FormsModule } from '@angular/forms';

const PIZZAS: Pizza[] = [
  { id: 1, name: 'Reine', price: 12 },
  { id: 2, name: '4 fromages', price: 13 },
  { id: 3, name: 'Orientale', price: 11 },
  { id: 4, name: 'Cannibale', price: 9 }
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, PizzaComponent, CounterComponent, AuthorComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'pizzaparty';
  selectedPizza!: Pizza;
  pizzas: Pizza[] = PIZZAS;
  user: User = new User('Mota', 'Fiorella', '2019-12-31', 'https://i.pravatar.cc/150?u=fiorella');
  dates: Array<string> = User.dates();

  onSelect(pizza: Pizza): void {
    this.selectedPizza = pizza;
  }
}
