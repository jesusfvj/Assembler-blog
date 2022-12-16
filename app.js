const titlePost = document.getElementsByClassName("card-title");
const bodyPost = document.getElementsByClassName("card-text");
const cardBody = document.getElementsByClassName("card-body");
const gridParentContainer = document.getElementById("gridParentContainer");
const modalTitle = document.getElementsByClassName("modal-title")[0];
const infoModalBody = document.getElementsByClassName("info-modal-body")[0];
let unsplashImageModal = document.getElementsByClassName("unsplash-image-modal");
const unsplashImageNav = document.getElementsByClassName("unsplash-image-nav")[0];
const userData = document.getElementsByClassName("user-data");
const unsplashImage = document.getElementsByClassName("unsplash-image");
const commentContainer = document.getElementsByClassName("comment-container")[0];
const commentButton = document.getElementsByClassName("comment-button")[0];
const collapseComments = document.getElementsByClassName("collapse-comments")[0];
const collapseCommentsContainer = document.getElementsByClassName("collapse-comments-container")[0];
const likeHeart = document.getElementsByClassName("like-heart")[0];
const formControlTextareaOne = document.getElementById("formControlTextareaOne");
const formControlTextareaTwo = document.getElementById("formControlTextareaTwo");
const editButton = document.getElementById("editButton");
const deleteButton = document.getElementById("deleteButton");
const viewComments = document.getElementById("viewComments");
const buttonComments = document.getElementById("buttonComments");
const heartShape = document.getElementById("heartShape");
let divCardContainer = document.getElementsByClassName("div-card-container");
let cursor = document.getElementsByClassName("cursor");
let allButtons;
let counterPhotos;
let idCard;
let counterLikeHeart = 0;
let counterBtnComments = true;

gridParentContainer.addEventListener('click', showModalApi, false);
editButton.addEventListener('click', editPost);
buttonComments.addEventListener('click', changeNameButtonComments);
deleteButton.addEventListener('click', deletePost);
document.addEventListener("DOMContentLoaded", fetchPosts);
document.addEventListener("DOMContentLoaded", fetchImages);
heartShape.addEventListener('mouseover', effectOnHeartIn);
heartShape.addEventListener('mouseout', effectOnHeartOut);
heartShape.addEventListener('click', likeCounter);

function effectOnHeartOut() {
  heartShape.setAttribute("width", "25")
  heartShape.setAttribute("height", "25")
  heartShape.style.transform = "translateX(-0.1rem)"
}

function effectOnHeartIn() {
  heartShape.setAttribute("width", "30")
  heartShape.setAttribute("height", "30")
  heartShape.style.transform = "translateX(0.1rem)"
}

function likeCounter() {
  counterLikeHeart++;
  likeHeart.innerText = counterLikeHeart;

  const postModify = {
    likes: counterLikeHeart,
  }
  const putMethod = {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify(postModify)
  }
  fetch("http://localhost:3000/posts/" + idCard, putMethod)
    .then(response => response.json())
    .then(data => console.log("put method"))
    .catch(error => console.log(error));
}

function fetchPosts() {
  fetch("http://localhost:3000/posts")
    .then((response) => response.json())
    .then((data) => {
      allButtons = document.getElementsByClassName("all-buttons");
      for (let i = 0; i < data.length; i++) {
        if (titlePost[i]) {
          titlePost[i].innerText = data[i].title;
          bodyPost[i].innerText = data[i].body.substring(0, 85) + '...';
          if (allButtons[i]) {
            let hello = allButtons[i];
            allButtons[i].setAttribute("id", data[i].id);
          }
        }
      }
    })
}

fetch("https://api.unsplash.com/search/photos?query=national-geographic&per_page=9&color=blue&client_id=IjZZA7aI48XODGPFdLl7x5c4VhwcA7Y4nh7vwHHuCNM")
  .then((response) => response.json())
  .then((data) => {
    unsplashImageNav.style.backgroundImage = "url('https://source.unsplash.com/9wg5jCEPBsw/1600x900')";
  });

function fetchImages() {
  fetch("https://api.unsplash.com/search/photos?query=forest,mountains&orientation=landscape&per_page=100&client_id=IjZZA7aI48XODGPFdLl7x5c4VhwcA7Y4nh7vwHHuCNM")
    .then((response) => response.json())
    .then((data) => {
      allButtons = document.getElementsByClassName("all-buttons");
      for (let i = 0; i < data.results.length; i++) {
        if (allButtons[i]) {
          counterPhotos = Number(allButtons[i].getAttribute('id'))
          unsplashImage[i].style.backgroundImage = "url('https://source.unsplash.com/" + data.results[counterPhotos - 1].id + "/1600x900')";
        }
      }
    })
}

