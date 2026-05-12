import { Component, input, signal, linkedSignal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-author',
  imports: [FormsModule, JsonPipe],
  templateUrl: './author.html',
})
export class Author {
  user = input.required<User>();
  protected birthYear = linkedSignal(() => {
    return new Date(this.user().birthDate).getFullYear();
  })
  protected years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

  protected age = computed(() => {
    console.log('Calculating age...');
    const today = new Date();
    const birth = new Date(this.user().birthDate);
    let age = today.getFullYear() - this.birthYear();
    if (today.getMonth() < birth.getMonth() || (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())) age--;
    return age;
  });

  protected isMajor = computed(() => {
    console.log('Calculating if major...');
    return this.age() >= 18;
  });

  protected showAvatar = signal(true);
  toggleAvatar(): void {
    this.showAvatar.update(v => !v);
  }
}
