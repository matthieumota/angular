import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { PizzaService } from './pizza.service';
import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { PIZZAS, fakeInterceptor } from '../http/fake.interceptor';
import { Observable, delay } from 'rxjs';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// (window as any)['__zone_symbol__fakeAsyncPatchLock'] = true;
// import 'zone.js/testing';
// import 'zone.js/plugins/zone-patch-rxjs-fake-async';

class FakeInterceptorClass implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return fakeInterceptor(req, next.handle);
  }
}

describe('PizzaService', () => {
  let service: PizzaService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        // { provide: HTTP_INTERCEPTORS, useClass: FakeInterceptorClass, multi: true }
      ]
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
