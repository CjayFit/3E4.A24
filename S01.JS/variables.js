
const prenom = "Yannick"; // Impossible de refaire =

let age = 35; // Définir une variable qui peut être réaffectée, je peux refaire un = (1%)

age += 1;
age++;

console.log(prenom);

function addition(nombre1, nombre2) {
    return nombre1 + nombre2;
}

const resultat = addition(4,6);
console.log(resultat);

function creerMessage(nom, age) {
    return `Mon nom est ${nom} et j'ai ${age} ans;`
}

console.log(creerMessage(prenom, age));
