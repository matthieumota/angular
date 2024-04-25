import { Component, OnInit } from '@angular/core';
import { Pizza } from '../../models/pizza';
import { Ingredient } from '../../models/ingredient';
import { PizzaService } from '../../services/pizza.service';
import { MessageService } from '../../services/message.service';
import { finalize } from 'rxjs';
import { CommonModule } from '@angular/common';
import { PizzaComponent } from '../../pizza/pizza.component';
import { IngredientListComponent } from '../../ingredient-list/ingredient-list.component';

@Component({
  selector: 'app-pizzas-page',
  standalone: true,
  imports: [CommonModule, PizzaComponent, IngredientListComponent],
  templateUrl: './pizzas-page.component.html',
  styleUrl: './pizzas-page.component.scss'
})
export class PizzasPageComponent implements OnInit {
  selectedPizza!: Pizza | null;
  pizzas: Pizza[] = [];
  loading: boolean = false;
  
  ingredients: Array<Ingredient> = [
    { id: 1, name: 'Tomate', weight: 20, price: 0.50, image: '/assets/ingredients/tomate.png' },
    { id: 2, name: 'Avocat', weight: 60, price: 1.50, image: '/assets/ingredients/avocat.png' }
  ];

  constructor(
    private pizzaService: PizzaService,
    private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    this.loading = true;
    // Ici, on va attendre le résultat de la promesse
    // this.pizzaService.getPizzas().subscribe(pizzas => {
    //   this.pizzas = pizzas;
    //   this.loading = false;
    // });

    this.pizzaService.getPizzas().pipe(
      // Exécute le callback quoi qu'il arrive après le next ou l'error
      finalize(() => this.loading = false)
    ).subscribe({
      next: pizzas => this.pizzas = pizzas,
      error: (error) => console.log(error)
    });
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

  addPizza(input: HTMLInputElement): void {
    console.log(input);
    if (!input.value.trim()) return;

    this.pizzaService.create(input.value, 13).subscribe(
      pizza => {
        this.pizzas.push(pizza);
        input.value = '';
      }
    );
  }

  deletePizza(pizza: Pizza, event: Event): void {
    // Empêche le clic de se propager jusqu'aux parents
    event.stopPropagation();

    // debugger; // Pour un debug plus puissant que le console.log

    // Après le delete, on va devoir mettre à jour notre tableau.
    // Plusieurs solutions :
    // - Filtrer le tableau en gardant toutes les pizzas sauf celle supprimée
    // - Recharger les données de l'API
    // - Ou modifier le fake interceptor (splice au lieu de filter)
    this.pizzaService.delete(pizza).subscribe(
      () => this.pizzas = this.pizzas.filter(p => p.id !== pizza.id)
    );
  }

  addIngredientToSelectedPizza(ingredient: Ingredient): void {
    if (this.selectedPizza) {
      this.selectedPizza.ingredient = ingredient;
    }
  }
}
