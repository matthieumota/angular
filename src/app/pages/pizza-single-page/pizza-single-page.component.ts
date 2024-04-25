import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PizzaService } from '../../services/pizza.service';
import { switchMap } from 'rxjs';
import { Pizza } from '../../models/pizza';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pizza-single-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './pizza-single-page.component.html',
  styleUrl: './pizza-single-page.component.scss'
})
export class PizzaSinglePageComponent implements OnInit {
  pizza!: Pizza;

  constructor(
    private route: ActivatedRoute,
    private pizzaService: PizzaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // On passe par un observable
    // Si on va de /pizza/1 à /pizza/4, on change de page
    // mais pour Angular, on ne change pas de composant
    // Le ngOnInit n'est pas relancé mais le subscribe si
    this.route.params.pipe(
      switchMap(params => this.pizzaService.getPizza(params['id'])),
    ).subscribe({
      next: pizza => this.pizza = pizza,
      // Redirection si on a une erreur
      error: (error) => this.router.navigate(['/pizzas'])
    });
  }
}
