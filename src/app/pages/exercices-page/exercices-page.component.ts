import { Component } from '@angular/core';
import { User } from '../../models/user';
import { CounterComponent } from '../../counter/counter.component';
import { CommonModule } from '@angular/common';
import { AuthorComponent } from '../../author/author.component';
import { FormsModule } from '@angular/forms';
import { TwowayComponent } from '../../twoway/twoway.component';

@Component({
  selector: 'app-exercices-page',
  standalone: true,
  imports: [
    AuthorComponent,
    CommonModule,
    CounterComponent,
    FormsModule,
    TwowayComponent
  ],
  templateUrl: './exercices-page.component.html',
  styleUrl: './exercices-page.component.scss'
})
export class ExercicesPageComponent {
  title: string = 'Test';

  user: User = new User('Mota', 'Fiorella', '2019-12-31', 'https://i.pravatar.cc/150?u=fiorella');
  dates: Array<string> = User.dates();

  numbers: number[] = [1, 2, 3];
  letters: string[] = ['a', 'b', 'c'];

  // Le total pour les compteurs
  total: number = 20; // 5 + 0 + 15 par rapport à mes compteurs

  incrementTotal(value: number): void {
    this.total += value;
  }
}
