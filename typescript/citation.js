export const citations = [
    'Amazing sentence',
    'I\'ve no inspiration',
    'It\'s a beautiful day',
];
export const random = () => citations[Math.floor(Math.random() * citations.length)];
const square = (x) => x * x;
const area = (width, length) => width * length;
const squareRoot = (x) => Math.sqrt(x);
export { square, area, squareRoot };
export default class Car {
    constructor() {
        console.log('I\'m an Car instance');
    }
}
