import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaCreate } from './pizza-create';

describe('PizzaCreate', () => {
  let component: PizzaCreate;
  let fixture: ComponentFixture<PizzaCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PizzaCreate],
    }).compileComponents();

    fixture = TestBed.createComponent(PizzaCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
