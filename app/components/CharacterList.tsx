"use client";

import { gql, useQuery } from "@apollo/client";
import { CharactersData, CharactersVars } from "./types";

const GET_CHARACTERS = gql`
  query GetCharacters($page: Int!) {
    Characters(page: $page) {
      results {
        name
        status
        species
        gender
        origin {
          name
        }
        image
      }
    }
  }
`;

export default function CharacterList() {
  const { loading, error, data } = useQuery<CharactersData, CharactersVars>(
    GET_CHARACTERS,
    {
      variables: { page: 1 },
    }
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log(data);

  return (
    <div>
      {data?.characters.results.map((character) => (
        <div key={character.name}>
          <img src={character.image} alt={character.name} />
          <h2>{character.name}</h2>
          <p>{character.status} - {character.species}</p>
          <p>{character.gender}</p>
          <p>{character.origin.name}</p>
        </div>
      ))}
    </div>
  );
}
