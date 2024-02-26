const numeroPaginaActual = document.querySelector('#numero-pagina-actual');
const queryString = window.location.search;
const searchParams = new URLSearchParams(queryString);

const actualPage = searchParams.has("page") ? Number(searchParams.get("page")) : 1;
const botonSiguiente = document.querySelector('#boton-siguiente');
const botonAnterior = document.querySelector('#boton-anterior');
const cerrarModal = document.querySelector('#cerrar-modal');
const pokemonBuscado = document.querySelector("#barra-busqueda");
    
numeroPaginaActual.onkeydown = (event)=>{
    if(event.keyCode===13){
        searchParams.set('page', numeroPaginaActual.value);
        window.location.search=searchParams.toString();
    }
}

pokemonBuscado.onkeydown = (event)=>{
    if(event.keyCode===13){
        searchParams.set('nombre', pokemonBuscado.value);
        window.location.search=searchParams.toString();
    }
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
        imagenModal.src = "";

        const urlCard = `https://api.pokemontcg.io/v2/cards?q=name:${pokemonActual.name}`
        fetch(urlCard)
            .then(respuesta=>respuesta.json())
            .then(data=>{
                imagenModal.src = data.data[1].images.small
            })

        document.querySelector("#contenedor-modal").classList.remove("oculto");
        document.querySelector(".contenedor-lista-pokemones").classList.add("filtrado");
        document.querySelector("footer").classList.add("oculto");
    }
}