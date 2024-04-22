// EXERCICES TYPESCRIPT (https://courses.boxydev.com/js/angular/decouvrir-typescript.html#tp-quelques-exercices)
export const addTwoNumbers1 = (a: number, b: number): number => {
    return a + b;
};

// (params: any) = SANS TYPE
// (params: { first: number, second: number }) = AVEC TYPE
interface AllNumbers {
    first: number;
    second: number;
}

export const addTwoNumbers2 = (params: AllNumbers) => {
    return params.first + params.second;
};

interface Username {
    first: string;
    last: string;
}

export const getName1 = (params: Username): string => {
    if (params.last) {
        return `${params.first} ${params.last}`;
    }
    return params.first;
};

export const getName2 = (first: string, last: string): string => {
    if (last) {
        return `${first} ${last}`;
    }
    return first;
};

interface User {
    id: number;
    firstName: string;
    lastName: string;
    isAdmin: boolean;
}

const defaultUser: User = {
    id: 1,
    firstName: 'Fiorella',
    lastName: 'Mota',
    isAdmin: false,
};

const getUserId = (user: User): number => {
    return user.id;
};

console.log(getUserId(defaultUser));

enum Role {
    admin = 'admin',
    user = 'user',
    superAdmin = 'super-admin',
}

// On peut aussi faire un type
type Role2 = 'admin' | 'user' | 'super-admin';

interface User2 {
    id: number;
    firstName: string;
    lastName: string;
    /**
     * On veut s'assurer que le rôle ne peut être que:
     * - 'admin'
     * - 'user'
     * - 'super-admin'
     */
    role: Role | Role2
}

export const defaultUser2: User2 = {
    id: 1,
    firstName: 'Fiorella',
    lastName: 'Mota',
    role: 'super-admin', // Role.superAdmin
};

interface User3 {
    id: number;
    firstName: string;
    lastName: string;
    role: string;
    posts: Post[];
}

interface Post {
    id: number;
    title: string;
}

export const defaultUser3: User3 = {
    id: 1,
    firstName: 'Fiorella',
    lastName: 'Mota',
    role: 'admin',
    posts: [
        {
            id: 1,
            title: 'How I eat so much cheese',
        },
        {
            id: 2,
            title: 'Why I don\'t eat more vegetables',
        },
    ],
};

interface User4 {
    id: number;
    firstName: string;
    lastName: string;
    role: string;
    posts: Array<Post2>; // Equivalent de Post2[]
}

interface Post2 {
    id: number;
    title: string;
}

const makeUser = (): User4 => {
    return {
        id: 1,
        firstName: 'Toto',
        lastName: 'Titi',
        role: 'admin',
        posts: [
            { id: 1, title: 'Article 1' },
            { id: 1, title: 'Article 2' },
        ],
    };
};

interface LukeSkywalker {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
}

export const fetchLukeSkywalker = async (): Promise<LukeSkywalker> => {
    const data = await fetch('https://swapi.dev/api/people/1').then((res) => {
        return res.json();
    });

    return data;
};

// EXERCICES ES6 (EN TYPANT AVEC TYPESCRIPT ? 💪)
// (https://courses.boxydev.com/js/es6/#tp-quelques-exercices)
const users: string[] = ['Rick Sanchez', 'Morty Smith', 'Xavier Dang'];
let iteration: number = 0;

users.forEach((user: string): any => iteration++);

console.log(iteration);

const sayHello = (name: string): string => `Hello ${name}`;
const addition = (a: number, b: number): number => a + b;

console.log(sayHello('Fiorella'));
console.log(addition(1, 2));

interface Item {
    type: string;
    name: string;
    price: number;
    qty: number;
}
const data: Array<Item> = [
    { type: 'Widget', name: 'Sprocket', price: 10.0, qty: 3 },
    { type: 'Widget', name: 'Bracket', price: 1.0, qty: 5 },
    { type: 'Widget', name: 'Brace', price: 2.5, qty: 1 },
    { type: 'Widget', name: 'Sprocket', price: 4.0, qty: 2 },
    { type: 'Food', name: 'Gouda', price: 8.75, qty: 4 },
    { type: 'Food', name: 'Bacon', price: 3.5, qty: 3 },
    { type: 'CD', name: 'Queen Best Hits', price: 5.5, qty: 5 },
    { type: 'CD', name: 'Brittney Best Hits', price: 6.25, qty: 3 },
    { type: 'CD', name: 'JT Best Hits', price: 2.25, qty: 6 },
];

// Le typage ici est largement facultatif...
const shoppingList = data
    .filter((d) => d.type !== 'Widget') // Supprimer Widget
    .filter((d: Item): boolean => d.price < 5) // Garder les produits avec un prix de moins de 5
    .sort((a: Item, b: Item): number => a.qty - b.qty) // Trier par quantité, en descendant
    .map((d: Item): string => d.name); // Garder juste le nom de chaque élément

let i = 0;

const eatPlease = (
    callback: (i: any) => any = (i: number): number => i + 1,
    name: string = 'Fiorella',
    first: string = 'mange',
    second: string = 'de la',
    third: string = 'salade',
): void => {
    i = callback(i);
    console.log(name + ' ' + first + ' ' + second + ' ' + third);
}

eatPlease();
eatPlease((i) => i + 2);
eatPlease();
eatPlease();

console.log(i);

const autaumnSalad = {
    better: 'better',
    call: 'call',
    it: 'it',
    soup: 'soup'
}

const ninjaTurtles = {
    red: 'Raphael',
    orange: 'Michaelangello',
    blue: 'Leonardo',
    purple: 'Tagiatello'
}

console.log({ ...autaumnSalad, ...ninjaTurtles });

// export
import Car, { area, random, square, squareRoot } from './citation.js';
console.log(random(), square(10), area(10, 5), squareRoot(144), new Car());

const object = {
    itShallBeHere: true,
    itShallBeHereToo: true,
    itShallNotBeHere: false
}

const { itShallNotBeHere, ...reste } = object;
console.log(reste);

// console.log({ ...(delete object.itShallNotBeHere && object) }, object);
