"use strict";
const liste = document.querySelector('.liste');

// fonction asynchrone pour afficher liste des articles
async function listArticles(i) {
    // appel à l'API
    const response = await fetch("http://localhost:3000/api/teddies");
    
    const data = await response.json();
    
    // boucle itérative pour afficher chaque article
        for(i=0; i<data.length; i++){
            // creation sous forme de variables des éléments à injecter dans le DOM
            let newArticle = document.createElement('figure');
            let newName = document.createElement('h3');
            let newPrice = document.createElement('p');
            let newPhoto = document.createElement('img');
            let newLink = document.createElement('a');
            
            // récupération de l'url de l'image
            const url = data[i].imageUrl;
            // récupération de l'id
            const id = data[i]._id;
                        
            // récupération des données de l'API à injecter dans les variables
            newName.innerText =data[i].name;
            newPhoto.src = url;
            newPrice.innerText = data[i].price/100+" euros";
            newLink.href = `./vues/produit.html?id=${id}`;
            newLink.innerText = "Voir cet article";
            newLink.classList = "btnVoir";
            
            // insertion des éléments dans les Div            
            newArticle.appendChild(newName);
            newArticle.appendChild(newPhoto);
            newArticle.appendChild(newPrice);
            newArticle.appendChild(newLink);
            
            // ajout des Div dans liste
            liste.appendChild(newArticle);  
        }       
};
listArticles();