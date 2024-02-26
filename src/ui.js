const numeroPaginaActual = document.querySelector('#numero-pagina-actual');
const queryString = window.location.search;
const searchParams = new URLSearchParams(queryString);

const actualPage = searchParams.has("page") ? Number(searchParams.get("page")) : 1;
const botonSiguiente = document.querySelector('#boton-siguiente');
const botonAnterior = document.querySelector('#boton-anterior');
const cerrarModal = document.querySelector('#cerrar-modal');
    
numeroPaginaActual.onkeydown = (event)=>{
    if(event.keyCode===13){
        searchParams.set('page', numeroPaginaActual.value);
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
