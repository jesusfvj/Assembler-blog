const loadButton = document.getElementById("loadButton");
const cardCount = document.getElementById("cardCount");
const cardTotal = document.getElementById("cardTotal"); 
const cardLimit = 100;
const cardIncrease = 3;
const pageCount = Math.ceil((cardLimit / cardIncrease));
let currentPage = 2;

let cardDiv = `
<div class="row">
                <div class="div-card-container col-12 col-sm-12 col-md-4 col-lg-4" style="margin-bottom: 5rem;">
                    <div class="card">
                        <div class="unsplash-image bg-image card shadow-1-strong"
                            style="background-image: url('https://mdbootstrap.com/img/new/slides/003.jpg'); background-size: cover; background-position: center; height: 30rem;">
                            <div class="mask mask-custom" style="height: 100%; width: 100%; backdrop-filter: blur(2px);
            background: linear-gradient(10deg, rgba(0, 157, 255, 0.4),rgba(54, 0, 142, 0.4) 100%);">
                                <div class="card-body text-white text-start d-flex flex-column justify-content-between"
                                    style="height: 100%;">
                                    <div>
                                        <h5 class="card-title text-start h2">Card title 1</h5>
                                        <p class="card-text text-start h6 lh-lg my-5 fw-lighter">Lorem ipsum dolor sit
                                            amet,
                                            consectetur adipisicing elit. Sequi, labore?</p>
                                    </div>
                                    <div>
                                        <button id="0" type="button" class="btn btn-outline-light start all-buttons"
                                            data-bs-toggle="modal" data-bs-target="#exampleModal"
                                            style="width: 100%;">Read more</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="div-card-container col-12 col-sm-12 col-md-4 col-lg-4" style="margin-bottom: 5rem;">
                    <div class="card">
                        <div class="unsplash-image bg-image card shadow-1-strong"
                            style="background-image: url('https://mdbootstrap.com/img/new/slides/003.jpg'); background-size: cover; background-position: center; height: 30rem;">
                            <div class="mask mask-custom" style="height: 100%; width: 100%; backdrop-filter: blur(2px);
            background: linear-gradient(10deg, rgba(0, 157, 255, 0.4),rgba(54, 0, 142, 0.4) 100%);">
                                <div class="card-body text-white text-start d-flex flex-column justify-content-between"
                                    style="height: 100%;">
                                    <div>
                                        <h5 class="card-title text-start h2">Card title 1</h5>
                                        <p class="card-text text-start h6 lh-lg my-5 fw-lighter">Lorem ipsum dolor sit
                                            amet,
                                            consectetur adipisicing elit. Sequi, labore?</p>
                                    </div>
                                    <div>
                                        <button id="1" type="button" class="btn btn-outline-light start all-buttons"
                                            data-bs-toggle="modal" data-bs-target="#exampleModal"
                                            style="width: 100%;">Read more</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="div-card-container col-12 col-sm-12 col-md-4 col-lg-4" style="margin-bottom: 5rem;">
                    <div class="card">
                        <div class="unsplash-image bg-image card shadow-1-strong"
                            style="background-image: url('https://mdbootstrap.com/img/new/slides/003.jpg'); background-size: cover; background-position: center; height: 30rem;">
                            <div class="mask mask-custom" style="height: 100%; width: 100%; backdrop-filter: blur(2px);
            background: linear-gradient(10deg, rgba(0, 157, 255, 0.4),rgba(54, 0, 142, 0.4) 100%);">
                                <div class="card-body text-white text-start d-flex flex-column justify-content-between"
                                    style="height: 100%;">
                                    <div>
                                        <h5 class="card-title text-start h2">Card title 1</h5>
                                        <p class="card-text text-start h6 lh-lg my-5 fw-lighter">Lorem ipsum dolor sit
                                            amet,
                                            consectetur adipisicing elit. Sequi, labore?</p>
                                    </div>
                                    <div>
                                        <button id="2" type="button" class="btn btn-outline-light start all-buttons"
                                            data-bs-toggle="modal" data-bs-target="#exampleModal"
                                            style="width: 100%;">Read more</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
`;

cardTotal.innerHTML = cardLimit;


