import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PizzaService } from '../../services/pizza.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-pizza-add-page',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './pizza-add-page.component.html',
  styleUrl: './pizza-add-page.component.scss'
})
export class PizzaAddPageComponent {
  pizza: any = {
    name: '',
    price: '',
  };
  loading: boolean = false;

  constructor(
    private pizzaService: PizzaService,
    private router: Router
  ) {}

  save(form: any) {
    const { name, price } = this.pizza;

    this.loading = true;

    this.pizzaService.create(name, price).pipe(
      finalize(() => this.loading = false)
    ).subscribe(
      pizza => this.router.navigate(['/pizzas', pizza.id])
    );
  }
}
