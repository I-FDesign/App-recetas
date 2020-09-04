class Ingredient {
    unitys = [
        {
            principalUnity: {
                unity: 'kg',
                name: 'Kilo'
            },
            secondaryUnity: {
                unity: 'gr',
                name: 'Gramos',
                equivalency: 1000 // 1000 gr = 1kg
            },
        },
        {
            principalUnity: {
                unity: 'lt',
                name: 'Litro'
            },
            secondaryUnity: {
                unity: 'ml',
                name: 'Mililitros',
                equivalency: 1000
            },
        },
        {
            principalUnity: {
                unity: 'pz',
                name: 'Pieza'
            },
            secondaryUnity: {
                unity: 'pz',
                name: 'Piezas',
                equivalency: 1
            },
        },
        {
            principalUnity: {
                unity: 'lb',
                name: 'Libra'
            },
            secondaryUnity: {
                unity: 'oz',
                name: 'Onzas',
                equivalency: 16
            },
        },
        {
            principalUnity: {
                unity: 'mt',
                name: 'Metro'
            },
            secondaryUnity: {
                unity: 'cm',
                name: 'Centímetros',
                equivalency: 100
            },
        }
    ];

    constructor(
        name,
        unity,
        quantity,
        buyQuantity,
        price
    ) {
        this.name = name;
        this.unity = unity;
        this.quantity = parseFloat(quantity);
        this.buyQuantity = parseFloat(buyQuantity);
        this.price = parseFloat(price);
    }
}