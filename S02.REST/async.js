//Le message "Bonjour" va s'afficher dans au moins 1s
//Simuler un appel à la base de données
// setTimeout(() => {
//     console.log("Bonjour");
// }, 5000);

function exemple1()  {
    console.log('Début');
    setTimeout(() => {
        console.log('Bonjour');
    }, 2000);
    console.log('Fin');
}

function exempleCallbackA() {
    console.log('1'); 
    setTimeout(() => {
        console.log('2'); 
        setTimeout(() => {
            console.log('3'); 
            setTimeout(() => {
                console.log('4'); 
            }, 500);
            console.log('5'); 
        }, 1000);
        console.log('6'); 
    }, 1000);

    console.log('7'); 

    setTimeout(() => {
        console.log('8'); 
    }, 1500);

    console.log('9');
}

function exemplePromise() {

    let promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Dans la promesse');
            resolve('Promesse réussie');
        }, 3000);
    })

    promise.then(message => {
        console.log('promesse terminée');
        console.log(message);
    })

}

async function exempleAwait() {

    let promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Dans la promesse');
            resolve('Promesse réussie');
        }, 3000);
    });

    let result = await promise; //J'ai besoin du résultat de la promise avant de poursuivre
    console.log('promesse terminée');
    console.log(result);

}

exempleAwait();
//exemplePromise();
//exempleCallbackA();
//exemple1();