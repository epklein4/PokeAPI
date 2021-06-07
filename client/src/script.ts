const pokemonList = document.getElementById('pokemon-list')
const pokemonChoice = document.getElementById('pokemon-choice')
const pokemonImage = document.getElementById('pokemon-image') as HTMLImageElement;

queryFetch(`
    query {
        getPokemonList {
          names
        }
    }
`).then(data => {
  data.data.getPokemonList.names.forEach(pokemon => {
    const option = document.createElement('option');
    option.value = pokemon;
    option.innerText = pokemon;
    pokemonList.append(option);
  });
})

pokemonChoice.addEventListener('change', async event => {
  const target = event.target as HTMLOptionElement;
  const pokemonValue = target.value;
  const pokemonSprite = await getPokemonImageURL(pokemonValue);
  pokemonImage.src = pokemonSprite;
})

function getPokemonImageURL(pokemonName: string) {
  return queryFetch(`
    {
      getPokemon(name: "${pokemonName}") {
        sprite
      }
    }
  `, { name: pokemonName }).then(pokemon => {
    return pokemon.data.getPokemon.sprite;
  })
}

function queryFetch(query, variables?) {
    return fetch('https://kny8blar39.execute-api.us-east-1.amazonaws.com/dev/graphql', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: query,
        variables: variables
      })
    }).then(res => res.json())
  }