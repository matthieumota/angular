import { HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { Pizza } from '../models/pizza';
import { delay, dematerialize, materialize, of, throwError } from 'rxjs';

const PIZZAS: Pizza[] = [
  { id: 1, name: 'Reine', price: 12, image: '/assets/pizzas/reine.jpg' },
  { id: 2, name: '4 fromages', price: 13, image: '/assets/pizzas/4-fromages.jpg' },
  { id: 3, name: 'Orientale', price: 11, image: '/assets/pizzas/orientale.jpg' },
  { id: 4, name: 'Cannibale', price: 9, image: '/assets/pizzas/cannibale.jpg' }
];

let pizzas: Pizza[] = [];

if (typeof localStorage !== 'undefined') {
  pizzas = JSON.parse(localStorage.getItem('pizzas')!) || PIZZAS;
}

const users: any[] = [
  { id: 1, name: 'fiorella', password: 'password' },
  { id: 2, name: 'matthieu', password: 'password' },
  { id: 3, name: 'marina', password: 'password' },
];

const response = (body?: any, status: number = 200) => {
  if (status >= 400) {
    return throwError(() => ({ status, body })).pipe(materialize(), delay(500), dematerialize());
  }

  return of(new HttpResponse({ status, body })).pipe(delay(500));
};
const syncStorage = () => {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('pizzas', JSON.stringify(pizzas));
  }
}

export const fakeInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next) => {
  const { url, method, body, headers } = req;

  const idFromUrl = () => {
    const parts = url.split('/');
  
    return parseInt(parts[parts.length - 1]);
  }
  const isLogged = () => headers.get('Authorization') === 'Bearer abc-123';

  if (url.endsWith('/api/pizzas') && method === 'GET') {
    if (!isLogged()) {
      // return response('Unauthorized', 401);
    }

    return response(pizzas);
  } else if (url.match(/\/api\/pizzas\/\d+/) && method === 'GET') {
    return response(pizzas.find(p => p.id === idFromUrl()));
  } else if (url.match(/\/api\/pizzas\/\d+/) && method === 'PUT') {
    let pizza = pizzas.find(p => p.id === idFromUrl());
    pizza = { ...pizza, ...body };

    syncStorage();

    return response(pizza);
  } else if (url.match(/\/api\/pizzas\/\d+/) && method === 'DELETE') {
    pizzas = pizzas.filter(p => p.id !== idFromUrl());
    
    syncStorage();

    return response();
  } else if (url.endsWith('/api/pizzas') && method === 'POST') {
    let pizza = body;

    pizza.id = pizzas.length ? Math.max(...pizzas.map(p => p.id)) + 1 : 1;
    pizzas = [ ...pizzas, pizza ];

    syncStorage();

    return response(pizza);
  } else if (url.endsWith('/login') && method === 'POST') {
    const { name, password } = body;
    const user = users.find(u => u.name === name && u.password === password);

    if (!user) {
      return response('Invalid credentials', 401);
    }

    return response({
      ...user,
      token: 'abc-123',
    });
  }

  return next(req);
};