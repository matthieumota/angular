import { Component, inject, OnInit, signal } from '@angular/core';
import { Pizza } from './models/pizza';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PizzaSelected } from './components/pizza-selected/pizza-selected';
import { Counter } from './components/counter/counter';
import { Author } from './components/author/author';
import { User } from './models/user';
import { PizzaRepository } from './services/pizza-repository';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule, PizzaSelected, Counter, Author],
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

  ngOnInit() {
    this.pizzaRepository.getPizzas().then(pizzas => {
      this.pizzas.set(pizzas);
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
    this.selectedPizza.set({ ...pizza });
  }

  unSelect(name: string): void {
    alert(`Pizza ${name} annulée !`);
    this.selectedPizza.set(null);
  }
}
