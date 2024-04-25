import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaSinglePageComponent } from './pizza-single-page.component';

describe('PizzaSinglePageComponent', () => {
  let component: PizzaSinglePageComponent;
  let fixture: ComponentFixture<PizzaSinglePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PizzaSinglePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PizzaSinglePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
