const titlePost = document.getElementsByClassName("card-title");
const bodyPost = document.getElementsByClassName("card-text");
const cardBody = document.getElementsByClassName("card-body");
const gridParentContainer = document.getElementById("gridParentContainer");
const modalTitle = document.getElementsByClassName("modal-title")[0];
const infoModalBody = document.getElementsByClassName("info-modal-body")[0];
const unsplashImageModal = document.getElementsByClassName("unsplash-image-modal")[0];
const unsplashImageNav = document.getElementsByClassName("unsplash-image-nav")[0];
const userData = document.getElementsByClassName("user-data");
const unsplashImage = document.getElementsByClassName("unsplash-image");
const commentContainer = document.getElementsByClassName("comment-container")[0];
const commentButton = document.getElementsByClassName("comment-button")[0];
const collapseComments = document.getElementsByClassName("collapse-comments")[0];
const collapseCommentsContainer = document.getElementsByClassName("collapse-comments-container")[0];
let idCard;

gridParentContainer.addEventListener('click', showModalApi, false);

fetch("http://localhost:3000/posts")
.then((response) => response.json())
.then((data) => {
  for(let i=0; i<data.length; i++){
    titlePost[i].innerText = data[i].title;
    bodyPost[i].innerText = data[i].body.substring(0, 75) + '...';
  }
})

fetch("https://api.unsplash.com/search/photos?query=forest,mountains&orientation=landscape&per_page=9&client_id=IjZZA7aI48XODGPFdLl7x5c4VhwcA7Y4nh7vwHHuCNM")
.then((response) => response.json())
.then((data) => {
  for(let i=0; i<100; i++){
    unsplashImage[i].style.backgroundImage = "url('https://source.unsplash.com/" + data.results[i].id + "/1600x900')";
  }
})

fetch("https://api.unsplash.com/search/photos?query=national-geographic&per_page=9&color=blue&client_id=IjZZA7aI48XODGPFdLl7x5c4VhwcA7Y4nh7vwHHuCNM")
.then((response) => response.json())
.then((data) => {
  unsplashImageNav.style.backgroundImage = "url('https://source.unsplash.com/9wg5jCEPBsw/1600x900')";
});

function showModalApi(event){
  idCard = Number(event.target.id);
  let commentData = document.getElementsByClassName("comment-data");
  let commentCounter = 0;
  let userId;

    for(let w=0; w<commentData.length; w++){
      commentData[w].remove();
      w--;
    }

  fetch("http://localhost:3000/posts")
  .then((response) => response.json())
  .then((data) => {
      modalTitle.innerText = data[idCard].title;
      infoModalBody.innerText = data[idCard].body;
      userId = data[idCard].userId;
  })

  fetch("http://localhost:3000/users")
    .then((response) => response.json())
    .then((data) => {
      for(let x=0; x<data.length; x++){
        if(data[x].id === userId){
          userData[0].innerHTML = '<small>' + data[x].username + '</small>';
          userData[1].innerHTML = '<small>' + data[x].email + '</small>';
        }
      }
  })

  fetch("http://localhost:3000/comments")
    .then((response) => response.json())
    .then((data) => {
      let z=0;
      for(let x=0; x<data.length; x++){
        if(data[x].postId === idCard+1 && commentCounter<2){
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
          for(z;z<commentData.length;z+=3){
            commentData[z].innerHTML = '<u>' + data[x].name + '</u>';
            commentData[z+1].innerText = data[x].email;
            commentData[z+2].innerText = data[x].body;
          }
        }
        else if (data[x].postId === idCard+1 && commentCounter >= 2){
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
          for(z;z<commentData.length;z+=3){
            commentData[z].innerHTML = '<u>' + data[x].name + '</u>';
            commentData[z+1].innerText = data[x].email;
            commentData[z+2].innerText = data[x].body;
        }
      }
    }
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

Array.from(document.getElementsByClassName('showmodal')).forEach( (e) => {
  e.addEventListener('click', function(element) {
    element.preventDefault();
    if (e.hasAttribute('data-show-modal')) {
      showModal(e.getAttribute('data-show-modal'));
    }
  });
});
// Show modal dialog
function showModal(modal) {
  const mid = document.getElementById(modal);
  let myModal = new bootstrap.Modal(mid);
  myModal.show();
}