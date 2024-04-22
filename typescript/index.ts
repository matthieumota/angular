// Typage
const firstname: string = 'Fiorella';
const contacts: (string | number)[] = [firstname, 'Toto', 12];

// type Color = 'blue' | 'red' | 'yellow';
// const color: Color = 'blue';
// const ou let => let permet d'éviter le hoisting

// Typage retour
const addition = (a: number, b: number = 0): number => {
    return <number>a + b;
}

console.log(addition(1) + addition(1, 2));

const say = (message: string, callback: (string: string) => void): void => {
    callback(message);
}

say('Hello', (m) => console.log(m));

// Décorateur
const Log = () => {
    return (originalMethod: any, context: ClassMethodDecoratorContext) => {
        console.log(`call ${context.kind} ${String(context.name)}`);

        // On remplate la méthode par cette fonction (normale car this)...
        return function (...args: any[]): any {
            console.log('LOG');
            originalMethod.call(this, ...args);
        };
    }
}

// Les classes
interface Color {
    name: string;
    value: string;
    universe?: string;
    display(): void;
}

class Car {
    private wheel: number = 4;

    constructor(public color: Color) {
        this.color = color;
    }

    @Log()
    drive() {
        console.log(`my ${this.color.name} car is driving.`);
        console.log('my ' + this.color.name + ' car is driving');
    }
}

const car: Car = new Car({
    name: 'Red', value: 'red', display: () => console.log(car.color.value)
});
car.drive();

// Recap ES6
let myFunction = (): string => 'Hello'; // Retour implicite

const n = [1, 2, 3].map((value, index) => value * 2);

const createObject = function (name: string): { name: string } {
    return { name }; // Objet litéral (avec raccourci)
}

const createObject2 = (name: string): { name: string } => ({ name });

// Affectation destructurée
let { name } = createObject('Fiorella');
console.log(name);

let person = createObject('Toto');
const analyze = ({ name }: any) => name;
console.log(analyze(person));

// Rest operator
const multiple = (...numbers: number[]): number => {
    let result: number = 1;

    // .entries() transforme le tableau en Iterable (objet utilisable dans un for)
    // Object.fromEntries me permet de debug un iterable et de le voir sous forme d'objet
    console.log(Object.fromEntries(numbers.entries()));

    for (let [index, number] of numbers.entries()) {
        result *= number;
    }

    // for (let index in numbers) {
    //     result *= parseInt(index);
    // }

    return result;
}

console.log(multiple(1, 2, 3));

// Spread operator
const prices = [12, 54, 21];
console.log(Math.min(...prices)); // [12, 54, 21] => 12, 54, 21

// Référence sur les tableaux et objets en JS
// Pour éviter cette référence, on peut faire une copie
const newPrices = [ ...prices, 34 ];
// newPrices.push(34);
console.log(prices, newPrices);

let userA = { name: 'Fiorella' };
let userB = userA;
let userC = { ...userA, name: 'Titi' };

userB.name = 'Toto'; // Je modifie aussi le userA

console.log(userA, userB, userC);

// Template de string
var template = '<div>\n'+
  '<h1>'+firstname+'</h1>\n'+
'</div>\n';

let newTemplate = `<div>
    <h1>${firstname}</h1>
</div>`;

console.log(template, newTemplate);

let propName = 'firstname';

const person2 = {
  name: 'Mota',
  get [propName]() {
    return this.firstnameValue ? this.firstnameValue : 'Fiorella';
  },
  get age() {
    return new Date().getFullYear() - 2019;
  },
  set firstname(value: string) {
    this.firstnameValue = value.toUpperCase();
  }
};

console.log(person2.firstname); // Fiorella
console.log(person2.age); // X ans
person2.firstname = 'fiorella';
console.log(person2.firstname); // FIORELLA

// Import
import Moto, { sayGoodBye, sayHello } from './module.js';
sayHello();
sayGoodBye();

let m = new Moto();
