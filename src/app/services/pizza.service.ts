import { Injectable } from '@angular/core';
import { Pizza } from '../models/pizza';
import { HttpClient } from '@angular/common/http';
import { Observable, delay, lastValueFrom } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {
  constructor(private http: HttpClient) {
    console.log('INSTANCE');
  }

  // Requêtes sur notre API (fakeInterceptor)
  // - /api/pizzas => GET
  // - /api/pizzas/1 => GET
  // - /api/pizzas => POST
  // - /api/pizzas/1 => PUT
  // - /api/pizzas/1 => DELETE
  getPizzas(): Observable<Pizza[]> {
    return this.http.get<Pizza[]>('https://monapi.com/api/pizzas');
  }

  getPizza(id: number): Observable<Pizza> {
    return this.http.get<Pizza>(`https://monapi.com/api/pizzas/${id}`);
  }

  update(pizza: Pizza): Observable<Pizza> {
    return this.http.put<Pizza>(`https://monapi.com/api/pizzas/${pizza.id}`, pizza);
  }

  delete(pizza: Pizza): Observable<void> {
    return this.http.delete<void>(`https://monapi.com/api/pizzas/${pizza.id}`);
  }

  create(name: string, price: number = 10): Observable<Pizza> {
    return this.http.post<Pizza>(
      `https://monapi.com/api/pizzas`,
      { name, price, image: '/assets/pizzas/reine.jpg' },
      { headers: { Authorization: `Bearer ${AuthService.token()}` } } // Le Bearer protège l'API (on devrait le récupérer sur notre service)
    );
  }

  search(value: string): Observable<any> {
    return this.http.get(`https://monapi.com/api/pizzas?q=${value}`);
  }

  getPizzasSlowly(): Promise<Pizza[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(
        lastValueFrom(this.getPizzas())
      ), 1000);
    })
  }
}
