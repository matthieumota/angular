import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  static token() {
    const user = JSON.parse(localStorage.getItem('user')!);

    return user.token;
  }

  logged(): Observable<boolean> {
    // @todo aller voir dans le localstorage si un user est connecté...
    const user = localStorage.getItem('user');

    if (user) {
      this.user.next(JSON.parse(user));
    }

    return this.user.pipe(map(user => user !== null));
  }

  login(username: string, token: string): void {
    // @todo ajouter le user dans le localstorage
    localStorage.setItem('user', JSON.stringify({ username, token }));

    this.user.next({ username, token });
  }

  logout(): void {
    // @todo supprimer le user du localstorage
    localStorage.removeItem('user');

    this.user.next(null);
  }
}
