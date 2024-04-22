// EXERCICES TYPESCRIPT (https://courses.boxydev.com/js/angular/decouvrir-typescript.html#tp-quelques-exercices)
export const addTwoNumbers1 = (a, b) => {
    return a + b;
};
export const addTwoNumbers2 = (params) => {
    return params.first + params.second;
};
export const getName1 = (params) => {
    if (params.last) {
        return `${params.first} ${params.last}`;
    }
    return params.first;
};
export const getName2 = (first, last) => {
    if (last) {
        return `${first} ${last}`;
    }
    return first;
};
const defaultUser = {
    id: 1,
    firstName: 'Fiorella',
    lastName: 'Mota',
    isAdmin: false,
};
const getUserId = (user) => {
    return user.id;
};
console.log(getUserId(defaultUser));
var Role;
(function (Role) {
    Role["admin"] = "admin";
    Role["user"] = "user";
    Role["superAdmin"] = "super-admin";
})(Role || (Role = {}));
export const defaultUser2 = {
    id: 1,
    firstName: 'Fiorella',
    lastName: 'Mota',
    role: 'super-admin', // Role.superAdmin
};
export const defaultUser3 = {
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
const makeUser = () => {
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
export const fetchLukeSkywalker = async () => {
    const data = await fetch('https://swapi.dev/api/people/1').then((res) => {
        return res.json();
    });
    return data;
};
// EXERCICES ES6 (EN TYPANT AVEC TYPESCRIPT ? 💪)
// (https://courses.boxydev.com/js/es6/#tp-quelques-exercices)
const users = ['Rick Sanchez', 'Morty Smith', 'Xavier Dang'];
let iteration = 0;
users.forEach((user) => iteration++);
console.log(iteration);
const sayHello = (name) => `Hello ${name}`;
const addition = (a, b) => a + b;
console.log(sayHello('Fiorella'));
console.log(addition(1, 2));
const data = [
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
    .filter((d) => d.price < 5) // Garder les produits avec un prix de moins de 5
    .sort((a, b) => a.qty - b.qty) // Trier par quantité, en descendant
    .map((d) => d.name); // Garder juste le nom de chaque élément
let i = 0;
const eatPlease = (callback = (i) => i + 1, name = 'Fiorella', first = 'mange', second = 'de la', third = 'salade') => {
    i = callback(i);
    console.log(name + ' ' + first + ' ' + second + ' ' + third);
};
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
};
const ninjaTurtles = {
    red: 'Raphael',
    orange: 'Michaelangello',
    blue: 'Leonardo',
    purple: 'Tagiatello'
};
console.log({ ...autaumnSalad, ...ninjaTurtles });
// export
import Car, { area, random, square, squareRoot } from './citation.js';
console.log(random(), square(10), area(10, 5), squareRoot(144), new Car());
const object = {
    itShallBeHere: true,
    itShallBeHereToo: true,
    itShallNotBeHere: false
};
const { itShallNotBeHere, ...reste } = object;
console.log(reste);
// console.log({ ...(delete object.itShallNotBeHere && object) }, object);
