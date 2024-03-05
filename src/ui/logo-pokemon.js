const queryString = window.location.search;
const searchParams = new URLSearchParams(queryString);
const logoPokemon = document.querySelector('#logo-pokemon');

logoPokemon.onclick = ()=>{
    searchParams.set('page', 1);
    searchParams.set('nombre', "");
    window.location.search=searchParams.toString();
}