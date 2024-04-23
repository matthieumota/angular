import { Component, Input } from '@angular/core';
import { User } from '../models/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-author',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card my-4" [ngStyle]="{ width: '200px' }">
      <img *ngIf="show" class="card-img-top" [src]="author.avatar" [alt]="author.firstname + ' ' + author.name">
      <div class="card-body">
        <h5 class="card-title">{{ author.firstname + ' ' + author.name }}</h5>
        <p class="card-text">{{ author.age }} ans</p>
        <label>
          <input type="checkbox" [(ngModel)]="show">
          <ng-container *ngIf="!show; else other"> Afficher avatar</ng-container>
          <ng-template #other> Cacher avatar</ng-template>
        </label>
      </div>
    </div>
  `
})
export class AuthorComponent {
  @Input() author!: User;
  show: boolean = true;
}
