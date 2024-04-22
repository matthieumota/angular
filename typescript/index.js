var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
// Typage
const firstname = 'Fiorella';
const contacts = [firstname, 'Toto', 12];
// type Color = 'blue' | 'red' | 'yellow';
// const color: Color = 'blue';
// const ou let => let permet d'éviter le hoisting
// Typage retour
const addition = (a, b = 0) => {
    return a + b;
};
console.log(addition(1) + addition(1, 2));
const say = (message, callback) => {
    callback(message);
};
say('Hello', (m) => console.log(m));
// Décorateur
const Log = () => {
    return (originalMethod, context) => {
        console.log(`call ${context.kind} ${String(context.name)}`);
        // On remplate la méthode par cette fonction (normale car this)...
        return function (...args) {
            console.log('LOG');
            originalMethod.call(this, ...args);
        };
    };
};
let Car = (() => {
    var _a;
    let _instanceExtraInitializers = [];
    let _drive_decorators;
    return _a = class Car {
            constructor(color) {
                this.color = (__runInitializers(this, _instanceExtraInitializers), color);
                this.wheel = 4;
                this.color = color;
            }
            drive() {
                console.log(`my ${this.color.name} car is driving.`);
                console.log('my ' + this.color.name + ' car is driving');
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _drive_decorators = [Log()];
            __esDecorate(_a, null, _drive_decorators, { kind: "method", name: "drive", static: false, private: false, access: { has: obj => "drive" in obj, get: obj => obj.drive }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
const car = new Car({
    name: 'Red', value: 'red', display: () => console.log(car.color.value)
});
car.drive();
// Recap ES6
let myFunction = () => 'Hello'; // Retour implicite
const n = [1, 2, 3].map((value, index) => value * 2);
const createObject = function (name) {
    return { name }; // Objet litéral (avec raccourci)
};
const createObject2 = (name) => ({ name });
// Affectation destructurée
let { name } = createObject('Fiorella');
console.log(name);
let person = createObject('Toto');
const analyze = ({ name }) => name;
console.log(analyze(person));
// Rest operator
const multiple = (...numbers) => {
    let result = 1;
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
};
console.log(multiple(1, 2, 3));
// Spread operator
const prices = [12, 54, 21];
console.log(Math.min(...prices)); // [12, 54, 21] => 12, 54, 21
// Référence sur les tableaux et objets en JS
// Pour éviter cette référence, on peut faire une copie
const newPrices = [...prices, 34];
// newPrices.push(34);
console.log(prices, newPrices);
let userA = { name: 'Fiorella' };
let userB = userA;
let userC = { ...userA, name: 'Titi' };
userB.name = 'Toto'; // Je modifie aussi le userA
console.log(userA, userB, userC);
// Template de string
var template = '<div>\n' +
    '<h1>' + firstname + '</h1>\n' +
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
    set firstname(value) {
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
