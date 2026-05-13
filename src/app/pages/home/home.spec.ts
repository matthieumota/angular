import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { vi } from 'vitest';

import { Home } from './home';
import { PizzaRepository } from '../../services/pizza-repository';
import { Pizza } from '../../models/pizza';

const MOCK_PIZZAS: Pizza[] = [
  new Pizza(1, 'Reine', 12, '/assets/pizzas/reine.jpg'),
  new Pizza(2, '4 fromages', 13, '/assets/pizzas/4-fromages.jpg'),
];

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [
        provideRouter([]),
        {
          provide: PizzaRepository,
          useValue: {
            getPizzas: () => of(MOCK_PIZZAS),
            getPizza: (id: number) => of(MOCK_PIZZAS.find(p => p.id === id)!),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add "selected" class when clicking a pizza', () => {
    vi.useFakeTimers();
    fixture.detectChanges(); // déclenche ngOnInit → getPizzas()
    vi.advanceTimersByTime(600); // avance le delay(500)
    fixture.detectChanges(); // met à jour le DOM avec les pizzas
    vi.useRealTimers();

    const items = fixture.nativeElement.querySelectorAll('ul.pizzas li');
    expect(items.length).toBe(2);

    items[0].click();
    fixture.detectChanges();

    expect(items[0].classList).toContain('selected');
    expect(items[1].classList).not.toContain('selected');
  });

  it('should display the clicked pizza in app-pizza-selected', () => {
    vi.useFakeTimers();
    fixture.detectChanges();
    vi.advanceTimersByTime(600);
    fixture.detectChanges();
    vi.useRealTimers();

    const items = fixture.nativeElement.querySelectorAll('ul.pizzas li');
    items[0].click();
    fixture.detectChanges();

    const h2 = fixture.nativeElement.querySelector('app-pizza-selected h2');
    expect(h2?.textContent).toContain('Reine');
  });
});
