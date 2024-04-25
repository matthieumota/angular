import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzasPageComponent } from './pizzas-page.component';

describe('PizzasPageComponent', () => {
  let component: PizzasPageComponent;
  let fixture: ComponentFixture<PizzasPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PizzasPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PizzasPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
