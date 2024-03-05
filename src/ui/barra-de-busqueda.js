const queryString = window.location.search;
const searchParams = new URLSearchParams(queryString);
const botonBarraBusqueda = document.querySelector("#boton-barra-busqueda");
const pokemonBuscado = document.querySelector("#barra-busqueda");

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

botonBarraBusqueda.onclick = ()=>{
    searchParams.set('nombre', (pokemonBuscado.value).toLowerCase());
    window.location.search=searchParams.toString();
}