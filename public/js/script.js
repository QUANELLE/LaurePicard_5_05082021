
const liste = document.querySelector('.liste');
const btnVoir =document.querySelector('.btnVoir');

// btnVoir.addEventListener('click',() =>console.log("test bntVoir"));




fetch("http://localhost:3000/api/teddies")
.then(res=> res.json())
.then(data => {
    // console.log(data);
    for(i=0; i<data.length; i++){
        // creation sous forme de variables des éléments à injecter dans le DOM
        let newArticle = document.createElement('figure');
        let newName = document.createElement('h2');
        let newPrice = document.createElement('p');
        let newPhoto = document.createElement('img');
        let newBtn = document.createElement('button');
        let newLink = document.createElement('a');
        
        // récupération de l'url de l'image
        let url = data[i].imageUrl;
        // récupération de l'id
        let id = data[i]._id;
        // console.log(id);
        // récupération des données souhaitées dans l'API
        newName.innerText =data[i].name;
        newPhoto.src = url;
        newPrice.innerText = data[i].price;
        newLink.href = id;
        newBtn.innerHTML = `<a href="id" class="btnVoir">Voir cet article</a>`;

        // insertion des éléments dans les Div

        newArticle.appendChild(newName);
        newArticle.appendChild(newPhoto);
        newArticle.appendChild(newPrice);
        newArticle.appendChild(newBtn);
        newBtn.appendChild(newLink);



        // ajout des Div dans liste
        liste.appendChild(newArticle);




    
    }
})
