import { Component, input, signal, linkedSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user';

@Component({
  selector: 'app-author',
  imports: [FormsModule],
  templateUrl: './author.html',
})
export class Author {
  user = input.required<User>();
  protected birthYear = linkedSignal(() => {
    return parseInt(this.user().birthDate.split('-')[0]);
  });
  protected showAvatar = signal(true);
  protected years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

  protected age(): number {
    const today = new Date();
    const birth = new Date(this.user().birthDate);
    let age = today.getFullYear() - this.birthYear();
    if (today.getMonth() < birth.getMonth() || (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())) age--;
    return age;
  }

  protected isMajor(): boolean {
    return this.age() >= 18;
  }

  toggleAvatar(): void {
    this.showAvatar.update(v => !v);
  }
}
