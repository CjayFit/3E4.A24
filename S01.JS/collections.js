const tableau = ['Sports', 'Cuisine', 1243, true, {}]; //FIXME: Tableau avec plusieurs types !à ne pas faire

const fruits = ['Kiwi', 'Banane', 'Mangue', 'Fraise', 'Melon de H2O'];
console.log(fruits);

for(let fruit of fruits) {
    console.log(fruit);
}

fruits.push('Bleuets');

console.log(fruits);

function additionner(a, b) {
    return a + b;
}

const additionnerLambda = (a, b) => a + b;

let resultat = additionnerLambda(3, 6);
console.log(resultat);

fruits.forEach(f => console.log(f));

resultat = fruits.filter(f => f.length > 6);
console.log(resultat);
console.log(fruits);

const MULTIPLICATEUR = 3;
const nombres = [10, 21, 32, 42];

let produits = nombres.map(n => n * MULTIPLICATEUR)
                    .filter(n => n > 75)
                    .map(n => n + 9)
                    .forEach(n => console.log(n)); 

console.log(produits); //undefined forEach ne retourne rien


