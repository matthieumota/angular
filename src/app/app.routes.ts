import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Exercice } from './pages/exercice/exercice';
import { Cart } from './pages/cart/cart';
import { PizzaDetail } from './pages/pizza-detail/pizza-detail';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'exercices', component: Exercice },
  { path: 'panier', component: Cart },
  { path: 'pizza/:id', component: PizzaDetail }
];
