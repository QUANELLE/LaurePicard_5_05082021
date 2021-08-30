
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
    
    
    
    
}

//----------------- prix total du panier--------------------------

// creation sous forme de variables de l'élément à injecter dans le tfoot
let newPriceTotal = document.createElement('td');
// initialisation d'un tableau où seront listés les prix des articles du panier
let TotalPrices=[];

// boucle pour récupérer les prix du panier et en faire leur somme
for(i=0; i<produitPanier.length; i++){
    // récup de chaque prix du panier    
    let priceItem = produitPanier[i].prix;    

    // insertion de chaque prix dans le tableau TotalPrices  
    TotalPrices.push(priceItem);
    // console.log(TotalPrices);

    // utilisation de la méthode reduce pour additionner toutes les valeurs du tableau TotalPrices    
    const reducer = (accumulator, currentValue) => accumulator + currentValue;   
    let Total =TotalPrices.reduce(reducer);        
    // console.log(Total);

    // insertion du total dans le html
    newPriceTotal.innerText = Total+" euros";
    somme.appendChild(newPriceTotal);  
}
    