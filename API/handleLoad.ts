import React from "react";
import { FetchMoreQueryOptions, ApolloQueryResult } from "@apollo/client";
import { CharactersData, CharactersVars } from "../types/types";

type Props = {
  scroll: boolean;
  setScroll: React.Dispatch<React.SetStateAction<boolean>>;
  data: CharactersData;
  fetchMore: (
    options: FetchMoreQueryOptions<CharactersVars, CharactersData> & {
      updateQuery: (
        prevResult: CharactersData,
        fetchMoreResultObject: { fetchMoreResult?: CharactersData }
      ) => CharactersData;
    }
  ) => Promise<ApolloQueryResult<CharactersData>>;
};

const handleLoadMore = async ({ scroll, setScroll, data, fetchMore }: Props) => {
  if (!scroll || !data.characters.info.next) return;

  setScroll(false);

  try {
    await fetchMore({
      variables: { page: data.characters.info.next },
      updateQuery: (prevResult, { fetchMoreResult }): CharactersData => {
        if (!fetchMoreResult || !fetchMoreResult.characters) {
          return prevResult;
        }

        return {
          characters: {
            info: fetchMoreResult.characters.info ?? prevResult.characters.info, 
            results: [
              ...prevResult.characters.results,
              ...(fetchMoreResult.characters.results ?? []), 
            ],
          },
        };
      },
    });
  } catch (error) {
    console.error("Error fetching more characters:", error);
  } finally {
    setScroll(true);
  }
};

export default handleLoadMore;
