import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Pizza } from '../models/pizza';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PizzaService } from '../services/pizza.service';

@Component({
  selector: 'app-pizza',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './pizza.component.html',
  styleUrl: './pizza.component.scss'
})
export class PizzaComponent implements OnChanges {
  @Input(/*{ alias: 'toto' }*/) pizza!: Pizza | null;
  @Output() canceled: EventEmitter<string> = new EventEmitter();
  loading: boolean = false;

  constructor(private pizzaService: PizzaService) {}

  // Le ngOnInit est fait quand le composant est chargé
  // Le ngOnChanges est fait quand un Input du composant change
  ngOnChanges(): void {
    if (! this.pizza) return;

    // Idéalement, on pourrait n'avoir que l'id dans le @Input
    // et avoir la pizza récupérée dans l'api en propriété
    this.pizzaService.getPizza(this.pizza.id).subscribe(
      pizza => this.pizza = pizza
    );
  }

  save() {
    this.loading = true;

    this.pizzaService.update(this.pizza!).subscribe(() => {
      this.loading = false;
      this.cancel();
    });
  }

  cancel() {
    // this.pizza = null;
    this.canceled.emit('Annuler');
  }

  next() {
    this.canceled.emit('Suivant');
  }
}
