

"use strict";

// ---déclaration des constantes et variables utiles

const tBody = document.querySelector('tBody');
const sum = document.querySelector('.sum');
const title = document.querySelector('h2');
const table = document.querySelector('table');
const container = document.querySelector('.container');
const btnEmptyBasket = document.getElementById('btnEmptyBasket');
const sectionBtns = document.querySelector('.buttons');
const registrationform = document.querySelector('.registrationform');
let AllBtnSupprProd;

// récup produit stocké dans le localStorage et transformation du json en objet JS(tableau)
let productbasket = JSON.parse(localStorage.getItem("panier"));

// ----insertion des éléments dans le html de la page panier-------

function insertElsBasket() {
	for (let i = 0; i < productbasket.length; i++) {

		// creation des éléments à injecter dans le DOM
		const newArticle = document.createElement('tr');
		const newName = document.createElement('td');
		const newColor = document.createElement('td');
		const newPrice = document.createElement('td');
		const newBtnSupprProd = document.createElement('td');

		// Données  à injecter dans les balises
		newName.innerText = productbasket[i].nomProduit;
		newPrice.innerText = productbasket[i].prix + " euros";
		newColor.innerText = productbasket[i].choixCouleur;
		newBtnSupprProd.innerHTML = '<button class="BtnSupprProd btnsLink">Supprimer du panier</button>';

		// classes css dans balises
		newArticle.classList = "basketarticle";
		newName.classList = "nom";
		newPrice.classList = "prix";
		newColor.classList = "couleur";

		// insertion des éléments dans chaque ligne d'article
		newArticle.appendChild(newName);
		newArticle.appendChild(newColor);
		newArticle.appendChild(newPrice);
		newArticle.appendChild(newBtnSupprProd);

		// ajout de chaque ligne d'article dans le tableau
		tBody.appendChild(newArticle);
	}
}

//----------------- prix total du panier--------------------------

// creation de l'élément à injecter dans le tfoot
const newPriceTotal = document.createElement('td');

// initialisation d'un tableau où seront listés les prix des articles du panier
let TotalPrices = [];

// --- fonction pour le calcul du prix total du panier-----
const calcTotal = () => {

	// boucle pour récupérer les prix du panier et en faire leur somme
	for (let i = 0; i < productbasket.length; i++) {
		// récup de chaque prix du panier    
		let priceItem = productbasket[i].prix;

		// insertion de chaque prix dans le tableau TotalPrices  
		TotalPrices.push(priceItem);

		// utilisation de la méthode reduce pour additionner toutes les valeurs du tableau TotalPrices    
		const reducer = (accumulator, currentValue) => accumulator + currentValue;
		let Total = TotalPrices.reduce(reducer);

		// insertion du total dans le html
		newPriceTotal.innerText = Total + " euros";
		sum.appendChild(newPriceTotal);

		// insertion prix total dans le localStorage pour récupération en page commande
		localStorage.prixTotal = JSON.stringify(Total);
	}
};

//--------fonction d'activation du bouton "supprimer un produit" du panier------

function supprProd() {
	//    Boucle pour itérer sur les boutons
	for (let b = 0; b < AllBtnSupprProd.length; b++) {
		// sélection du bouton "supprimer du panier "
		AllBtnSupprProd[b].addEventListener("click", (e) => {
			e.preventDefault();
			// Suppression du produit en le selectionnant par son index dans le tableau productbasket       
			productbasket.splice(b, 1);

			// injection du nouveau panier dans le localStorage
			localStorage.panier = JSON.stringify(productbasket);

			// alerte pour l'utilisateur et rechargement de la page
			alert(`Votre produit a bien été supprimé du panier`);
			window.location.href = "panier.html";
		})
	};
};

// ----------Activation d'un bouton pour vider totalement le panier
function emptyBasket() {
	btnEmptyBasket.addEventListener("click", (e) => {
		e.preventDefault();
		localStorage.removeItem("panier");
		localStorage.removeItem("prixTotal");
		alert(`Votre panier a bien été vidé`);
		window.location.href = "panier.html";
	})
};

// -----fonction d'affichage du panier------------
function displayBasket() {

	if (!productbasket) {
		// insertion message si panier vide
		title.innerText = "Votre panier est vide";
		table.style.display = "none";
		sectionBtns.style.display = "none";

	} else {
		insertElsBasket();
		calcTotal();

		//  sélection de tous les boutons de suppression d'un produit
		AllBtnSupprProd = document.querySelectorAll(".BtnSupprProd");
		// Activation des boutons "supprimer un produit" du panier
		supprProd();
		// Activation d'un bouton pour vider totalement le panier
		emptyBasket();
	};
};
displayBasket();

// ------validation du panier et ouverture du formulaire-------

const btnValidBasket = document.getElementById('validBasket');
//---- fonction création et ouverture du formulaire----
function openForm() {
	let form = `<form id="formValidation" method="post">
	<h3>Veuillez remplir ce formulaire afin de valider votre commande</h3>
	<p>
	<label for="firstName">votre prénom</label><br>
	<input type="text" name="firstName" id="firstName" required >        
	</p>
	<p>
	<label for="lastName">votre nom</label><br>
	<input type="text" name="lastName" id="lastName" required>   
	</p>
	<p>
	<label for="address">votre adresse </label> <br>             
	<input type="text" name="address" id="address" required>       
	</p>
	<p>
	<label for="city">votre ville</label><br>
	<input type="text" name="city" id="city" required>     
	</p>
	<p>
	<label for="email">votre email</label><br>
	<input type="email" name="email" id="email" required >
	</p>
	<p>        
	<input type="submit"id="submitCommand" value="envoyer" >
	</p>        
	</form>`;
	registrationform.innerHTML = form;
	container.appendChild(registrationform);
	// mettre le curseur sur le 1er champ du formulaire
	firstName.focus();
}

// ----------validation commande pour envoyer au serveur-------

// récupération des données du formulaire au click de validation

const formValidation = document.getElementById('formValidation');

function validCommand() {

	document.forms['formValidation'].addEventListener('submit', (e) => {
		e.preventDefault();

		// injection données du formulaire inscrites par l'utilisateur dans un objet contact
		let contact = {
			firstName: document.getElementById('firstName').value,
			lastName: document.getElementById('lastName').value,
			address: document.getElementById('address').value,
			city: document.getElementById('city').value,
			email: document.getElementById('email').value
		}

		// création de l'objet products contenant les id des produits du panier
		let products = [];
		for (let i = 0; i < productbasket.length; i++) {
			products.push(productbasket[i].idProduit);
		}

		//création de l'objet à envoyer au serveur
		let command = {
			contact: contact,
			products: products
		}

		// ------------------envoi de l'objet "command" à l'API----------------------------
		let fetchData = {
			method: 'POST',
			body: JSON.stringify(command),
			headers: {
				"Content-Type": "application/json"
			}
		};

		fetch("http://localhost:3000/api/teddies/order", fetchData)
			.then(res => res.json())
			.then(data => {

			//----injection de la réponse de l'API dans le localstorage ---          
				localStorage.resApi = JSON.stringify(data);
			});

		//message de validation et redirection vers page commande.html 
		alert(`Votre commande a bien été validée`);
		window.location.href = "commande.html";
	});
};

function validBasket() {
	btnValidBasket.addEventListener("click", (e) => {
		openForm();
		validCommand();
	});
}
validBasket();

