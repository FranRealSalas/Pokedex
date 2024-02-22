const listaPokemones = document.querySelector('#lista-pokemones')

function crearPokemones(data){
    fetch('https://pokeapi.co/api/v2/pokemon?limit=18&offset=0')
        .then(respuesta => respuesta.json())
        .then(data => {
            console.log(data.sprites);
            (data.results).forEach((pokemon)=>{
                console.log(pokemon.url)
                fetch(pokemon.url)
                    .then(respuesta=>respuesta.json())
                    .then(data=>{
                        const $articulo = document.createElement('article');

                        const $imagen = document.createElement('img');
                        $imagen.src = data.sprites.front_default
                        $($articulo).append($imagen)

                        const $nombre = document.createElement('h2');
                        $nombre.textContent = `${pokemon.name}`
                        $($articulo).append($nombre);

                        $(listaPokemones).append($articulo)
                    })
            })
        })
}

crearPokemones();