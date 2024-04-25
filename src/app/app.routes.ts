import { Routes } from '@angular/router';
// import { PizzasPageComponent } from './pages/pizzas-page/pizzas-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ExercicesPageComponent } from './pages/exercices-page/exercices-page.component';
import { ObservablesPageComponent } from './pages/observables-page/observables-page.component';
import { PizzaSinglePageComponent } from './pages/pizza-single-page/pizza-single-page.component';
import { PizzaAddPageComponent } from './pages/pizza-add-page/pizza-add-page.component';

export const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'pizzas', loadComponent: () => import('./pages/pizzas-page/pizzas-page.component').then(m => m.PizzasPageComponent) },
    { path: 'pizzas/nouvelle', component: PizzaAddPageComponent },
    { path: 'pizzas/:id', component: PizzaSinglePageComponent },
    { path: 'exercices', component: ExercicesPageComponent },
    { path: 'observables', component: ObservablesPageComponent },
];
