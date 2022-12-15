let pagina = 2;
let card = '';
let lastCard;

// Creamos el observador
let observador = new IntersectionObserver((entradas, observador) => {
	console.log(entradas);

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
				card += `
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

			document.getElementById('gridParentContainer').innerHTML = card;

			if(pagina < 1000){
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

cargarCards();