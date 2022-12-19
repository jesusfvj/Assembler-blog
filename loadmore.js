const loadButton = document.getElementById("loadButton");
const cardCount = document.getElementById("cardCount");
const cardTotal = document.getElementById("cardTotal");
const buttonAndPostCounter = document.getElementById("buttonAndPostCounter");
let cardLimit;
let cardIncrease = 0;
const pageCount = Math.ceil((cardLimit / cardIncrease));
let currentPage = 1;
let endRange;
let counterPositionPage = 0;
let cardsCounter = 9;
let cardDiv = `
                <div class="div-card-container col-10 col-sm-8 col-md-4 col-lg-4" style="margin-bottom: 5rem;">
                    <div class="card">
                        <div class="unsplash-image bg-image card shadow-1-strong"
                            style="background-image: url('https://mdbootstrap.com/img/new/slides/121.jpg'); background-size: cover; background-position: center; height: 30rem;">
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
                                        <button type="button" class="btn btn-outline-light start all-buttons"
                                            data-bs-toggle="modal" data-bs-target="#exampleModal"
                                            style="width: 100%;">Read more</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="div-card-container col-10 col-sm-8 col-md-4 col-lg-4" style="margin-bottom: 5rem;">
                    <div class="card">
                        <div class="unsplash-image bg-image card shadow-1-strong"
                            style="background-image: url('https://mdbootstrap.com/img/new/slides/121.jpg'); background-size: cover; background-position: center; height: 30rem;">
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
                                        <button type="button" class="btn btn-outline-light start all-buttons"
                                            data-bs-toggle="modal" data-bs-target="#exampleModal"
                                            style="width: 100%;">Read more</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="div-card-container col-10 col-sm-8 col-md-4 col-lg-4" style="margin-bottom: 5rem;">
                    <div class="card">
                        <div class="unsplash-image bg-image card shadow-1-strong"
                            style="background-image: url('https://mdbootstrap.com/img/new/slides/121.jpg'); background-size: cover; background-position: center; height: 30rem;">
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
                                        <button type="button" class="btn btn-outline-light start all-buttons"
                                            data-bs-toggle="modal" data-bs-target="#exampleModal"
                                            style="width: 100%;">Read more</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
`;

deleteButton.addEventListener('click', updateNumberOfCards);
loadButton.addEventListener('click', updatePostsData);
loadButton.addEventListener("click", () => {
    addCards(currentPage + 1);
});
loadButton.addEventListener('click', function () {
    setTimeout(function () {
        divCardContainer = document.getElementsByClassName("div-card-container");
        for (let i = 99; i >= cardLimit; i--) {
            if (divCardContainer[i]) {
                divCardContainer[i].style.display = "none";
            }
        }
    }, 100);
});

function updatePostsData() {
    cardIncrease = 3;
    cardsCounter += 9;
    if (cardsCounter < cardLimit) {
        cardCount.innerText = cardsCounter;
    } else {
        cardsCounter = cardLimit;
        cardCount.innerText = cardLimit;
    }
    fetchPosts();
    fetchImages();
    setIdentificationToDivs();
}


cardLimit = localStorage.getItem("cardLimit");
if (cardLimit == null) {
    cardLimit = 99;
    cardTotal.innerText = cardLimit;
    localStorage.setItem("cardLimit", cardLimit);
} else {
    cardTotal.innerText = cardLimit;
}

function updateNumberOfCards() {
    cardLimit--;
    localStorage.setItem("cardLimit", cardLimit);
    setTimeout(function () {
        cardTotal.innerText = cardLimit;
    }, 800)

}


const handleButtonStatus = () => {
    if (cardsCounter == cardLimit) {
        loadButton.classList.add("disabled");
        loadButton.setAttribute("disabled", true);
    }
};

const createCard = (index) => {
    const card = document.createElement("div");
    card.className = "row d-flex flex-row justify-content-center align-items-center";
    gridParentContainer.insertBefore(card, buttonAndPostCounter);
    card.innerHTML = cardDiv;
};

const addCards = (pageIndex) => {
    currentPage = pageIndex;
    handleButtonStatus();
    const startRange = (pageIndex - 1) * cardIncrease;
    endRange =
        pageIndex * cardIncrease > cardLimit ? cardLimit : pageIndex * cardIncrease;
    for (let i = startRange + 1; i <= endRange; i++) {
        createCard(i);
    }
};