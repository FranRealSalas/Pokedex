const queryString = window.location.search;
const searchParams = new URLSearchParams(queryString);

const numeroPaginaActual = document.querySelector('#numero-pagina-actual');
const actualPage = searchParams.has("page") ? Number(searchParams.get("page")) : 1;
const botonSiguiente = document.querySelector('#boton-siguiente');
const botonAnterior = document.querySelector('#boton-anterior');


export function verificarPagina(){
    if(searchParams.get('page')>109){
        searchParams.set('page',109);
        window.location.search=searchParams.toString();
    }
    else if(searchParams.get('page')<1){
        searchParams.set('page',1);
        window.location.search=searchParams.toString();
    }
}

numeroPaginaActual.onkeydown = (event)=>{
    if(event.keyCode===13){
        searchParams.set('page', numeroPaginaActual.value);
        window.location.search=searchParams.toString();
    }
}

export function cambiarEstadoBotonesPaginacion(botonSiguiente, botonAnterior, pagMax){
    botonSiguiente.disabled = false;
    botonAnterior.disabled = false;
    if(actualPage===pagMax){
        botonSiguiente.disabled=true;
    }
    if(actualPage===1){
        botonAnterior.disabled=true;
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