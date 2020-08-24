class Ingredient {
    constructor(
        name,
        unity,
        quantity,
        price
    ) {
        this.name = name;
        this.unity = unity;
        this.quantity = parseFloat(quantity);
        this.price = parseFloat(price);
    }
}