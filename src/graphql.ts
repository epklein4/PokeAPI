const {ApolloServer, gql} = require('apollo-server-lambda');
import { fetch } from "apollo-server-env";

const typeDefs = gql`

    type Query {
        getPokemon(name: String!): Pokemon
        getPokemonList: PokemonList
    }

    type PokemonList {
        names: [String]
    }

    type Pokemon {
        name: String
        id: Int
        height: Int
        weight: Int
        sprite: String
        abilities: [PokemonAbility]
    }

    type PokemonAbility {
        name: String
        id: Int
        is_main_series: Boolean
    }

`;

const resolvers = {
    Pokemon: {
        sprite: async parent => {
            return parent.sprites.front_default;
        },
        abilities:  async parent => {
            return parent.abilities.map(async abilityObj => {
                const url = await fetch(abilityObj.ability.url)
                return url.json();
            });
        }
    },
    PokemonList: {
        names: async parent => {
            return parent.results.map(async pokemon => {
                return pokemon.name;
            })
        }
    },
    Query: {
        getPokemon: async (_, { name }) => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
            return response.json();
        },
        getPokemonList: async (_) => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=811`)
            return response.json();
        }
    }
}



const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: {
        endpoint: "/dev/graphql"
    }
});

exports.graphqlHandler = server.createHandler({
    cors: {
        origin: '*',
        credentials: true,
      },
});