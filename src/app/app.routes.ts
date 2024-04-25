import { Routes } from '@angular/router';
import { PizzasPageComponent } from './pages/pizzas-page/pizzas-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ExercicesPageComponent } from './pages/exercices-page/exercices-page.component';
import { ObservablesPageComponent } from './pages/observables-page/observables-page.component';
import { PizzaSinglePageComponent } from './pages/pizza-single-page/pizza-single-page.component';

export const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'pizzas', component: PizzasPageComponent },
    { path: 'pizzas/:id', component: PizzaSinglePageComponent },
    { path: 'exercices', component: ExercicesPageComponent },
    { path: 'observables', component: ObservablesPageComponent },
];
