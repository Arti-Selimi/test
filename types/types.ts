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
      info: {
        pages: number;
        next: number;
        prev: number;
        count: number;
      };
      results: Character[];
    };
  }
  
  export interface CharactersVars {
    page: number;
  }
  
    export interface Options {
      value: string,
      label: string
    }