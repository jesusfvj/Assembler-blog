const titlePost = document.getElementsByClassName("card-title");
const bodyPost = document.getElementsByClassName("card-text");
const cardBody = document.getElementsByClassName("card-body");
const gridParentContainer = document.getElementById("gridParentContainer");
const modalTitle = document.getElementsByClassName("modal-title")[0];
const modalBody = document.getElementsByClassName("modal-body")[0];
const unsplashImageModal = document.getElementsByClassName("unsplash-image-modal")[0];
const unsplashImageNav = document.getElementsByClassName("unsplash-image-nav")[0];
const userData = document.getElementsByClassName("user-data");
const unsplashImage = document.getElementsByClassName("unsplash-image");
let idCard;
const cardToRemove =  document.getElementsByClassName("card");


gridParentContainer.addEventListener('click', showModal, false);
let idForSet = [];

fetch("http://localhost:3000/posts")
.then((response) => response.json())
.then((data) => {
  for(let i=0; i<data.length; i++){
    titlePost[i].innerText = data[i].title;
    bodyPost[i].innerText = data[i].body.substring(0, 75) + '...';
    idForSet = data[i].id;
    divCard[i].setAttribute("id", idForSet);
  }
})

fetch("https://api.unsplash.com/search/photos?query=forest,mountains&orientation=landscape&per_page=9&client_id=IjZZA7aI48XODGPFdLl7x5c4VhwcA7Y4nh7vwHHuCNM")
.then((response) => response.json())
.then((data) => {
  console.log(data)
  for(let i=0; i<100; i++){
    unsplashImage[i].style.backgroundImage = "url('https://source.unsplash.com/" + data.results[i].id + "/1600x900')";
  }
})

fetch("https://api.unsplash.com/search/photos?query=national-geographic&per_page=9&color=blue&client_id=IjZZA7aI48XODGPFdLl7x5c4VhwcA7Y4nh7vwHHuCNM")
.then((response) => response.json())
.then((data) => {
  unsplashImageNav.style.backgroundImage = "url('https://source.unsplash.com/9wg5jCEPBsw/1600x900')";
});


function showModal(event){
  idCard = Number(event.target.id);
  console.log(event.target.id);
  fetch("http://localhost:3000/posts")
  .then((response) => response.json())
  .then((data) => {
      modalTitle.innerText = data[idCard].title;
      modalBody.innerText = data[idCard].body;
  })

  fetch("http://localhost:3000/users")
    .then((response) => response.json())
    .then((data) => {
      userData[0].innerText = data[idCard].username;
      userData[1].innerText = data[idCard].email;
  })

  fetch("https://api.unsplash.com/search/photos?query=national-geographic&per_page=9&color=blue&client_id=IjZZA7aI48XODGPFdLl7x5c4VhwcA7Y4nh7vwHHuCNM")
  .then((response) => response.json())
  .then((data) => {
    unsplashImageModal.style.backgroundImage = "url('https://source.unsplash.com/" + data.results[idCard].id + "/1600x900')";
  });

}

const toastTrigger = document.getElementById('liveToastBtn')
const toastLiveExample = document.getElementById('liveToast')
if (toastTrigger) {
  toastTrigger.addEventListener('click', () => {
    const toast = new bootstrap.Toast(toastLiveExample)

    toast.show()
  })
}

// console.log({unsplashImageModal})
// console.log(titlePost)





// FETCH 

const buttonDelete = document.querySelector("#buttonDelete");
const buttonModify = document.querySelector("#buttonModify");
const showComments = document.querySelector("#buttonComments");

buttonModify.addEventListener("click", fetchPut);
buttonDelete.addEventListener("click", fetchDelete);

// MODIFY 

function fetchPut(){
    let someData = {
       title: titlePost.value,
       body: bodyPost.value
 }

  let putMethod = {
      method: 'PUT', 
      headers: { 
        "Content-type" : "application/json"
    },
      body: JSON.stringify(someData) 
 }

    fetch("http://localhost:3000/posts/ + id", putMethod)
       .then(response => response.json())
       .then((data) => {
        // divCard = getAtribute(data.id),
        titlePost.innerText = data[i].title;
        bodyPost.innerText = data[i].body;
    })
 }
 
 
// DELETE

let divCard = document.getElementsByClassName("div-card");
let divCardContainer = document.getElementsByClassName("col");


/*async function fetchDelete(id){
  try{
    let response = await fetch(`http://localhost:3000/posts/${id}`, {
                method: "DELETE",
                })
  } catch (error){ colsole.log(error)}
  divCardContainer.removeChild(); 
}*/


let url = "http://localhost:3000/posts/";
let setId;


function fetchDelete(e){
  let elementForDelete = e.target.closest('div-card');
  let id = elementForDelete;

  fetch(url + id, {
    method: 'DELETE'
})
    .then(res => res.json)
    .then(response => {
    // Eliminar fila del DOM
    elementForDelete.remove();
})
    .catch(error => {
    console.log('Error: ' + error);
});  
debugger
}


/* function fetchDelete(e){
  for(let x=0; x<divCard.length; x++){
    //divCard[x].id = idForSet; 
    idForSet[x] = divCard.id;
}
   const deleteMethod = {
        method: 'DELETE', 
 }
 /*const allButtons = document.getElementsByClassName("all-buttons")
          for(idCard; idCard<allButtons.length; idCard++){
          let allButtonsValue = Number(allButtons[idCard].getAttribute('id'));
          allButtons[idCard].removeAttribute('id');
          allButtonsValue++; 
          //let allButtonsValueString = allButtonsValue.toString(); 
          allButtons[idCard].setAttribute("id", "allButtonsValue");
          }*/
      /* fetch(url + idForSet, deleteMethod) 
      .then(response => response.json())
      .then((rem =>{
        divCardContainer.remove(); 
      }))
      .catch(error => console.log(error))
        debugger
      } */ 


      
    





