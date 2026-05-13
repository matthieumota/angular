import { Component, inject, signal } from '@angular/core';
import { PizzaSelected } from '../../components/pizza-selected/pizza-selected';
import { Pizza } from '../../models/pizza';
import { PizzaRepository } from '../../services/pizza-repository';
import { delay, map, Observable } from 'rxjs';
import { Cart } from '../../services/cart';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule, PizzaSelected],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected pizza: Pizza = new Pizza(1, 'Reine', 12, '/assets/pizzas/reine.jpg');
  // Utilisation d'un signal pour la pizza sélectionnée (et renommage de la variable pour éviter les conflits)
  protected selectedPizza = signal<Pizza | null>(null);
  protected pizzas = signal<Pizza[]>([]);

  pizzaRepository = inject(PizzaRepository);
  protected pizzas$!: Observable<Pizza[]>;

  cart = inject(Cart);

  ngOnInit() {
    this.pizzas$ = this.pizzaRepository.getPizzas();

    this.pizzaRepository.getPizzas().pipe(
      delay(500),
      // repeat(3),
      map(pizzas => pizzas.map(pizza => ({ ...pizza, name: `${pizza.name} (${pizza.price * 1.2}€)` })))
    ).subscribe(pizzas => {
      console.log('Pizzas reçues :', pizzas);
      this.pizzas.update(current => [...current, ...pizzas]);
    });

    // setInterval(() => {
    //   this.withoutSignal++;
    //   this.withSignal.update(n => n + 1);
    // }, 1000);
  }

  onSelect(pizza: Pizza): void {
    console.log(pizza);
    this.pizza = { ...pizza }; // Crée une nouvelle instance de pizza pour éviter les problèmes de référence
    // this.selectedPizza.set({ ...pizza });

    this.pizzaRepository.getPizza(pizza.id).subscribe(pizza => {
      console.log('Pizza reçue :', pizza);
      this.selectedPizza.set(pizza);
    });
  }

  unSelect(name: string): void {
    alert(`Pizza ${name} annulée !`);
    this.selectedPizza.set(null);
  }

  addToCart(pizza: Pizza, event: Event): void {
    event.stopPropagation();
    this.cart.add(pizza);
  }
}
