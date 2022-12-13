const urlPost = "http://localhost:3000/posts";
const titlePost = document.getElementsByClassName("card-title");
const bodyPost = document.getElementsByClassName("card-text");
const cardBody = document.getElementsByClassName("card-body");
const gridParentContainer = document.getElementById("gridParentContainer");
const modalTitle = document.getElementsByClassName("modal-title")[0];
const modalBody = document.getElementsByClassName("modal-body")[0];
const userData = document.getElementsByClassName("user-data");

fetch("http://localhost:3000/posts")
.then((response) => response.json())
.then((data) => {
    for(let i=0; i<data.length; i++){
    titlePost[i].innerText = data[i].title;
    bodyPost[i].innerText = data[i].body;
}})

gridParentContainer.addEventListener('click', mostrarPostReadMore, false);

function mostrarPostReadMore(event){
  let i = Number(event.target.id);
  console.log(event.target.id);
  fetch("http://localhost:3000/posts")
  .then((response) => response.json())
  .then((data) => {
      modalTitle.innerText = data[i].title;
      modalBody.innerText = data[i].body;
})

  fetch("http://localhost:3000/users")
    .then((response) => response.json())
    .then((data) => {
      userData[0].innerText = data[i].username;
      userData[1].innerText = data[i].email;
})
}

console.log(titlePost)