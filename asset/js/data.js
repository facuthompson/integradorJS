const productsData = [
    
    {
        name: "Charmander",
        id: 1,
        price: 50000,
        category: "Fuego",
        cardImg: "asset/img/pokemones/Charmander.png",
    },

    {
        name: "Charizard",
        id: 2,
        price: 500000,
        category: "Fuego",
        cardImg: "asset/img/pokemones/Charizard.png",
    },

    {
        name: "Bulbasaur",
        id: 3,
        price: 45000,
        category: "Planta",
        cardImg: "asset/img/pokemones/Bulbasaur.png",
    },

    {
        name: "Gyarados",
        id: 4,
        price: 450000,
        category: "Agua",
        cardImg: "asset/img/pokemones/Gyarados.png",
    },

    {
        name: "Lapras",
        id: 5,
        price: 75000,
        category: "Agua",
        cardImg: "asset/img/pokemones/Lapras.png",
    },

    {
        name: "Magmortar",
        id: 6,
        price: 80000,
        category: "Fuego",
        cardImg: "asset/img/pokemones/Magmortar.png",
    },

    {
        name: "Meganium",
        id: 7,
        price: 435000,
        category: "Planta",
        cardImg: "asset/img/pokemones/Meganium.png",
    },

    {
        name: "Sceptile",
        id: 8,
        price: 350000,
        category: "Planta",
        cardImg: "asset/img/pokemones/Sceptile.png",
    },

    {
        name: "Serperior",
        id: 9,
        price: 84000,
        category: "Planta",
        cardImg: "asset/img/pokemones/Serperior.png",
    },

    {
        name: "Vaporeon",
        id: 10,
        price: 60000,
        category: "Agua",
        cardImg: "asset/img/pokemones/Vaporeon.png",
    },

    {
        name: "Ninetales",
        id: 11,
        price: 95000,
        category: "Fuego",
        cardImg: "asset/img/pokemones/Ninetales.png",
    },

    {
        name: "Squirtle",
        id: 12,
        price: 59000,
        category: "Agua",
        cardImg: "asset/img/pokemones/Squirtle.png",
    },
];

const divideProducts = (size) => {
    let productsList = [];
    for (let i = 0; i < productsData.length; i += size)
    productsList.push(productsData.slice(i, i + size))
    return productsList;
};

const appState = {
    products : divideProducts(4),
    currentProductsIndex: 0,
    productsLimit: divideProducts(4).length,
    activeFilter: null
};
