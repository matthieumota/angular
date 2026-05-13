import { Component, signal } from '@angular/core';
import { Counter } from '../../components/counter/counter';
import { Author } from '../../components/author/author';
import { User } from '../../models/user';

@Component({
  selector: 'app-exercice',
  imports: [Counter, Author],
  templateUrl: './exercice.html',
  styleUrl: './exercice.scss',
})
export class Exercice {
  protected withoutSignal: number = 0;
  protected withSignal = signal(0);

  protected author = new User('Jean', 'Dupont', '1990-06-15', 'https://i.pravatar.cc/100');
}
