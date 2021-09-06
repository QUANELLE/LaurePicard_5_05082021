"use strict";

// const { doc } = require("prettier");

let tBody = document.querySelector('tBody');
let somme = document.querySelector('.somme');
let titre = document.querySelector('h2');
let tableau = document.querySelector('table');
let contenu = document.querySelector('.contenu');
let btnViderPanier = document.getElementById('btnViderPanier'); 
let sectionBtns = document.querySelector('.boutons'); 
let formulaire = document.querySelector('.formulaire');      
console.log(formulaire);


// récup produit stocké dans le localStorage et transformation du json en objet JS(tableau)
let produitpanier = JSON.parse(localStorage.getItem("panier"));
console.log(produitpanier);
if (produitpanier==null || !produitpanier || produitpanier==0) {
    titre.innerText = "Votre panier est vide";
    tableau.style.display = "none" ;
    sectionBtns.style.display = "none" ;
    
} else {
    
    // ---------------insertion des éléments dans le html du panier-----------------
    
    const insertElsPanier = () =>{
        
        for (let i = 0; i < produitpanier.length; i++) {
            // creation sous forme de variables des éléments à injecter dans le DOM
            
            let newArticle = document.createElement('tr');
            let newName = document.createElement('td');
            let newColor = document.createElement('td');
            let newPrice = document.createElement('td');
            let newBtnSupprProd = document.createElement('td');
            
            
            // récupération de l'id
            let id = produitpanier[i].idProduit;
            console.log(id);
            
            // Données  à injecter dans les variables
            newName.innerText = produitpanier[i].nomProduit;
            newPrice.innerText = produitpanier[i].prix + " euros";
            newColor.innerText = produitpanier[i].choixCouleur;
            newBtnSupprProd.innerHTML ='<button class="BtnSupprProd">Supprimer du panier</button>' ;
            
            
            // classes css dans variables
            newArticle.classList = "article-panier";
            newName.classList = "nom";
            newPrice.classList = "prix";
            newColor.classList = "couleur";
            
            
            // insertion des éléments dans les Div
            
            newArticle.appendChild(newName);
            newArticle.appendChild(newColor);
            newArticle.appendChild(newPrice);
            newArticle.appendChild(newBtnSupprProd);        
            
            // ajout des Div dans liste
            tBody.appendChild(newArticle);        
        }
    }
    insertElsPanier();
    //----------------- prix total du panier--------------------------
    
    // creation sous forme de variables de l'élément à injecter dans le tfoot
    let newPriceTotal = document.createElement('td');
    // initialisation d'un tableau où seront listés les prix des articles du panier
    let TotalPrices = [];
    // ........création d'une fonction pour le calcul du prix total du panier........
    const calcTotal = ()=> {
    
        // boucle pour récupérer les prix du panier et en faire leur somme
        for (let i = 0; i < produitpanier.length; i++) {
            // récup de chaque prix du panier    
            let priceItem = produitpanier[i].prix;
            
            // insertion de chaque prix dans le tableau TotalPrices  
            TotalPrices.push(priceItem);
            // console.log(TotalPrices);
            
            // utilisation de la méthode reduce pour additionner toutes les valeurs du tableau TotalPrices    
            const reducer = (accumulator, currentValue) => accumulator + currentValue;
            let Total = TotalPrices.reduce(reducer);
            console.log(Total);
            
            // insertion du total dans le html
            newPriceTotal.innerText = Total + " euros";
            somme.appendChild(newPriceTotal);
            // insertion prix total dans le localStorage pour récupération en page commande
            localStorage.prixTotal= JSON.stringify(Total);
        }
    };
    calcTotal();
    
    //------------------------Activation du bouton "supprimer un produit" du panier------
    //      sélection des boutons de suppression d'un produit
    let AllBtnSupprProd = document.querySelectorAll(".BtnSupprProd");
    //    Boucle pour itérer sur les boutons
    for (let b = 0; b < AllBtnSupprProd.length; b++){
        // sélection du bouton "cliqué"
        AllBtnSupprProd[b].addEventListener("click", (e) => {
            e.preventDefault();  
            // Suppression du produit en le selectionnant par son index dans le tableau produitpanier       
            produitpanier.splice(b,1);
            // console.log(produitpanier);
            // injection du nouveau panier dans le localStorage
            localStorage.panier = JSON.stringify(produitpanier);
            // alerte pour l'utilisateur et rechargement de la page
            alert(`Votre produit a bien été supprimé du panier`);
            window.location.href ="panier.html";
        }
        )};
        
        // ----------Activation d'un bouton pour vider totalement le panier

         btnViderPanier.addEventListener("click",(e) => {
                e.preventDefault();
                localStorage.removeItem("panier");
                localStorage.removeItem("prixTotal");
                alert(`Votre panier a bien été vidé`);
                window.location.href ="panier.html";
            } )
    };



    // ------------------------------------------------------------------
    // ------validation du panier et ouverture du formulaire

    let btnValidPanier = document.getElementById('validPanier');
    

    btnValidPanier.addEventListener("click",(e)=>{        
        // création et ouverture du formulaire
        let form = `<form  method="post">
        <h3>Veuillez remplir ce formulaire afin de valider votre commande</h3>
        <p>
        <label for="firstName">votre prénom</label>
        <input type="text" name="firstName" id="firstName" required required>
        </p>
        <p>
        <label for="lastName">votre nom</label>
        <input type="text" name="lastName" id="lastName" required>
        </p>
        <p>
        <label for="address">votre adresse </label>              
        <input type="text" name="address" id="address" required>
        </p>
        <p>
        <label for="city">votre ville</label>
        <input type="text" name="city" id="city" required>
        </p>
        <p>
        <label for="email">votre email</label>
        <input type="email" name="email" id="email" required>
        <span class="spanError"></span>
        </p>
        <p>
        
        <input type="submit"id="submitCommand" value="envoyer" disabled>
        </p>
        </form>`;
        formulaire.innerHTML = form;
        console.log(formulaire);
        contenu.appendChild(formulaire);

        // -----validation du champ email-----
        const inputEmail = document.getElementById('email');
        const spanError = document.querySelector('.spanError');
        const submitCommand = document.getElementById('submitCommand');

            //  console.log(spanError)
        // console.log(inputEmail);
            // variable regex de vérification de l'email
        const emailRegex = ("^/[\w_-]+\.[a-z]{2,4}$/i");

            // fonction de vérification de l'email  

        // const emailVerif = (value)=>{
        //     if (!value.match(emailRegex)) {
               
        //         spanError.classList.add('error');
        //         spanError.textContent = "rentrez un email valide";
                
        //     } 
        //     else if(value.match(emailRegex)) {
        //         spanError.classList.remove('error');
                
        //          spanError.textContent = "";
        //          submitCommand.removeAttribute('disabled');

                
        //     }
        // }
        // déclenchement de la vérification  de l'email lors de la saisie
        inputEmail.addEventListener("input",(e)=>{
            // console.log(e.target.value)
            const val= e.target.value;
            console.log(val.match(/^[\w_-]+\.[a-z]{2,4}$/i));
            // emailVerif(val);
            if (val.match(emailRegex)) {
               
                spanError.classList.remove('error');
                
                 spanError.textContent = "";
                 submitCommand.removeAttribute('disabled');
                
            } 
            else  {
                spanError.classList.add('error');
                spanError.textContent = "rentrez un email valide";

                
            }

        }
            )
        // REGEX fromscratch: email.match(^/[\w_-]+\.[a-z]{2,4}$/i)
    //   regex email:  ([a-zA-Z0-9_-.]+)@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.)|(([a-zA-Z0-9-]+.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(]?) 
       
        // -------début validation commande pour envoyer au serveur------

        // récupération des données du formulaire au click de validation
    
        let btnSubmitCommand = document.getElementById('submitCommand');
        console.log(btnSubmitCommand);
            
        btnSubmitCommand.addEventListener("click",(e)=>{
            e.preventDefault();
            
            // mettre  données du formulaire inscrites par l'utilisateur dans un objet contact
            let contact = {
                
                firstName: document.getElementById('firstName').value,
                lastName :document.getElementById('lastName').value,
                address: document.getElementById('address').value,
                city: document.getElementById('city').value,
                email: document.getElementById('email').value,
                
            }
            console.log(contact);

        
        // création de l'objet products contenant les id des produits du panier
        let products = [];

            for (let i = 0; i < produitpanier.length; i++){
                // listProductStock.push(ProductSelect);
              products.push(produitpanier[i].idProduit);     
            }
        console.log(products);
           
                // création d'un id unique pour chaque commande
                        //récupération des 3 premières lettres du nom de l'utilisateur 
                
                const{lastName} = contact;           
                let stringLastName = [...lastName];
                console.log(stringLastName);
                const[first,second,third,...rest]= stringLastName;
                console.log(first,second,third);
                    // création de l'id avec les 3 premières lettres du nom de l'utilisateur et l'instant de la validation
                let date = Date.now();
                console.log(date);
                let order_id =`${first}${second}${third}${date}`;
                console.log(order_id);
                //création de l'objet à envoyer au serveur
                let command = {
                    // order_id: order_id,
                    contact: contact,
                    products: products
                } 
                console.table(command);

                
                // envoi de command à l'API
                let fetchData = {
                    method: 'POST',
                    body: JSON.stringify(command),
                    headers:{
                        "Content-Type":"application/json"
                    }
                };
                //   fetch("http://localhost:3000/api/teddies")
                // 
                
                fetch("http://localhost:3000/api/teddies/order", fetchData)
                //   .then(res=> console.log(res));
                .then(res=> res.json())
                .then(data => {
                    console.table(data);
                    // // injection de la réponse de l'API dans le localstorage               
                
                    localStorage.resApi =JSON.stringify(data);                   
                    
                }                     
                );
                
                alert(`Votre commande a bien été validée`);
                window.location.href ="commande.html";     
                
                
                
            }   
            
            );
        
    }
    );


        
    // ___________format attendu_______________
    // Expects request to contain:
    // * contact: {
    // *   firstName: string,
    // *   lastName: string,
    // *   address: string,
    // *   city: string,
    // *   email: string
    // * }