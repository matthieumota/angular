import { Component, Input } from '@angular/core';
import { Ingredient } from '../models/ingredient';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ingredient-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2 *ngIf="ingredients.length >= 0">Liste d'ingrédients</h2>
    <ul>
      <li *ngFor="let ingredient of ingredients">
        {{ ingredient.name }}
      </li>
    </ul>
  `
})
export class IngredientListComponent {
  @Input() ingredients!: Ingredient[];
}
