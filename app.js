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
let counterLikeHeart;
let counterBtnComments = true;
let arrayLikes = [];
let allButtonsValue;

gridParentContainer.addEventListener('click', showModalApi, false);
editButton.addEventListener('click', editPost);
buttonComments.addEventListener('click', changeNameButtonComments);
deleteButton.addEventListener('click', deletePost);
deleteButton.addEventListener('click', fetchPosts);
document.addEventListener("DOMContentLoaded", fetchPosts);
document.addEventListener("DOMContentLoaded", fetchImageHeader);
document.addEventListener("DOMContentLoaded", fetchImages);
document.addEventListener("DOMContentLoaded", setArrayLikes);
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
  arrayLikes = JSON.parse(localStorage.getItem("likes"));

  if (arrayLikes[idCard] == false) {
    counterLikeHeart++;
    likeHeart.innerText = counterLikeHeart;
    arrayLikes[idCard] = true;
    localStorage.setItem("likes", JSON.stringify(arrayLikes));

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
    counterLikeHeart = 0;
  }
}

function setArrayLikes() {
  fetch("http://localhost:3000/posts")
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        arrayLikes.push(false);
      }
      localStorage.setItem("likes", JSON.stringify(arrayLikes));
    })
}

function fetchPosts() {
  fetch("http://localhost:3000/posts")
    .then((response) => response.json())
    .then((data) => {
      allButtons = document.getElementsByClassName("all-buttons");
      for (let i = 0; i < data.length; i++) {
        if (allButtons[i]) {
          titlePost[i].innerText = data[i].title;
          bodyPost[i].innerText = data[i].body.substring(0, 85) + '...';
          allButtons[i].setAttribute("id", data[i].id);
        }
      }
    })
}

function fetchImageHeader() {
  fetch("https://api.unsplash.com/search/photos?query=national-geographic&per_page=9&color=blue&client_id=IjZZA7aI48XODGPFdLl7x5c4VhwcA7Y4nh7vwHHuCNM")
    .then((response) => response.json())
    .then((data) => {
      unsplashImageNav.style.backgroundImage = "url('https://source.unsplash.com/9wg5jCEPBsw/1600x900')";
    });
}

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

  for (let i = 0; i < commentData.length; i++) {
    commentData[i].remove();
    i--;
  }

  fetch("http://localhost:3000/posts")
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].id === idCard) {
          modalTitle.innerText = data[i].title;
          infoModalBody.innerText = data[i].body;
          userId = data[i].userId;
          formControlTextareaOne.value = data[i].title;
          formControlTextareaTwo.value = data[i].body;
          if (data[i].likes) {
            likeHeart.innerText = data[i].likes;
            counterLikeHeart = data[i].likes;
          } else {
            likeHeart.innerText = 0;
            counterLikeHeart = 0;
          }
        }
      }
    })

  fetch("http://localhost:3000/users")
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].id === userId) {
          userData[0].innerHTML = '<small>' + data[i].username + '</small>';
          userData[1].innerHTML = '<small>' + data[i].email + '</small>';
        }
      }
    })

  fetch("http://localhost:3000/comments")
    .then((response) => response.json())
    .then((data) => {
      let j = 0;
      for (let i = 0; i < data.length; i++) {
        if (data[i].postId === idCard && commentCounter < 2) {
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
          for (j; j < commentData.length; j += 3) {
            commentData[j].innerText = data[i].name;
            commentData[j + 1].innerText = data[i].email;
            commentData[j + 2].innerText = data[i].body;
          }
        } else if (data[i].postId === idCard && commentCounter >= 2) {
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
          for (j; j < commentData.length; j += 3) {
            commentData[j].innerText = data[i].name;
            commentData[j + 1].innerText = data[i].email;
            commentData[j + 2].innerText = data[i].body;
          }
        }
      }
    })

  fetch("https://api.unsplash.com/search/photos?query=forest,mountains&orientation=landscape&per_page=9&client_id=IjZZA7aI48XODGPFdLl7x5c4VhwcA7Y4nh7vwHHuCNM")
    .then((response) => response.json())
    .then((data) => {
      unsplashImageModal = document.getElementsByClassName("unsplash-image-modal");
      for (let i = 0; i < unsplashImageModal.length; i++) {
        if (unsplashImageModal[i]) {
          unsplashImageModal[i].style.backgroundImage = "url('https://source.unsplash.com/" + data.results[idCard - 1].id + "/1600x900')";
        }
      }
    });
}

function deletePost() {
  const deleteMethod = {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
  }
  fetch("http://localhost:3000/posts/" + idCard, deleteMethod)
    .then(response => response.json())
    .then(data => {
      return reloadContent();
    })
    .catch(error => console.log(error))
}

function reloadContent() {
  fetchPosts();
  fetchImages();
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

for (let cursorIterador = 0; cursorIterador < cursor.length; cursorIterador++) {
  cursor[cursorIterador].style.cursor = "pointer";
}