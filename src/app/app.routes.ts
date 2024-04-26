import { Router, Routes, UrlTree } from '@angular/router';
// import { PizzasPageComponent } from './pages/pizzas-page/pizzas-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ExercicesPageComponent } from './pages/exercices-page/exercices-page.component';
import { ObservablesPageComponent } from './pages/observables-page/observables-page.component';
import { PizzaSinglePageComponent } from './pages/pizza-single-page/pizza-single-page.component';
import { PizzaAddPageComponent } from './pages/pizza-add-page/pizza-add-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Observable, map, tap } from 'rxjs';

const canActivate = (): Observable<boolean | UrlTree> => {
    const loginUrl = inject(Router).createUrlTree(['/login']);

    return inject(AuthService).logged().pipe(
        map(isLogged => isLogged ? isLogged : loginUrl),
        tap(v => console.log(v)),
    );
}

export const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'pizzas', loadComponent: () => import('./pages/pizzas-page/pizzas-page.component').then(m => m.PizzasPageComponent) },
    { path: 'pizzas/nouvelle', component: PizzaAddPageComponent, canActivate: [canActivate] },
    { path: 'pizzas/:id', component: PizzaSinglePageComponent },
    { path: 'exercices', component: ExercicesPageComponent },
    { path: 'observables', component: ObservablesPageComponent },
    { path: 'login', component: LoginPageComponent },
];
