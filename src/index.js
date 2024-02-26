import './ui.js';
import { cambiarEstadoBoton } from './ui.js';


const queryString = window.location.search;
const searchParams = new URLSearchParams(queryString);
const actualPage = searchParams.has("page") ? Number(searchParams.get("page")) : 1;

const listaPokemones = document.querySelector('#lista-pokemones');
const botonSiguiente = document.querySelector('#boton-siguiente');
const botonAnterior = document.querySelector('#boton-anterior');
const numeroPaginaActual = document.querySelector('#numero-pagina-actual');

function listarPokemones(limit){
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${(actualPage-1)*limit}`
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
                    $imagen.src = data.sprites.front_default
                    $($articulo).append($imagen)
                    
                    const $nombre = document.createElement('h2');
                    $nombre.textContent = `${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}`
                    $($articulo).append($nombre);
                    
                    $(listaPokemones).append($articulo)

                    $articulo.onclick=()=>{
                        const imagenModal = document.querySelector('#imagen-modal');
                        imagenModal.src = "";

                        const urlCard = `https://api.pokemontcg.io/v2/cards?q=name:${pokemon.name}`
                        fetch(urlCard)
                            .then(respuesta=>respuesta.json())
                            .then(data=>{
                                console.log(data);
                                imagenModal.src = data.data[0].images.small
                            })

                        document.querySelector("#contenedor-modal").classList.remove("oculto");
                        document.querySelector(".contenedor-lista-pokemones").classList.add("filtrado");
                        document.querySelector("footer").classList.add("oculto");
                    }

                })
            })
    })
}

listarPokemones(12);