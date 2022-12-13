const urlPost = "http://localhost:3000/posts";
const titlePost = document.getElementsByClassName("card-title");
const bodyPost = document.getElementsByClassName("card-text");

const myModal = document.getElementById('myModal')
const myInput = document.getElementById('myInput')

myModal.addEventListener('shown.bs.modal', () => {
  myInput.focus()
})

fetch("http://localhost:3000/posts")
.then((response) => response.json())
.then((data) => {
        for(let i=0; i<data.length; i++){
    titlePost[i].innerText = data[i].title; 
    bodyPost[i].innerText = data[i].body;
}})
    

    console.log(titlePost); 