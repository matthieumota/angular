import { Component, OnInit, signal } from '@angular/core';
import { Pizza } from './models/pizza';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PizzaSelected } from './components/pizza-selected/pizza-selected';
import { Counter } from './components/counter/counter';
import { Author } from './components/author/author';
import { User } from './models/user';

const PIZZAS: Pizza[] = [
  { id: 1, name: 'Reine', price: 12, image: '/assets/pizzas/reine.jpg' },
  { id: 2, name: '4 fromages', price: 13, image: '/assets/pizzas/4-fromages.jpg' },
  { id: 3, name: 'Orientale', price: 11, image: '/assets/pizzas/orientale.jpg' },
  { id: 4, name: 'Cannibale', price: 9, image: '/assets/pizzas/cannibale.jpg' }
];

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
  protected pizzas: Array<Pizza> | Pizza[] = PIZZAS;

  protected withoutSignal: number = 0;
  protected withSignal = signal(0);

  ngOnInit(): void {
    setInterval(() => {
      this.withoutSignal++;
      this.withSignal.update(n => n + 1);
    }, 1000);
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
