import { useEffect, useState } from "react"
import queryFetch from "../utils/queryFetch"

const Sprite = ({ pokemonName }: { pokemonName: string }) => {
    const [pokemonSprite, setPokemonSprite] = useState("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png")

    useEffect(() => {
        const querySprite = async (pokemonName: string) => {
            const pokemon = await queryFetch(`
                query {
                    getPokemon(name: "${pokemonName}") {
                        sprite
                    }
                }
            `, { name: pokemonName }
            )
            setPokemonSprite(pokemon.data.getPokemon.sprite);
        }
        try { querySprite(pokemonName) }
        catch { console.error("Failed to find Pokemon") }
    }
        , [pokemonName]
    )

    return (
        <img className="pokemon__sprite" src={pokemonSprite} alt="" />
    )
}

export default Sprite
