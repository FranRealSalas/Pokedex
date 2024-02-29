const numeroPaginaActual = document.querySelector('#numero-pagina-actual');
const queryString = window.location.search;
const searchParams = new URLSearchParams(queryString);

const actualPage = searchParams.has("page") ? Number(searchParams.get("page")) : 1;
const botonSiguiente = document.querySelector('#boton-siguiente');
const botonAnterior = document.querySelector('#boton-anterior');
const cerrarModal = document.querySelector('#cerrar-modal');
const pokemonBuscado = document.querySelector("#barra-busqueda");
const botonBarraBusqueda = document.querySelector("#boton-barra-busqueda");

    
numeroPaginaActual.onkeydown = (event)=>{
    if(event.keyCode===13){
        if(numeroPaginaActual.value>109){
            searchParams.set('page', 109);
            window.location.search=searchParams.toString();
        }
        else if(numeroPaginaActual.value<1){
            searchParams.set('page', 1);
            window.location.search=searchParams.toString();
        }
        else{
            searchParams.set('page', numeroPaginaActual.value);
            window.location.search=searchParams.toString();
        }
    }
}

pokemonBuscado.onkeydown = (event)=>{
    if(event.keyCode===13){
        searchParams.set('nombre', (pokemonBuscado.value).toLowerCase());
        window.location.search=searchParams.toString();
    }
}

botonBarraBusqueda.onclick = ()=>{
    searchParams.set('nombre', (pokemonBuscado.value).toLowerCase());
    window.location.search=searchParams.toString();
}

export function cambiarEstadoBoton(boton, url){
    boton.disabled = url == null;
    if(boton.disabled){
        boton.href = url;
    }
}

botonSiguiente.onclick = ()=>{
    searchParams.set('page', actualPage+1);
    window.location.search=searchParams.toString();
}

botonAnterior.onclick = ()=>{
    searchParams.set('page', actualPage-1);
    window.location.search=searchParams.toString();
}

cerrarModal.onclick = ()=>{
    document.querySelector("#contenedor-modal").classList.add("oculto");
    document.querySelector(".contenedor-lista-pokemones").classList.remove("filtrado");
    document.querySelector("footer").classList.remove("oculto");
}

export function usarModal(elementoClick,pokemonActual){
    elementoClick.onclick=()=>{
        const imagenModal = document.querySelector('#imagen-modal');
        const nombreModal = document.querySelector('#nombre-modal');
        const tipoPokemonModal = document.querySelector('#tipo-pokemon-modal');
        imagenModal.src = "";
        nombreModal.textContent = "";
        tipoPokemonModal.textContent = "";

        const urlCard = `https://api.pokemontcg.io/v2/cards?q=name:${pokemonActual.name}`;
        fetch(urlCard)
            .then(respuesta=>respuesta.json())
            .then(data=>{
                imagenModal.src = data.data[1].images.small;
                nombreModal.textContent = data.data[1].name;
                tipoPokemonModal.textContent = `Tipo: ${data.data[1].types}`;
            })

        document.querySelector("#contenedor-modal").classList.remove("oculto");
        document.querySelector(".contenedor-lista-pokemones").classList.add("filtrado");
        document.querySelector("footer").classList.add("oculto");
    }
}

const logoPokemon = document.querySelector('#logo-pokemon');
logoPokemon.onclick = ()=>{
    searchParams.set('page', 1);
    searchParams.set('nombre', "");
    window.location.search=searchParams.toString();
}