function showModalApi(event) {
  idCard = Number(event.target.id);
  let commentData = document.getElementsByClassName("comment-data");
  let commentCounter = 0;
  let userId;

  for (let w = 0; w < commentData.length; w++) {
    commentData[w].remove();
    w--;
  }

  fetch("http://localhost:3000/posts")
    .then((response) => response.json())
    .then((data) => {
        for (let x = 0; x < data.length; x++) {
          if (data[x].id === idCard) {
            modalTitle.innerText = data[x].title;
            infoModalBody.innerText = data[x].body;
            userId = data[x].userId;
            formControlTextareaOne.value = data[x].title;
            formControlTextareaTwo.value = data[x].body;
            if (data[x].likes) {
              likeHeart.innerText = data[x].likes;
            } else {
              likeHeart.innerText = 0;
            }
          }
        }
      })

      fetch("http://localhost:3000/users")
      .then((response) => response.json())
      .then((data) => {
        for (let x = 0; x < data.length; x++) {
          if (data[x].id === userId) {
            userData[0].innerHTML = '<small>' + data[x].username + '</small>';
            userData[1].innerHTML = '<small>' + data[x].email + '</small>';
          }
        }
      })

      fetch("http://localhost:3000/comments")
      .then((response) => response.json())
      .then((data) => {
        let z = 0;
        for (let x = 0; x < data.length; x++) {
          if (data[x].postId === idCard && commentCounter < 2) {
            const paragraphCommentName = document.createElement('p');
            paragraphCommentName.classList.add('my-0', 'fs-6', 'fw-bold', 'comment-data', 'border-top', 'mt-3', 'pt-3');
            commentContainer.insertBefore(paragraphCommentName, collapseCommentsContainer);
            const paragraphCommentEmail = document.createElement('p');
            paragraphCommentEmail.classList.add('my-0', 'fs-6', 'comment-data', 'fst-italic');
            commentContainer.insertBefore(paragraphCommentEmail, collapseCommentsContainer);
            const paragraphCommentComment = document.createElement('p');
            paragraphCommentComment.classList.add('my-0', 'fs-6', 'fw-light', 'comment-data');
            commentContainer.insertBefore(paragraphCommentComment, collapseCommentsContainer);
            commentData = document.getElementsByClassName("comment-data");
            commentCounter++;
            for (z; z < commentData.length; z += 3) {
              commentData[z].innerText = data[x].name;
              commentData[z + 1].innerText = data[x].email;
              commentData[z + 2].innerText = data[x].body;
            }
          } else if (data[x].postId === idCard && commentCounter >= 2) {
            const paragraphCommentName = document.createElement('p');
            paragraphCommentName.classList.add('my-0', 'fs-6', 'fw-bold', 'comment-data', 'border-top', 'mt-3', 'pt-3');
            collapseComments.appendChild(paragraphCommentName);
            const paragraphCommentEmail = document.createElement('p');
            paragraphCommentEmail.classList.add('my-0', 'fs-6', 'comment-data', 'fst-italic');
            collapseComments.appendChild(paragraphCommentEmail);
            const paragraphCommentComment = document.createElement('p');
            paragraphCommentComment.classList.add('my-0', 'fs-6', 'fw-light', 'comment-data');
            collapseComments.appendChild(paragraphCommentComment);
            commentData = document.getElementsByClassName("comment-data");
            for (z; z < commentData.length; z += 3) {
              commentData[z].innerText = data[x].name;
              commentData[z + 1].innerText = data[x].email;
              commentData[z + 2].innerText = data[x].body;
            }
          }
        }
      })

      fetch("https://api.unsplash.com/search/photos?query=forest,mountains&orientation=landscape&per_page=9&client_id=IjZZA7aI48XODGPFdLl7x5c4VhwcA7Y4nh7vwHHuCNM")
      .then((response) => response.json())
      .then((data) => {
        unsplashImageModal = document.getElementsByClassName("unsplash-image-modal");
        for (let l = 0; l < unsplashImageModal.length; l++) {
          if (unsplashImageModal[l]) {
            unsplashImageModal[l].style.backgroundImage = "url('https://source.unsplash.com/" + data.results[idCard - 1].id + "/1600x900')";
          }
        }
      });
    }

  let allButtonsValue;

  function deletePost() {
    const deleteMethod = {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
    }
    fetch("http://localhost:3000/posts/" + idCard, deleteMethod)
      .then(response => response.json())
      .then(data => console.log("delete method"))
      .catch(error => console.log(error))

  }

  function editPost() {
    const postModify = {
      title: formControlTextareaOne.value,
      body: formControlTextareaTwo.value
    }
    const putMethod = {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(postModify)
    }
    fetch("http://localhost:3000/posts/" + idCard, putMethod)
      .then(response => response.json())
      .then(data => console.log("put method"))
      .catch(error => console.log(error));
  }

  Array.from(document.getElementsByClassName('showmodal')).forEach((e) => {
    e.addEventListener('click', function (element) {
      element.preventDefault();
      if (e.hasAttribute('data-show-modal')) {
        showModal(e.getAttribute('data-show-modal'));
      }
    });
  });

  function showModal(modal) {
    const mid = document.getElementById(modal);
    let myModal = new bootstrap.Modal(mid);
    myModal.show();
  }

  function changeNameButtonComments() {
    if (counterBtnComments == true) {
      viewComments.innerText = "View less";
      counterBtnComments = false;
    } else {
      viewComments.innerText = "View comments";
      counterBtnComments = true;
    }
  }

  for (let cursorIterador=0; cursorIterador < cursor.length; cursorIterador++){
  cursor[cursorIterador].style.cursor = "pointer";
  }