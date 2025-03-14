import React from 'react';
import { CharactersData, CharactersVars } from '../types';

type Props = {
  scroll: boolean;
  setScroll: React.Dispatch<React.SetStateAction<boolean>>;
  data: CharactersData;
  fetchMore: (options: {
    variables: CharactersVars;
    updateQuery: (
      prevResult: CharactersData,
      { fetchMoreResult }: { fetchMoreResult?: CharactersData }
    ) => CharactersData;
  }) => Promise<CharactersData>;
};

const handleLoadMore = ({
  scroll,
  setScroll,
  data,
  fetchMore,
}: Props) => {
  if (scroll) {
    setScroll(false);

    fetchMore({
      variables: {
        page: data.characters.info.next,
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prevResult;

        return {
          characters: {
            ...prevResult.characters,
            results: [
              ...prevResult.characters.results,
              ...fetchMoreResult.characters.results,
            ],
            info: fetchMoreResult.characters.info,
          },
        };
      },
    }).finally(() => {
      setScroll(true);
    });
  }
};

export default handleLoadMore;
