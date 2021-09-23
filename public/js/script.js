

"use strict";
const list = document.querySelector('.list');

// fonction asynchrone pour afficher liste des articles
async function listArticles(i) {
	// appel à l'API
	let response = await fetch("http://localhost:3000/api/teddies");

	let data = await response.json();

	// boucle itérative pour afficher chaque article
	for (i = 0; i < data.length; i++) {
		// creation des éléments à injecter dans le DOM
		const newArticle = document.createElement('figure');
		const newName = document.createElement('h3');
		const newPrice = document.createElement('p');
		const newPhoto = document.createElement('img');
		const newLink = document.createElement('a');

		// récupération de l'url de l'image
		let url = data[i].imageUrl;
		// récupération de l'id
		let id = data[i]._id;

		// récupération des données de l'API à injecter dans les variables
		newName.innerText = data[i].name;
		newPhoto.src = url;
		newPhoto.alt = data[i].name;
		newPrice.innerText = data[i].price / 100 + " euros";
		newPrice.className = "prix";
		newLink.href = `./vues/produit.html?id=${id}`;
		newLink.innerText = "Voir cet article";
		newLink.classList = "btnVoir";

		// insertion des éléments dans les Div            
		newArticle.appendChild(newName);
		newArticle.appendChild(newPhoto);
		newArticle.appendChild(newPrice);
		newArticle.appendChild(newLink);

		// ajout des Div dans liste
		list.appendChild(newArticle);
	}
};
listArticles();

