import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercicesPageComponent } from './exercices-page.component';

describe('ExercicesPageComponent', () => {
  let component: ExercicesPageComponent;
  let fixture: ComponentFixture<ExercicesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExercicesPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExercicesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
