import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Pizza } from '../../models/pizza';
import { PizzaRepository } from '../../services/pizza-repository';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-pizza-detail',
  imports: [RouterLink],
  templateUrl: './pizza-detail.html',
  styleUrl: './pizza-detail.scss',
})
export class PizzaDetail {
  route = inject(ActivatedRoute);
  router = inject(Router);
  pizza = signal<Pizza | null>(null);
  loading = signal(false)
  pizzaRepository = inject(PizzaRepository);

  constructor() {
    this.route.params.pipe(
      tap({ next: () => this.loading.set(true) }),
      switchMap(params => this.pizzaRepository.getPizza(params['id']))
    ).subscribe(pizza => {
      this.loading.set(false);
      alert('OBSERVABLE EMIT VALUE: ' + JSON.stringify(pizza));

      if (!pizza) this.router.navigateByUrl('/')

      this.pizza.set(pizza);
    });
  }
}
