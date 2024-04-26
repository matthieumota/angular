import { ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';

import { PizzasPageComponent } from './pizzas-page.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { PIZZAS, fakeInterceptor } from '../../http/fake.interceptor';
import { RouterModule } from '@angular/router';
import { PizzaService } from '../../services/pizza.service';

class FakeInterceptorClass implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return fakeInterceptor(req, next.handle);
  }
}

describe('PizzasPageComponent', () => {
  let component: PizzasPageComponent;
  let fixture: ComponentFixture<PizzasPageComponent>;
  let http: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PizzasPageComponent, HttpClientTestingModule, RouterModule.forRoot([])],
      providers: [
        //  { provide: HTTP_INTERCEPTORS, useClass: FakeInterceptorClass, multi: true }
        // On peut aussi fournir un faux service pour le test
        { provide: PizzaService, useFactory: () => ({
          getPizzas: () => of(PIZZAS)
        }) }
      ]
    }).compileComponents();
    http = TestBed.inject(HttpTestingController);

    // fixture = TestBed.createComponent(PizzasPageComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(PizzasPageComponent);
    // fixture.detectChanges();

    // const req = http.expectOne('https://monapi.com/api/pizzas');
    // expect(req.request.method).toBe('GET');
    // req.flush(PIZZAS);

    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('h2')[0]?.textContent).toContain('1: Reine 0');

    // http.verify();
  });
});
