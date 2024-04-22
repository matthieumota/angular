export const citations: Array<string> = [
    'Amazing sentence',
    'I\'ve no inspiration',
    'It\'s a beautiful day',
];

export const random = (): string => citations[Math.floor(Math.random() * citations.length)];

const square = (x: number): number => x * x;
const area = (width: number, length: number): number => width * length;
const squareRoot = (x: number): number => Math.sqrt(x);

export { square, area, squareRoot };

export default class Car {
    constructor() {
        console.log('I\'m an Car instance');
    }
}
