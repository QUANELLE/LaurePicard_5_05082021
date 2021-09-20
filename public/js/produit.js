

"use strict";

const article = document.querySelector('.article');

// -----Récupération de l'Id du produit sélectionné en page index----

let params = new URL(window.location.href).searchParams;
let id = params.get('id');

// creation sous forme de variables des éléments à injecter dans le DOM
let newName = document.createElement('h2');
let newPrice = document.createElement('p');
let newPhoto = document.createElement('img');
let newDescription = document.createElement('p');
let newForm = document.createElement('form');
let newLabel = document.createElement('label');
let newSelect = document.createElement('select');
let newBtnSubmit = document.createElement('input');

// création de variables nécessaires 
let selectOption = [];
let data;
let url;
let colors = [];
let idProduit;
let nomProduit;
let prix;
let ProductSelect;

//  fonction de boucle d'iteration pour les options couleurs
function optionColors(colors) {
	let c;
	for (c = 0; c < colors.length; c++) {
		selectOption += `<option value="${colors[c]}">${colors[c]}</option>`;
		newSelect.innerHTML = selectOption;
	}
};

//----------- mettre plusieurs produits dans localstorage---------------
function insertLocalStorage() {

	// // variable qui récupère le contenu du localStorage en JS
	let listProductStock = JSON.parse(localStorage.getItem("panier"));

	// instructions if...else suivant si il y a déjà un produit dans le panier( et donc dans le localStorage)

	if (!listProductStock) {
		listProductStock = [];
		listProductStock.push(ProductSelect);
		localStorage.panier = JSON.stringify(listProductStock);
	} else {
		listProductStock.push(ProductSelect);
		localStorage.panier = JSON.stringify(listProductStock);
	}
}

// ------fonction ajout d'un article dans le panier------
function addToBasket() {
	// récup choix de l'option par utilisateur
	let select = document.querySelector('select');
	let colorSelect = select.value;

	// récupération du produit sélectionné par l'utilisateur
	ProductSelect = {
		idProduit: idProduit,
		nomProduit: nomProduit,
		prix: prix,
		choixCouleur: colorSelect
	};
	insertLocalStorage();

	alert("Le produit a été ajouté à votre panier");
};

// Choix du produit et insertion dans le panier
function choiceProduct() {

	//-----appel à l'API et récupération des données---- 
	fetch(`http://localhost:3000/api/teddies/${id}`)
		.then(res => res.json())
		.then(data => {
			console.log(data);
			// récupération des caractéristiques du produit sélectionné
			let url = data.imageUrl;

			// récupération tableau couleurs
			let colors = data.colors;
			// fonction boucle options 
			optionColors(colors);

			// récupération données pour panier
			idProduit = data._id,
				nomProduit = data.name,
				prix = data.price / 100,

				// récupération des données de l'API à injecter dans les variables
				newPhoto.src = url;
			newPhoto.alt = nomProduit;
			newName.innerText = nomProduit;
			newPrice.innerText = "prix: " + prix + " euros";
			newDescription.innerText = data.description;

			// création des balises html du formulaire
			newLabel.innerText = "Choisissez la couleur ";
			newLabel.htmlFor = "couleurs";
			newSelect.setAttribute("name", "choixCouleurs");
			newSelect.id = "couleurs";
			newBtnSubmit.type = "submit";
			newBtnSubmit.name = "couleurs[]";
			newBtnSubmit.value = "Acheter";
			newBtnSubmit.className = "btnAcheter";
			newPrice.className = "prix";
			newForm.className = "form-prod";


			// création liste déroulante options en y injectant balises html
			newForm.appendChild(newLabel);
			newForm.appendChild(newSelect);
			newForm.appendChild(newBtnSubmit);

			// insertion des éléments dans l'article
			article.appendChild(newName);
			article.appendChild(newPhoto);
			article.appendChild(newDescription);
			article.appendChild(newPrice);
			article.appendChild(newForm);

			// -----prise en compte du choix et injection dans le panier---
			newBtnSubmit.addEventListener("click", (e) => {
				e.preventDefault();
				addToBasket();
			})
		})
};
choiceProduct();