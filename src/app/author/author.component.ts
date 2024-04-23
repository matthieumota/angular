import { Component, Input } from '@angular/core';
import { User } from '../models/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-author',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card" [ngStyle]="{ width: '200px' }">
      <img class="card-img-top" [src]="author.avatar" [alt]="author.firstname + ' ' + author.name">
      <div class="card-body">
        <h5 class="card-title">{{ author.firstname + ' ' + author.name }}</h5>
        <p class="card-text">{{ author.age }} ans</p>
      </div>
    </div>
  `
})
export class AuthorComponent {
  @Input() author!: User;
}
