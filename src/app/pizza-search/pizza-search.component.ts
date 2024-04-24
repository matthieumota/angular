import { Component } from '@angular/core';
import { PizzaService } from '../services/pizza.service';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-pizza-search',
  standalone: true,
  imports: [],
  template: `
    <input type="text" #searchBox (input)="search(searchBox.value)">
  `
})
export class PizzaSearchComponent {
  private terms = new Subject<string>();

  constructor(private pizzaService: PizzaService) {}

  ngOnInit() {
    this.terms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((value: string) => this.pizzaService.search(value))
    ).subscribe((result) => console.log(result));
  }

  search(value: string) {
    this.terms.next(value);
    // this.pizzaService.search(value).subscribe(result => console.log(result));
  }
}
