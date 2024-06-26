import { HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { Pizza } from '../models/pizza';
import { delay, dematerialize, materialize, of, throwError } from 'rxjs';

export const PIZZAS: Pizza[] = [
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
  const queryString = (key?: any) => {
    const params = url.split('?');

    if (params.length > 1) {
      const queryString: any = params[params.length - 1].split('&').reduce((o, param) => {
        const [key, value] = param.split('=');

        return { ...o, [key]: value };
      }, {});

      return key ? queryString[key] : queryString;
    }

    return '';
  }

  if (url.match(/\/api\/pizzas\/+/) && method === 'GET') {
    const pizza = pizzas.find(p => p.id === idFromUrl());

    return response(pizza, pizza ? 200 : 404);
  } else if (url.includes('/api/pizzas') && method === 'GET') {
    if (!isLogged()) {
      // return response('Unauthorized', 401);
    }

    return response(pizzas.filter(p => p.name.toLowerCase().includes(queryString('q'))));
  } else if (url.match(/\/api\/pizzas\/\d+/) && method === 'PUT') {
    let pizza = pizzas.find(p => p.id === idFromUrl());
    pizza = { ...pizza, ...body };

    syncStorage();

    return response(pizza, pizza ? 200 : 404);
  } else if (url.match(/\/api\/pizzas\/\d+/) && method === 'DELETE') {
    pizzas = pizzas.filter(p => p.id !== idFromUrl());
    
    syncStorage();

    return response();
  } else if (url.endsWith('/api/pizzas') && method === 'POST') {
    if (!isLogged()) {
      return response('Unauthorized', 401);
    }

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
  } else if (url.includes('/api/users') && method === 'GET') {
    return response(users.filter(u => u.name.toLowerCase().includes(queryString('q'))));
  }

  return next(req);
};
