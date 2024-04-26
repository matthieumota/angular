import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { PizzaService } from './pizza.service';
import { PIZZAS } from '../http/fake.interceptor';
import { Observable, delay } from 'rxjs';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('PizzaService', () => {
  let service: PizzaService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(PizzaService);
    http = TestBed.inject(HttpTestingController);
  });

  it('should return a list of pizzas', fakeAsync(() => {
    /*.pipe(delay(500))*/
    service.getPizzas().subscribe(pizzas => {
      expect(pizzas).toBe(PIZZAS);
    });

    tick(500); // Nécessaire pour terminer une tâche async (promesse, setTimeout, delay observable)

    // Ici, on mock la requête (simuler une fausse requête avec de fausses données)
    const req = http.expectOne('https://monapi.com/api/pizzas');
    expect(req.request.method).toBe('GET');
    req.flush(PIZZAS);
    http.verify();
  }));
});
