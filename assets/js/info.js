document.addEventListener("DOMContentLoaded", function() {
    // Função para recuperar o ID do Pokémon da URL
    function getPokemonIdFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id');
    }

    // Função para carregar as informações do Pokémon com o ID fornecido
    function loadPokemonInfo(pokemonId) {
        // Aqui você pode fazer uma solicitação para obter informações específicas do Pokémon com o ID fornecido
        // Exemplo:
         fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
             .then(response => response.json())
             .then(pokemon => {
               // Exibir as informações do Pokémon
                 const pokemonInfoElement = document.getElementById('pokemonInfo');
                 pokemonInfoElement.innerHTML = `
                    <div class="card ${pokemon.types.type}">
                    <div class="card-content">
                        <h2 class="name">${pokemon.name}</h2>
                        <div class="pokeImage">
                            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                        </div>
                        <p>Height: ${pokemon.height}</p>
                        <p>Weight: ${pokemon.weight}</p>
                    </div>
                    </div>
                 `;
             })
             .catch(error => {
                 console.error('Error fetching Pokémon data:', error);
             });
        
        // Este é apenas um exemplo básico de exibição do ID do Pokémon
        const pokemonInfoElement = document.getElementById('pokemonInfo');
        pokemonInfoElement.innerHTML = `<p>Showing info for Pokémon with ID: ${pokemonId}</p>`;
    }

    // Carregar as informações do Pokémon ao carregar a página
    const pokemonId = getPokemonIdFromUrl();
    if (pokemonId) {
        loadPokemonInfo(pokemonId);
    } else {
        // Caso o ID do Pokémon não seja encontrado na URL
        const pokemonInfoElement = document.getElementById('pokemonInfo');
        pokemonInfoElement.innerHTML = `<p>No Pokémon ID provided in the URL.</p>`;
    }
});