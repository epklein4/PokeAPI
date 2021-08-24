import { useEffect, useState } from "react"

import queryFetch from "../utils/queryFetch"

const Abilities = ({ pokemonName }: { pokemonName: string }) => {
    const [abilities, setAbilities] = useState([""])

    useEffect(() => {
        const queryAbilities = async () => {
            const query = await queryFetch(`
                query {
                    getPokemon(name: "${pokemonName}") {
                        abilities {
                            name
                        }
                    }
                }
            `, { name: pokemonName }
            )
            console.log(query.data.getPokemon.abilities)
            setAbilities(query.data.getPokemon.abilities.map((ability: any) => {
                return ability.name;
            }))
        }
        queryAbilities()
    }, [pokemonName])

    return (
        <div className="pokemon__abilities">
            {abilities.map(ability => {
                return <p className="ability" key={ability}>{ability}</p>
            })}
        </div>
    )
}

export default Abilities
