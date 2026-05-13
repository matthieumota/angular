import { Component, inject, signal } from '@angular/core';
import { Pizza } from './models/pizza';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Counter } from './components/counter/counter';
import { Author } from './components/author/author';
import { User } from './models/user';
import { Cart } from './services/cart';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [FormsModule, Counter, Author, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title: string = 'Pizza Party';

  protected withoutSignal: number = 0;
  protected withSignal = signal(0);

  cart = inject(Cart);

  protected author = new User('Jean', 'Dupont', '1990-06-15', 'https://i.pravatar.cc/100');
}
