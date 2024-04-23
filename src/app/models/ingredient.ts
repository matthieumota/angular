export class Ingredient {
    constructor(
        public id: number,
        public name: string,
        public price: number,
        public weight: number,
        public image?: string,
    ) {
    }
}
