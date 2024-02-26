import './ui.js';
import { cambiarEstadoBoton } from './ui.js';
import {usarModal} from './ui.js';

const queryString = window.location.search;
const searchParams = new URLSearchParams(queryString);
const actualPage = searchParams.has("page") ? Number(searchParams.get("page")) : 1;
const pokemonBuscadoActual = searchParams.has("nombre") ? searchParams.get("nombre") : "";

const listaPokemones = document.querySelector('.lista-pokemones');
const botonSiguiente = document.querySelector('#boton-siguiente');
const botonAnterior = document.querySelector('#boton-anterior');
const numeroPaginaActual = document.querySelector('#numero-pagina-actual');

function listarPokemones(limit){
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonBuscadoActual}?limit=${limit}&offset=${(actualPage-1)*limit}`;

    if(pokemonBuscadoActual === ""){
        fetch(url)
            .then(respuesta => respuesta.json())
            .then(data => {
                listaPokemones.innerHTML = "";
                numeroPaginaActual.value = `${(actualPage)}`;
                cambiarEstadoBoton(botonSiguiente, data.next);
                cambiarEstadoBoton(botonAnterior, data.previous);
                
                (data.results).forEach((pokemon)=>{
                    fetch(pokemon.url)
                        .then(respuesta=>respuesta.json())
                        .then(data=>{
                            const $articulo = document.createElement('article');
                            $articulo.classList.add("pokemon-articulo");
                            
                            const $imagen = document.createElement('img');
                            $imagen.src = data.sprites.front_default;
                            $($articulo).append($imagen);
                            
                            const $nombre = document.createElement('h2');
                            $nombre.textContent = `${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}`;
                            $($articulo).append($nombre);
                            
                            $(listaPokemones).append($articulo);
                            
                            usarModal($articulo,pokemon);
                    })
                })
        })
    }
    else{
        fetch(url)
            .then(respuesta => respuesta.json())
            .then(data => {
                console.log(data);
                listaPokemones.innerHTML = "";
                numeroPaginaActual.value = `${(actualPage)}`;
                cambiarEstadoBoton(botonSiguiente, data.next);
                cambiarEstadoBoton(botonAnterior, data.previous);

                const $articulo = document.createElement('article');
                $articulo.classList.add("pokemon-articulo");
                
                const $imagen = document.createElement('img');
                $imagen.src = data.sprites.front_default;
                $($articulo).append($imagen);
                
                const $nombre = document.createElement('h2');
                $nombre.textContent = `${data.name.charAt(0).toUpperCase() + data.name.slice(1)}`;
                $($articulo).append($nombre);
                
                $(listaPokemones).append($articulo);
                listaPokemones.className = "lista-pokemones-simple";
                
                usarModal($articulo,data);
        })
    }
}

listarPokemones(12);