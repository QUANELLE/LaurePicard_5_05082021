

"use strict";

let message = document.getElementById('message');
console.log(message);

// récup produit stocké dans le localStorage et transformation du json en objet JS(tableau)
let commandFinal = JSON.parse(localStorage.getItem("resApi"));
console.log(commandFinal);

// récup du prix total de la commande stocké dans le localStorage
let Total = JSON.parse(localStorage.getItem("prixTotal"));
console.log(Total);

// récup de l'id de commande renvoyé par l'API
let idCommand = commandFinal.orderId;
console.log(idCommand);

// création du message de validation
function displayMessage(){
    message.innerText = `Nous vous remercions de votre commande N°${idCommand} d'un montant total de ${Total} euros.`;
}
displayMessage();

