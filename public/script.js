// localhost:3000/api/teddies
const liste = document.querySelector('.liste');
const btnVoir =document.querySelector('.btnVoir');

// btnVoir.addEventListener('click',() =>console.log("test bntVoir"));




fetch("http://localhost:3000/api/teddies")
.then(res=> res.json())
.then(data => {
    // console.log(data);
    for(i=0; i<data.length; i++){
        // creation sous forme de variables des éléments à injecter dans le DOM
        let newLi = document.createElement('li');
        let newNom = document.createElement('h2');
        let newPrix = document.createElement('p');
        let newPhoto = document.createElement('p');
        // récupération de l'url de l'image
        let url = data[i].imageUrl;

        // récupération des données souhaitées dans l'API
        newNom.innerText =data[i].name;
        newPhoto.innerHTML =`<img src="${url}">` ;
        newPrix.innerText = data[i].price;

        // insertion des éléments dans les li

        newLi.appendChild(newNom);
        newLi.appendChild(newPhoto);
        newLi.appendChild(newPrix);

        // ajout des li dans ul
        liste.appendChild(newLi);




    
    }
})
