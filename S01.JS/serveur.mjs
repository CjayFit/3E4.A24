import { createServer } from 'node:http'; //using ou #include

const premierServeur = createServer((request, response) => {
    console.log(`Nous sommes dans le code du serveur ${request.url}`);
    response.statusCode = 200; //200 = OK
    response.setHeader('Content-Type', 'text/html');
    response.end(`Bonjour <strong>${request.url.substring(1)}</strong>`);
});


premierServeur.listen(3000, '127.0.0.1', () => {
    console.log('Le serveur est en fonction');
});