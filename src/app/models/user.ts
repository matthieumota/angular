export class User {
    constructor(
        public name: string,
        public firstname: string,
        public birthday: string,
        public avatar: string
    ) {
    }

    // Solution ok mais on peut faire mieux avec les Pipes...
    get age(): number {
        console.log('COMPUTED');
        const today = new Date();
        const birthday = new Date(this.birthday);
        const age = today.getFullYear() - birthday.getFullYear();

        if (today.getMonth() < birthday.getMonth()) {
            return age - 1;
        }

        return age;
    }

    /**
     * Je range la génération des dates ici...
     */
    static dates(): Array<string> {
        return Array.from(
            { length: 120 },
            (v, i) => `${new Date().getFullYear() - i}-12-31`
        );
    }
}
