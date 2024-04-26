import { Component, Input } from '@angular/core';
import { User } from '../models/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgePipe } from '../pipes/age.pipe';

@Component({
  selector: 'app-author',
  standalone: true,
  imports: [CommonModule, FormsModule, AgePipe],
  template: `
    <div class="card my-4" [ngStyle]="{ width: '200px' }" *ngIf="author">
      <img *ngIf="show" class="card-img-top" [src]="author.avatar" [alt]="author.firstname + ' ' + author.name">
      <div class="card-body" *ngIf="author.birthday | age as age">
        <h5 class="card-title">{{ author.firstname + ' ' + author.name }}</h5>
        <p class="card-text">{{ author.birthday | date:'y MMMM' }}</p>
        <p class="card-text">{{ author.birthday | age:'ans' }}</p>
        <p *ngIf="18 >= 18">Vous êtes majeur</p>
        <label>
          <input type="checkbox" [(ngModel)]="show">
          <ng-container *ngIf="!show; else other"> Afficher avatar</ng-container>
          <ng-template #other> Cacher avatar</ng-template>

          <p *ngIf="!show">Afficher avatar</p>
          <p *ngIf="show">Cacher avatar</p>
        </label>
      </div>
    </div>
  `
})
export class AuthorComponent {
  @Input() author!: User;
  show: boolean = true;
}
