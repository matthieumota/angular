import { Injectable } from '@angular/core';
import { Pizza } from '../models/pizza';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

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
  getPizzas(): Promise<Pizza[]> {
    return lastValueFrom(this.http.get<Pizza[]>('https://monapi.com/api/pizzas'));
  }

  getPizza(id: number): Promise<Pizza> {
    return lastValueFrom(this.http.get<Pizza>(`https://monapi.com/api/pizzas/${id}`));
  }

  update(pizza: Pizza): Promise<Pizza> {
    return lastValueFrom(this.http.put<Pizza>(`https://monapi.com/api/pizzas/${pizza.id}`, pizza));
  }

  delete(pizza: Pizza): Promise<void> {
    return lastValueFrom(this.http.delete<void>(`https://monapi.com/api/pizzas/${pizza.id}`));
  }

  create(name: string, price: number = 10): Promise<Pizza> {
    return lastValueFrom(this.http.post<Pizza>(`https://monapi.com/api/pizzas`, { name, price, image: '/assets/pizzas/reine.jpg' }));
  }

  getPizzasSlowly(): Promise<Pizza[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(this.getPizzas()), 1000);
    })
  }
}
