import './ui/paginacion.js';
import './ui/barra-de-busqueda.js'
import './ui/logo-pokemon.js'
import './ui/modal.js'
import { cambiarEstadoBotonesPaginacion } from './ui/paginacion.js';
import { usarModal } from './ui/modal.js';
import { verificarPagina } from './ui/paginacion.js';
import { todosLosPokemones } from './ui/barra-de-busqueda.js';

const queryString = window.location.search;
const searchParams = new URLSearchParams(queryString);
const actualPage = searchParams.has("page") ? Number(searchParams.get("page")) : 1;
const pokemonBuscadoActual = searchParams.has("nombre") ? searchParams.get("nombre") : "";

const listaPokemones = document.querySelector('.lista-pokemones');
const botonSiguiente = document.querySelector('#boton-siguiente');
const botonAnterior = document.querySelector('#boton-anterior');
const numeroPaginaActual = document.querySelector('#numero-pagina-actual');
let totalPaginas = document.querySelector("#total-paginas");

function obtenerPokemones(limit, nombrePokemon){
    const url = `https://pokeapi.co/api/v2/pokemon/${nombrePokemon}?limit=${limit}&offset=${(actualPage-1)*limit}`;

    return  fetch(url)
        .then(respuesta => respuesta.json())
        .then(data => data);
}

numeroPaginaActual.value = `${(actualPage)}`;

function mostrarPokemones(limit){
    listaPokemones.innerHTML = "";

    const datosPokemon = obtenerPokemones(12,"");

    datosPokemon
        .then(pokemon=>{
            totalPaginas.textContent = `/ ${Math.ceil((pokemon.count)/limit)}`;

            cambiarEstadoBotonesPaginacion(botonSiguiente, botonAnterior, Number((totalPaginas.textContent).slice(2)));
            
            pokemon.results.forEach((pokemon,index) =>{
                const $articulo = document.createElement('article');
                $articulo.classList.add("pokemon-articulo");
        
                const $imagen = document.createElement('img');
                $imagen.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${((pokemon.url).split("/")[6])}.png`;
                $($articulo).append($imagen);
                
                const $nombre = document.createElement('h2');
                $nombre.textContent = `${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}`;
                $($articulo).append($nombre);
                
                $(listaPokemones).append($articulo);
                
                usarModal($articulo,pokemon);
            });
    });
}

function mostrarPokemonSimple(){ 
    listaPokemones.innerHTML = "";
    const pokemonesEncontrados = todosLosPokemones.filter(pokemon => pokemon.name.startsWith(pokemonBuscadoActual));

    pokemonesEncontrados
        .filter((pokemon,index)=>index<actualPage*12 && index>=(actualPage-1)*12)
            .forEach(pokemon => { 
                const datosPokemon = obtenerPokemones(12, pokemon.name);

                datosPokemon
                    .then(pokemon=>{
                        totalPaginas.textContent = `/ ${Math.ceil((pokemonesEncontrados.length)/12)}`;

                        cambiarEstadoBotonesPaginacion(botonSiguiente, botonAnterior, Number((totalPaginas.textContent).slice(2)));

                        const $articulo = document.createElement('article');
                        $articulo.classList.add("pokemon-articulo");
                        
                        if(pokemon.sprites.front_default != null){
                            const $imagen = document.createElement('img');
                            $imagen.src = pokemon.sprites.front_default;
                            $($articulo).append($imagen);
                        }
                        
                        
                        const $nombre = document.createElement('h2');
                        $nombre.textContent = `${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}`;
                        $($articulo).append($nombre);
                        
                        $(listaPokemones).append($articulo);
                        listaPokemones.className = "lista-pokemones";
                        
                        usarModal($articulo,pokemon);
                });
            });
}

if(pokemonBuscadoActual===""){
    mostrarPokemones(12);
}
else{
    mostrarPokemonSimple(12);
}

verificarPagina();