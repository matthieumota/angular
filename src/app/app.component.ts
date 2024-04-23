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
import { TwowayComponent } from './twoway/twoway.component';

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
  MenuComponent,
  TwowayComponent
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
  selectedPizza!: Pizza | null;
  pizzas: Pizza[] = PIZZAS;

  user: User = new User('Mota', 'Fiorella', '2019-12-31', 'https://i.pravatar.cc/150?u=fiorella');
  dates: Array<string> = User.dates();

  ingredients: Array<Ingredient> = [
    { id: 1, name: 'Tomate', weight: 20, price: 0.50, image: '/assets/ingredients/tomate.png' },
    { id: 2, name: 'Avocat', weight: 60, price: 1.50, image: '/assets/ingredients/avocat.png' }
  ];

  numbers: number[] = [1, 2, 3];
  letters: string[] = ['a', 'b', 'c'];

  // Le total pour les compteurs
  total: number = 20; // 5 + 0 + 15 par rapport à mes compteurs

  onSelect(pizza: Pizza): void {
    if (this.selectedPizza) {
      this.selectedPizza.ingredient = null;
    }

    if (this.selectedPizza === pizza) {
      this.selectedPizza = null;

      return;
    }

    this.selectedPizza = pizza;
  }

  onCancel(event: string) {
    console.log(event);
    if (event === 'Annuler') {
      this.selectedPizza = null;
    } else if (event === 'Suivant') {
      // Pizza 3
      let currentId = this.selectedPizza ? this.selectedPizza.id : 0;
      // On cherche la pizza 4
      let nextPizza = this.pizzas.find((pizza) => pizza.id === currentId + 1);
      if (! nextPizza) { // Si la pizza 4 n'existe pas, on prend la première pizza
        nextPizza = this.pizzas[0];
      }
      this.selectedPizza = nextPizza;
    }
  }

  incrementTotal(value: number): void {
    this.total += value;
  }

  addIngredientToSelectedPizza(ingredient: Ingredient): void {
    if (this.selectedPizza) {
      this.selectedPizza.ingredient = ingredient;
    }
  }
}
