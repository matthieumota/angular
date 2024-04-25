import { Routes } from '@angular/router';
import { PizzasPageComponent } from './pages/pizzas-page/pizzas-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

export const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'pizzas', component: PizzasPageComponent }
];
