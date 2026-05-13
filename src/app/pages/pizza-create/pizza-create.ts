import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { PizzaRepository } from '../../services/pizza-repository';

export type PizzaDraft = {
  name: string;
  price: string;
  image: string;
}

@Component({
  selector: 'app-pizza-create',
  imports: [FormsModule],
  templateUrl: './pizza-create.html',
  styleUrl: './pizza-create.scss',
})
export class PizzaCreate {
  pizza = signal<PizzaDraft>({
    name: '',
    price: '',
    image: '/assets/pizzas/reine.jpg',
  })

  pizzaRepository = inject(PizzaRepository);

  createPizza(form: NgForm) {
    this.pizzaRepository.createPizza(this.pizza()).subscribe(pizza => {
      console.log('Pizza créée :', pizza);
      form.resetForm();
    });
  }
}
