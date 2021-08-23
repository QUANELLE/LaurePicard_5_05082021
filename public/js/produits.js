const article = document.querySelector('.article');


// -----Récupération de l'Id du produit sélectionné en page index----

// let urlProduits = window.location.href;
// console.log(urlProduits);
// let urlId = window.location.search;
// console.log(urlId);

let params = new URL(window.location.href).searchParams;
console.log(params);
let id = params.get('id');
console.log(id);




fetch(`http://localhost:3000/api/teddies/${id}`)
.then(res=> res.json())
.then(data => {
    console.log(data);
            
        // creation sous forme de variables des éléments à injecter dans le DOM
        let newName = document.createElement('h2');
        let newPrice = document.createElement('p');
        let newPhoto = document.createElement('img');
        let newDescription = document.createElement('p');
        
        
        // récupération de l'url de l'image
        let url = data.imageUrl;
        // console.log(url);
        newPhoto.src = url;
        
        newName.innerText =data.name;        
        newPrice.innerText = data.price/100+" euros";
        newDescription.innerText = data.description;
        
        article.appendChild(newName);
        article.appendChild(newPhoto);
        article.appendChild(newDescription);
        article.appendChild(newPrice);
    
})