const handleButtonStatus = () => {
  if (pageCount === currentPage) {
    loadButton.classList.add("disabled");
    loadButton.setAttribute("disabled", true);
  }
};

const createCard = (index) => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = index;
  gridParentContainer.insertBefore(card, loadButton);
  card.innerHTML = cardDiv;
};

const addCards = (pageIndex) => {
  currentPage = pageIndex;

  handleButtonStatus();

  const startRange = (pageIndex - 1) * cardIncrease;
  const endRange =
    pageIndex * cardIncrease > cardLimit ? cardLimit : pageIndex * cardIncrease;
  
  cardCount.innerHTML = endRange;

  for (let i = startRange + 1; i <= endRange; i++) {
    createCard(i);
  }
};

window.onload = function () {
  addCards(currentPage);
  loadButton.addEventListener("click", () => {
    addCards(currentPage + 1);
  });
};

/*cardTotal.innerHTML = cardLimit;

loadButton.addEventListener("click", loadMore);

// 1. Define a number of cards to be added to the page each time the user clicks the button.
// 2. Detect when the total number of cards have been added and disable the button.

const handleButtonStatus = () => {
	if (pageCount === currentPage) {
		loadButton.classList.add("disabled");
		loadButton.setAttribute("disabled", true);
	}
  };

function loadMore(){
	console.log("hola")
	const createCard = (index) => {
		card.innerHTML = index;
		gridParentContainer.appendChild(cardDiv);
	  };

	  const addCards = (pageIndex) => {
		currentPage = pageIndex;
	   
		handleButtonStatus();
	   
		const startRange = (pageIndex - 1) * cardIncrease;
		const endRange =
		  pageIndex * cardIncrease > cardLimit ? cardLimit : pageIndex * cardIncrease;
		 
		cardCount.innerHTML = endRange;
	   
		for (let i = startRange + 1; i <= endRange; i++) {
		  createCard(i);
		}
	  };

	  addCards(); 

}






























/*let pagina = 1;
let cards = '';
let lastCard;

// Creamos el observador
let observador = new IntersectionObserver((entradas, observador) => {
	entradas.forEach(entrada => {
		if(entrada.isIntersecting){
			pagina++;
			cargarCards();
		}
	});
}, {
	rootMargin: '0px 0px 200px 0px',
	threshold: 1.0
});


const cargarCards = async() => {
	try {
		const respuesta = await fetch(`http://localhost:3000/posts/${pagina}`);
	
		// console.log(respuesta);

		// Si la respuesta es correcta
		if(respuesta.status === 200){
			const datos = await respuesta.json();
			
			datos.posts.forEach(card => {
				cards += `
                <div class="card">
                <div class="unsplash-image bg-image card shadow-1-strong"
                    style="background-image: url('https://mdbootstrap.com/img/new/slides/003.jpg'); background-size: cover; background-position: center; height: 30rem;">
                    <div class="mask mask-custom" style="height: 100%; width: 100%; backdrop-filter: blur(2px);
    background: linear-gradient(10deg, rgba(0, 157, 255, 0.4),rgba(54, 0, 142, 0.4) 100%);">
                        <div class="card-body text-white text-start d-flex flex-column justify-content-between"
                            style="height: 100%;">
                            <div>
                                <h5 class="card-title text-start h2">${datos.title} 1</h5>
                                <p class="card-text text-start h6 lh-lg my-5 fw-lighter">${datos.body}</p>
                            </div>
                            <div>
                                <button type="button" class="btn btn-outline-light start all-buttons"
                                    data-bs-toggle="modal" data-bs-target="#exampleModal"
                                    style="width: 100%;">Read more</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
				`;
			});

			document.getElementById('gridParentContainer').innerHTML = cards;

			if(pagina < 100){
				if(lastCard){
					observador.unobserve(lastCard);
				}
	
				const cardsEnPantalla = document.querySelectorAll('.contenedor .card');
				lastCard = cardsEnPantalla[cardsEnPantalla.length - 1];
				observador.observe(lastCard);
			}

		} else {
			console.log('Error');
		}

	} catch(error){
		console.log(error);
	}

}

cargarCards();*/