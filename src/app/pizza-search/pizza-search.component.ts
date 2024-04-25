import { Component } from '@angular/core';
import { PizzaService } from '../services/pizza.service';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Pizza } from '../models/pizza';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-pizza-search',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  template: `
    <input type="text" #searchBox (input)="search(searchBox.value)">
    <ul>
      <li *ngFor="let pizza of pizzas$ | async">
        {{ pizza.name }}
      </li>
    </ul>
    {{ terms | async }}
  `
})
export class PizzaSearchComponent {
  pizzas$!: Observable<Pizza[]>; // Cette observable pourra être affiché dans le template avec async
  public terms = new Subject<string>(); // On crée un observable

  constructor(private pizzaService: PizzaService) {}

  ngOnInit() {
    this.pizzas$ = this.terms.pipe(
      debounceTime(300), // Attends 300ms entre chaque saisie
      distinctUntilChanged(), // Ne fait rien si la valeur précédente est identique à la valeur
      switchMap((value: string) => this.pizzaService.search(value))
    );
  }

  search(value: string) {
    this.terms.next(value);
    // this.pizzaService.search(value).subscribe(result => console.log(result));
  }
}
