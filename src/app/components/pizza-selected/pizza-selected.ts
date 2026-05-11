import { Component, input } from '@angular/core';
import { Pizza } from '../../models/pizza';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pizza-selected',
  imports: [FormsModule],
  templateUrl: './pizza-selected.html',
  styleUrl: './pizza-selected.scss',
})
export class PizzaSelected {
  selectedPizza = input<Pizza | null>();
}
