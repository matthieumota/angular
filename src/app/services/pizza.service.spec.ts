import { TestBed, fakeAsync, flush, flushMicrotasks, tick, waitForAsync } from '@angular/core/testing';
import { PizzaService } from './pizza.service';
import { PIZZAS, fakeInterceptor } from '../http/fake.interceptor';
import { Observable, delay, of } from 'rxjs';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

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
    service.getPizzas().pipe(delay(500)).subscribe((v) => {
      expect(v).toEqual(PIZZAS);
    });

    // Ici, on mock la requête (simuler une fausse requête avec de fausses données)
    const req = http.expectOne('https://monapi.com/api/pizzas');
    expect(req.request.method).toBe('GET');
    req.flush(PIZZAS);
    http.verify();

    // Le tick doit ABSOLUMENT être après le flush... pour passer le delay(500)
    tick(500);
  }));

  // Ici, on peut utiliser waitForAsync pour utiliser l'interceptor
  it('should return a list of pizzas', waitForAsync(() => {
    service.getPizzas().subscribe((v) => {
      expect(v).toEqual(PIZZAS);
    });
  }));
});
