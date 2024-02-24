const listaPokemones = document.querySelector('#lista-pokemones');
const botonSiguiente = document.querySelector('#boton-siguiente');
const botonAnterior = document.querySelector('#boton-anterior');
const spanPaginaActual = document.querySelector('#numero-pagina-actual');
let actualOffset = 0;

function listarPokemones(limit, offset){
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    fetch(url)
    .then(respuesta => respuesta.json())
    .then(data => {
        
        listaPokemones.innerHTML = "";
        spanPaginaActual.innerHTML = `${(offset/limit)+1}`;
        cambiarEstadoBoton(botonSiguiente, data.next);
        cambiarEstadoBoton(botonAnterior, data.previous);

        (data.results).forEach((pokemon)=>{
            fetch(pokemon.url)
                .then(respuesta=>respuesta.json())
                .then(data=>{
                    const $articulo = document.createElement('article');

                    const $imagen = document.createElement('img');
                    $imagen.src = data.sprites.front_default
                    $($articulo).append($imagen)

                    const $nombre = document.createElement('h2');
                    $nombre.textContent = `${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}`
                    $($articulo).append($nombre);

                    $(listaPokemones).append($articulo)
                })
            })
    })
}

function cambiarEstadoBoton(boton, url){
    boton.disabled = url == null;
    if(boton.disabled){
        boton.href = url;
    }
}

botonSiguiente.onclick = ()=>{
    actualOffset += 15;
    listarPokemones(15, actualOffset)
}
botonAnterior.onclick = ()=>{
    actualOffset -= 15;
    listarPokemones(15, actualOffset)
}

listarPokemones(15, 0);