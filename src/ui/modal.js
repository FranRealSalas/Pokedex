const queryString = window.location.search;
const searchParams = new URLSearchParams(queryString);
const botonCerrarModal = document.querySelector('#cerrar-modal');
const contenedorModal = document.querySelector('#contenedor-modal');

function cerrarModal(){
    document.querySelector("#contenedor-modal").classList.add("oculto");
    document.querySelector(".contenedor-lista-pokemones").classList.remove("filtrado");
    document.querySelector("footer").classList.remove("oculto");
    document.querySelector("#contenedor-carga").classList.remove("oculto");
}

botonCerrarModal.onclick = () => cerrarModal();

contenedorModal.onclick = () => cerrarModal();

function obtenerCartasModal(url){
    return  fetch(url)
                .then(respuesta=>respuesta.json())
                .then(data => data);
}

function ocultarCarga(){
    console.log("entro");
    let contenedor = document.querySelector('#carga');
    contenedor.classList.add("oculto");
    contenedor.computedStyleMap.opacity = "0";
}

export function usarModal(elementoClick,pokemonActual){
    elementoClick.onclick=()=>{
        const imagenModal = document.querySelector('#imagen-modal');
        const nombreModal = document.querySelector('#nombre-modal');
        const tipoPokemonModal = document.querySelector('#tipo-pokemon-modal');
        imagenModal.src = "";
        nombreModal.textContent = "";
        tipoPokemonModal.textContent = "";

        const cardActual = obtenerCartasModal(`https://api.pokemontcg.io/v2/cards?q=name:${pokemonActual.name}`);

        
        cardActual
        .then(pokemon =>{
                document.querySelector("#contenedor-carga").classList.add("oculto");
                if(pokemon.count === 0){
                    Swal.fire({
                        title: 'Error!',
                        text: 'No hay carta para este pokemon',
                        icon: 'error',
                        confirmButtonText: 'Salir'
                      })

                    cerrarModal();
                }
                else{
                    imagenModal.src = pokemon.data[1].images.small;
                    nombreModal.textContent = pokemon.data[1].name;
                    tipoPokemonModal.textContent = `Tipo: ${pokemon.data[1].types}`;
                }
            });

            document.querySelector("#contenedor-modal").classList.remove("oculto");
            document.querySelector(".contenedor-lista-pokemones").classList.add("filtrado");
            document.querySelector("footer").classList.add("oculto");
    }
}