import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaAddPageComponent } from './pizza-add-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PizzaAddPageComponent', () => {
  let component: PizzaAddPageComponent;
  let fixture: ComponentFixture<PizzaAddPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PizzaAddPageComponent, HttpClientTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PizzaAddPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
