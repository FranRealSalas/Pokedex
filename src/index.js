const listaPokemones = document.querySelector('#lista-pokemones')

fetch('https://pokeapi.co/api/v2/pokemon?limit=102&offset=0')
    .then(respuesta => respuesta.json())
    .then(data => {
        (data.results).forEach((pokemones,index)=>{
            fetch(pokemones.url)
                .then(respuesta=>respuesta.json())
                .then(data=>{
                    console.log(data)
                    const $articulo = document.createElement('article');

                    const $imagen = document.createElement('img');
                    $imagen.src = data.sprites.back_default
                    $($articulo).append($imagen)

                    const $elemento = document.createElement('li');
                    $elemento.textContent = `${pokemones.name}`
                    $($articulo).append($elemento);

                    $(listaPokemones).append($articulo)
                })
        })
    })