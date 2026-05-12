import { TestBed } from '@angular/core/testing';

import { PizzaRepository } from './pizza-repository';

describe('PizzaRepository', () => {
  let service: PizzaRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PizzaRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
