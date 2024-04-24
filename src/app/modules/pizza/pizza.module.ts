import { CommonModule } from '@angular/common';
import { Component, Injectable, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Ce composant est NON standalone mais dispo partout où on importe
// le module
@Component({
  selector: 'pizza-toto',
  template: `<span *ngIf="true">PIZZA TOTO</span>`
})
export class PizzaTotoComponent {}

@Component({
  selector: 'pizza-titi',
  standalone: true,
  imports: [CommonModule],
  template: `<span *ngIf="true">PIZZA TITI</span>`
})
export class PizzaTitiComponent {}

@Injectable({
  providedIn: null
})
export class TotoService {}

@NgModule({
  // Ici on ajoute les composants NON standalone
  declarations: [PizzaTotoComponent],
  // Ici, on a les services que le module fournit
  providers: [TotoService],
  // Ici, on peut importer des modules pour les utiliser
  imports: [CommonModule, PizzaTitiComponent],
  exports: [
    CommonModule,
    FormsModule,
    PizzaTotoComponent,
    PizzaTitiComponent
  ],
})
export class PizzaModule { }
