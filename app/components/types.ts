export interface Character {
    id: string;
    name: string;
    status: string;
    species: string;
    gender: string;
    origin: {
      name: string;
    };
    image: string;
  }
  
  export interface CharactersData {
    characters: {
      results: Character[];
    };
  }
  
  export interface CharactersVars {
    page: number;
  }
  