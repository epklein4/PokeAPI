import { useState, useEffect } from "react";

const ListData = () => {
    const PokemonList = async () => {
        const query = await queryFetch(`
            query {
                getPokemonList {
                    names
                }
            }
        `)
        await query.data.getPokemonList.names.map((name: string) => {
            setNames([...names, {value: name, label: name}])
        })
    }

    useEffect(() => { PokemonList() })

    const [names, setNames] = useState([{value: "", label: ""}]);

    return (
        <datalist>
            {names.map(name => (
                <option
                  key={name.value}
                  value={name.value}
                >
                  {name.label}
                </option>
            ))}
        </datalist>
    )
}

const queryFetch = async (query: string, variables?: any) => {
    const result = await fetch(
        'https://kny8blar39.execute-api.us-east-1.amazonaws.com/dev/graphql', 
        {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                query: query,
                variables: variables
            })
        }
    )
    return result.json();
}

export default ListData
