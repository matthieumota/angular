import { Component, input, model, output } from '@angular/core';
import { Pizza } from '../../models/pizza';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pizza-selected',
  imports: [FormsModule],
  templateUrl: './pizza-selected.html',
  styleUrl: './pizza-selected.scss',
})
export class PizzaSelected {
  // Propriétés
  selectedPizza = model<Pizza | null>();
  // Evénements
  cancelled = output<string>();
}
