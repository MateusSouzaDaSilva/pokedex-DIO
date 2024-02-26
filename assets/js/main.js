const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const limit = 5
let offset = 0

const maxRecords = 151


function loadPokemonItens(offset, limit) {


    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
        <li class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.number}</span>
        <a href="info.html?id=${pokemon.number}"><span class="name">${pokemon.name}</span></a>
    
        <div class="detail">
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${pokemon.type}">${type}</li>`).join('')}
            </ol>
            <img src="${pokemon.photo}" alt=">${pokemon.name}" srcset="">
        </div>
        
    </li>`).join('')
        pokemonList.innerHTML += newHtml

        const links = pokemonList.querySelectorAll('a');
        links.forEach((link) => {
            link.addEventListener('click', (event) => {
                // Impedir o comportamento padrão de clicar no link (navegação)
                event.preventDefault();
                // Obter o ID do Pokémon do parâmetro de consulta na URL
                const pokemonId = link.getAttribute('href').split('=')[1];
                // Redirecionar para a página de informações com o ID do Pokémon
                window.location.href = `info.html?id=${pokemonId}`;
            });
        });
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit 
    
    const qtdRecordNextPage = offset + limit

    if(qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})



