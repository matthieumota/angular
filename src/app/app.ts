import { Component, inject, OnInit, signal } from '@angular/core';
import { Pizza } from './models/pizza';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PizzaSelected } from './components/pizza-selected/pizza-selected';
import { Counter } from './components/counter/counter';
import { Author } from './components/author/author';
import { User } from './models/user';
import { PizzaRepository } from './services/pizza-repository';
import { delay, map, Observable, repeat } from 'rxjs';
import { Cart } from './services/cart';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule, PizzaSelected, Counter, Author, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected title: string = 'Pizza Party';
  protected pizza: Pizza = new Pizza(1, 'Reine', 12, '/assets/pizzas/reine.jpg');
  // Utilisation d'un signal pour la pizza sélectionnée (et renommage de la variable pour éviter les conflits)
  protected selectedPizza = signal<Pizza | null>(null);
  protected pizzas = signal<Pizza[]>([]);

  protected withoutSignal: number = 0;
  protected withSignal = signal(0);

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

  protected author = new User('Jean', 'Dupont', '1990-06-15', 'https://i.pravatar.cc/100');

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
