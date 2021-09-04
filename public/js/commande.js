"use strict";

let message = document.getElementById('message');
console.log(message);

// récup produit stocké dans le localStorage et transformation du json en objet JS(tableau)
let commandFinal = JSON.parse(localStorage.getItem("resApi"));
console.log(commandFinal);
// récup de l'id de commande renvoyé par l'API
let idCommand = commandFinal.orderId;
console.log(idCommand);
// récup du prix total de la commande
let{ products}=commandFinal;
console.log(products);
// const calcTotal = ()=> {
    
//     // boucle pour récupérer les prix du panier et en faire leur somme
//     for (let i = 0; i < products.length; i++) {
//         let prixTotal =[] ;
//         // récup de chaque prix du panier    
//         let priceItem = products[i].prix;
        
//         // insertion de chaque prix dans le tableau prixTotal  
//         prixTotal.push(priceItem);
//         console.log(prixTotal);
        
//         // utilisation de la méthode reduce pour additionner toutes les valeurs du tableau TotalPrices    
//         const reducer = (accumulator, currentValue) => accumulator + currentValue;
//         let Total = prixTotal.reduce(reducer);
//         console.log(Total);
        
//     //     // insertion du total dans le html
//     //     newPriceTotal.innerText = Total + " euros";
//     //     somme.appendChild(newPriceTotal);
//     }
// };
// calcTotal();

// création du message de validation
message.innerText = `Nous vous remercions de votre commande N°${idCommand}d'un montant total de x  euros.`;