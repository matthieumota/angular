import { Ingredient } from './ingredient';

export class Pizza {
    id: number;
    name: string;
    price: number;
    image?: string;
    ingredient?: Ingredient | null;

    constructor(id: number, name: string, price: number, image: string) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
    }
}
