"use strict";

const article = document.querySelector('.article');

// -----Récupération de l'Id du produit sélectionné en page index----

let params = new URL(window.location.href).searchParams;
let id = params.get('id');

async function choiceProduct() {
    // appel à l'API
    const response = await fetch(`http://localhost:3000/api/teddies/${id}`);
    const data = await response.json();   

    // creation sous forme de variables des éléments à injecter dans le DOM
    let newName = document.createElement('h2');
    let newPrice = document.createElement('p');
    let newPhoto = document.createElement('img');
    let newDescription = document.createElement('p');
    let newForm = document.createElement('form');
    let newLabel = document.createElement('label');
    let newSelect = document.createElement('select');
    let selectOption = [];
    let newBtnSubmit = document.createElement('input');

    // récupération de l'url de l'image
    let url = data.imageUrl;
    
    // récupération tableau couleurs
    let colors = data.colors;
    // console.log(colors);

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

    // boucle iteration pour les options couleurs
    let c;
    for (c = 0; c < colors.length; c++) {
        selectOption += `<option value="${colors[c]}">${colors[c]}</option>`;
        newSelect.innerHTML = selectOption;
    }
   
    // création formulaire en y injectant balises html
    newForm.appendChild(newLabel);
    newForm.appendChild(newSelect);
    newForm.appendChild(newBtnSubmit);    

    // récupération des données de l'API à injecter dans les variables
    newPhoto.src = url;
    newName.innerText = data.name;
    newPrice.innerText = "prix: " + data.price / 100 + " euros";
    newDescription.innerText = data.description;

    // insertion des éléments dans l'article
    article.appendChild(newName);
    article.appendChild(newPhoto);
    article.appendChild(newDescription);
    article.appendChild(newPrice);
    article.appendChild(newForm);

    // --------------prise en compte du panier-------------------------------
    
    newBtnSubmit.addEventListener("click", (e) => {
        e.preventDefault();
        // récup choix de l'option par utilisateur
        let select = document.querySelector('select');
        let colorSelect = select.value;

        // récupération du produit sélectionné par l'utilisateur
        let ProductSelect = {
            idProduit: data._id,
            nomProduit: data.name,
            prix: data.price / 100,
            choixCouleur: colorSelect
        };
     
        // mettre plusieurs produits dans localstorage

        // variable qui récupère le contenu du localStorage en JS
        let listProductStock = JSON.parse(localStorage.getItem("panier"));

        // instructions if...else suivant si il y a déjà un produit dans le panier( et donc dans le localStorage)

        if (!listProductStock) {
            listProductStock = [];
            listProductStock.push(ProductSelect);           
            localStorage.panier = JSON.stringify(listProductStock);
        }
        else {
            listProductStock.push(ProductSelect);
            localStorage.panier = JSON.stringify(listProductStock);           
                }
         alert("Le produit a été ajouté à votre panier");       
    })
};

choiceProduct();


