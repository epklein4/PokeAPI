import { useState, useEffect } from "react";
import queryFetch from "../utils/queryFetch";

const ListData = ({ id }: {id: string}) => {
    const [names, setNames] = useState([{value: "", label: ""}]);
    
    useEffect(() => {
        const PokemonList = async () => {
            const query = await queryFetch(`
                query {
                    getPokemonList {
                        names
                    }
                }
            `)
            return await query.data.getPokemonList.names.map((name: string) => {
                return setNames(names => [...names, {value: name, label: name}])
            })
        }
        PokemonList()
    }, [])

    return (
        <datalist id={id}>
            {names.map(name => (
                <option
                  key={name.value + Math.random()}
                  value={name.value}
                >
                  {name.label}
                </option>
            ))}
        </datalist>
    )
}

export default ListData
