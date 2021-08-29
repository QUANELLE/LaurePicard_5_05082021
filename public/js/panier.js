
let tBody = document.querySelector('tBody');
let somme = document.querySelector('.somme');
// console.log(tBody);


// récup produit stocké dans le localStorage et transformation du json en objet JS(tableau)
let produitPanier = JSON.parse(localStorage.getItem("produit"));
console.log(produitPanier);

// insertion des éléments dans le html du panier


for(i=0; i<produitPanier.length; i++){
    // creation sous forme de variables des éléments à injecter dans le DOM
   
    let newArticle = document.createElement('tr');
    let newName = document.createElement('td');
    let newColor = document.createElement('td');
    let newPrice = document.createElement('td');
    

    // récupération de l'id
    let id = produitPanier[i].idProduit;
    console.log(id);
   
    // Données  à injecter dans les variables
    newName.innerText =produitPanier[i].nomProduit;    
    newPrice.innerText = produitPanier[i].prix+" euros";
    newColor.innerText =produitPanier[i].choixCouleur;

        
    // classes css dans variables
    newArticle.classList = "article-panier";
    newName.classList = "nom";
    newPrice.classList = "prix";
    newColor.classList = "couleur";
    

    // insertion des éléments dans les Div

    newArticle.appendChild(newName);
    newArticle.appendChild(newColor);
    newArticle.appendChild(newPrice);
    
    
    // ajout des Div dans liste
    tBody.appendChild(newArticle);   



    
    // prix total du panier
    let newPriceTotal = document.createElement('td');
    let priceItem = produitPanier[i].prix;    
    console.log(priceItem);
    console.log(typeof priceItem);
    
    let Total=0;
    console.log(typeof Total);
    
     Total+=priceItem;
    
   
    console.log(Total);
    newPriceTotal.innerText = Total+"€";
    somme.appendChild(newPriceTotal);  
}

