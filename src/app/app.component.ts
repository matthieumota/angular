import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
import { PizzaService } from './services/pizza.service';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './services/message.service';
import { PizzaModule, TotoService } from './modules/pizza/pizza.module';

// Toujours possible de mettre ce tableau dans un fichier commun qu'on importe dans les composants...
export const exercices = [
  CounterComponent,
  AuthorComponent,
  IngredientListComponent,
  MenuComponent,
  TwowayComponent,
  MessagesComponent
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    // CommonModule,
    PizzaModule,
    // FormsModule,
    PizzaComponent,
    ...exercices
  ],
  // providers: [PizzaService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string = 'pizzaparty';
  selectedPizza!: Pizza | null;
  pizzas: Pizza[] = [];
  loading: boolean = false;

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

  constructor(
    private pizzaService: PizzaService,
    private messageService: MessageService,
    private totoService: TotoService
  ) {
    // Ce que fait Angular...
    // let component = new AppComponent(new PizzaService());
    // console.log(totoService);
  }

  // Code exécuté lorsque le composant est complétement initialisé
  ngOnInit() {
    this.loading = true;
    // Ici, on va attendre le résultat de la promesse
    this.pizzaService.getPizzasSlowly().then(
      pizzas => this.pizzas = pizzas
    ).finally(() => this.loading = false);
  }

  onSelect(pizza: Pizza): void {
    if (this.selectedPizza) {
      this.selectedPizza.ingredient = null;
    }

    if (this.selectedPizza === pizza) {
      this.selectedPizza = null;

      return;
    }

    this.selectedPizza = pizza;

    // Ce message est partagé à travers toute l'application grâce au service
    this.messageService.add(`Vous avez choisi ${this.selectedPizza.name}`);
  }

  onCancel(event: string) {
    // Pour être sûr que l'ingrédient ne reste pas "indéfiniment" sur la pizza
    if (this.selectedPizza) {
      this.selectedPizza.ingredient = null;
    }

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
