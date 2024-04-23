import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Ingredient } from '../models/ingredient';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ingredient-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2 *ngIf="ingredients.length >= 0">Liste d'ingrédients</h2>
    <ul>
      <li *ngFor="let ingredient of ingredients" role="button" (click)="select(ingredient)">
        {{ ingredient.name }}
        <img class="img-fluid" [width]="50" [src]="ingredient.image" [alt]="ingredient.name">
      </li>
    </ul>
  `
})
export class IngredientListComponent {
  @Input() ingredients!: Ingredient[];
  @Output() selected: EventEmitter<Ingredient> = new EventEmitter();

  select(ingredient: Ingredient): void {
    this.selected.emit(ingredient);
  }
}
