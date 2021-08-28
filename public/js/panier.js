let articlePanier = document.querySelector('.article-panier');
let nomArticlePanier = document.querySelector('.nom');
let couleurArticlePanier = document.querySelector('.couleur');
let prixArticlePanier = document.querySelector('.prix');
console.log(prixArticlePanier);

// récup produit stocké dans le localStorage et transformation du json en objet JS
let produitPanier = JSON.parse(localStorage.getItem("produit"));
// let produitPanierJson = localStorage.produit;
// console.log(produitPanierJson);
// let produitPanier = JSON.parse(produitPanierJson);
console.log(produitPanier);
// insertion des éléments dans le html du panier
nomArticlePanier.textContent = produitPanier.nomProduit;
couleurArticlePanier.textContent = produitPanier.choixCouleur;
prixArticlePanier.textContent = produitPanier.prix+" €";
