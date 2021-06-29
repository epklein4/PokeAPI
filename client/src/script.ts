const pokemonList = document.getElementById('pokemon-list')
const pokemonImage = document.getElementById('pokemon-image') as HTMLImageElement;
const abilities = document.getElementById('abilities');

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

pokemonList.addEventListener('change', async event => {
  const currentAbilities = document.getElementsByClassName("ability");
  while (currentAbilities[0]) {
    abilities.removeChild(currentAbilities[0]);
  }

  const target = event.target as HTMLOptionElement;
  const pokemonValue = target.value;
  const pokemon = await getPokemon(pokemonValue);
  pokemonImage.src = pokemon.sprite;
  pokemon.abilities.forEach(ability => {
    const newAbility = document.createElement('div');
    newAbility.innerText = ability.name;
    newAbility.className = "ability"
    abilities.appendChild(newAbility);
  });
})

function getPokemon(pokemonName: string) {
  return queryFetch(`
    {
      getPokemon(name: "${pokemonName}") {
        sprite
        abilities {
          name
        }
      }
    }
  `, { name: pokemonName }).then(pokemon => {
    return pokemon.data.getPokemon;
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