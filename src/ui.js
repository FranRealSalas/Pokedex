const queryString = window.location.search;
const searchParams = new URLSearchParams(queryString);

const numeroPaginaActual = document.querySelector('#numero-pagina-actual');
const actualPage = searchParams.has("page") ? Number(searchParams.get("page")) : 1;

const botonSiguiente = document.querySelector('#boton-siguiente');
const botonAnterior = document.querySelector('#boton-anterior');
const cerrarModal = document.querySelector('#cerrar-modal');
const pokemonBuscado = document.querySelector("#barra-busqueda");
const botonBarraBusqueda = document.querySelector("#boton-barra-busqueda");
const contenedorModal = document.querySelector('#contenedor-modal');


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

botonBarraBusqueda.onclick = ()=>{
    searchParams.set('nombre', (pokemonBuscado.value).toLowerCase());
    window.location.search=searchParams.toString();
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

cerrarModal.onclick = ()=>{
    document.querySelector("#contenedor-modal").classList.add("oculto");
    document.querySelector(".contenedor-lista-pokemones").classList.remove("filtrado");
    document.querySelector("footer").classList.remove("oculto");
}

contenedorModal.onclick = ()=>{
    document.querySelector("#contenedor-modal").classList.add("oculto");
    document.querySelector(".contenedor-lista-pokemones").classList.remove("filtrado");
    document.querySelector("footer").classList.remove("oculto");
}

function obtenerCartasModal(url){
    return  fetch(url)
                .then(respuesta=>respuesta.json())
                .then(data => data);
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
                imagenModal.src = pokemon.data[1].images.small;
                nombreModal.textContent = pokemon.data[1].name;
                tipoPokemonModal.textContent = `Tipo: ${pokemon.data[1].types}`;
            });

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

function obtenerBarraBusqueda(){
    return  fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
                .then(resultados => resultados.json())
                .then(data => data.results)
}

export const todosLosPokemones = await obtenerBarraBusqueda();
const $listaBusqueda = document.querySelector('#lista-busqueda');

function autocompletarBarraBusqueda(){
    $listaBusqueda.innerHTML = "";

    if(pokemonBuscado.value===""){
        return;
    }

    todosLosPokemones.filter(pokemon => pokemon.name.startsWith(pokemonBuscado.value)).forEach(pokemon => {
        const $a = document.createElement('a');
        const $elemento = document.createElement('li');
        $elemento.textContent = pokemon.name;

        searchParams.set('nombre', (pokemon.name).toLowerCase());
        searchParams.set('page', 1);
        $a.href="?"+searchParams.toString();

        $a.appendChild($elemento)
        $listaBusqueda.appendChild($a)
    });
}

pokemonBuscado.onkeyup = (event)=>{
    if(event.keyCode===13){
        searchParams.set('nombre', (pokemonBuscado.value).toLowerCase());
        window.location.search=searchParams.toString();
        return;
    }
    autocompletarBarraBusqueda();
}