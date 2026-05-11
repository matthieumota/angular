import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaSelected } from './pizza-selected';

describe('PizzaSelected', () => {
  let component: PizzaSelected;
  let fixture: ComponentFixture<PizzaSelected>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PizzaSelected],
    }).compileComponents();

    fixture = TestBed.createComponent(PizzaSelected);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
