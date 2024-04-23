import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PizzaComponent } from './pizza/pizza.component';
import { Pizza } from './models/pizza';
import { CounterComponent } from './counter/counter.component';
import { AuthorComponent } from './author/author.component';
import { User } from './models/user';
import { FormsModule } from '@angular/forms';
import { Ingredient } from './models/ingredient';
import { IngredientListComponent } from './ingredient-list/ingredient-list.component';
import { MenuComponent } from './menu/menu.component';

const PIZZAS: Pizza[] = [
  { id: 1, name: 'Reine', price: 12, image: '/assets/pizzas/reine.jpg' },
  { id: 2, name: '4 fromages', price: 13, image: '/assets/pizzas/4-fromages.jpg' },
  { id: 3, name: 'Orientale', price: 11, image: '/assets/pizzas/orientale.jpg' },
  { id: 4, name: 'Cannibale', price: 9, image: '/assets/pizzas/cannibale.jpg' }
];

// Toujours possible de mettre ce tableau dans un fichier commun qu'on importe dans les composants...
export const exercices = [
  CounterComponent,
  AuthorComponent,
  IngredientListComponent,
  MenuComponent
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PizzaComponent,
    ...exercices
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'pizzaparty';
  selectedPizza!: Pizza;
  pizzas: Pizza[] = PIZZAS;

  user: User = new User('Mota', 'Fiorella', '2019-12-31', 'https://i.pravatar.cc/150?u=fiorella');
  dates: Array<string> = User.dates();

  ingredients: Array<Ingredient> = [
    { id: 1, name: 'Tomate', weight: 20, price: 0.50, image: 'tomate.png' },
    { id: 2, name: 'Avocat', weight: 60, price: 1.50, image: 'avocat.png' }
  ];

  onSelect(pizza: Pizza): void {
    this.selectedPizza = pizza;
  }
}
