const article = document.querySelector('.article');



// -----Récupération de l'Id du produit sélectionné en page index----

// let urlProduit = window.location.href;
// console.log(urlProduit);
// let urlId = window.location.search;
// console.log(urlId);

let params = new URL(window.location.href).searchParams;
// console.log(params);
let id = params.get('id');
// console.log(id);




fetch(`http://localhost:3000/api/teddies/${id}`)
.then(res=> res.json())
.then(data => {
    console.log(data);
            
        // creation sous forme de variables des éléments à injecter dans le DOM
        let newName = document.createElement('h2');
        let newPrice = document.createElement('p');
        let newPhoto = document.createElement('img');
        let newDescription = document.createElement('p');
        let newForm = document.createElement('form');
        let newLabel = document.createElement('label');
        let newSelect = document.createElement('select');
        let selectOption=[];
        let newBtnSubmit = document.createElement('input');
               
        // récupération de l'url de l'image
        let url = data.imageUrl;
        // console.log(url);
        
        
        // récupération tableau couleurs
        let colors = data.colors;
        // console.log(colors);

        // création des balises html du formulaire
        newLabel.innerText = "Choisissez la couleur ";
        newLabel.htmlFor = "couleurs";
        newSelect.setAttribute("name","choixCouleurs");        
        newSelect.id = "couleurs";
        newBtnSubmit.type = "submit";
        newBtnSubmit.name = "couleurs[]";

        newBtnSubmit.value = "Acheter";
        console.log(newBtnSubmit); 
        console.log(newSelect); 
        
        
        // boucle iteration pour les options 
    
        for(c=0; c<colors.length; c++){
        
            selectOption += `<option value="${colors[c]}">${colors[c]}</option>`;
        
            newSelect.innerHTML = selectOption;
        
    }
    console.log(selectOption);
    
    

    // création formulaire en y injectant balises html
        newForm.appendChild(newLabel);
        newForm.appendChild(newSelect); 
        newForm.appendChild(newBtnSubmit); 
    // console.log(newForm);
        
     // récupération des données de l'API à injecter dans les variables
        newPhoto.src = url;        
        newName.innerText =data.name;        
        newPrice.innerText = "prix: "+data.price/100+" euros";
        newDescription.innerText = data.description;
        
        
        // insertion des éléments dans l'article
        article.appendChild(newName);
        article.appendChild(newPhoto);
        article.appendChild(newDescription);
        article.appendChild(newPrice);
        article.appendChild(newForm);
        // affichage choix de l'option par utilisateur
        let select = document.querySelector('select');
        let colorSelect = "";
        select.addEventListener('change',(e)=>{
            let colorSelect = e.target.value;
            console.log(colorSelect);
        }  )

        // prise en compte du panier
        newBtnSubmit.addEventListener("click", (e)=>{
            e.preventDefault();
            
            // récupération du produit sélectionné par l'utilisateur
            
            // let ProductSelect = {
                
            //     idProduit = id,
            //     // choixCouleur = colorSelect
            //  }
                
            
            // console.log(ProductSelect);
            // console.log(option);
    //         
        })
    })
    
    

    