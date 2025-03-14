import React from 'react'

type Props = {
    scroll: boolean;
    setScroll: React.Dispatch<React.SetStateAction<boolean>>;
    data: any;
    fetchMore: (options: any) => Promise<any>;
  };
  

const handleLoadMore = ({scroll,setScroll,  data, fetchMore} : Props) => {
    if (scroll) {
      setScroll(false);
      fetchMore({
        variables: {
          page: data?.characters.info.next,
        },
        updateQuery: (prevResult: any, { fetchMoreResult }: { fetchMoreResult?: any }) => {
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