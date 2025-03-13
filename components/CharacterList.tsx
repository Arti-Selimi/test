"use client";

import { gql, useQuery } from "@apollo/client";
import { CharactersData, CharactersVars } from "./types";
import { InView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

const GET_CHARACTERS = gql`
  query GetCharacters($page: Int!) {
    characters(page: $page) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
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
  const t = useTranslations("CharacterList");
  const [scroll, setScroll] = useState(false);
  const { loading, error, data, fetchMore } = useQuery<
    CharactersData,
    CharactersVars
  >(GET_CHARACTERS, {
    variables: { page: 1 },
  });

  useEffect(() => {
    if (data?.characters.info.next) {
      setScroll(true);
    }
  }, [data]);

  const handleLoadMore = () => {
    if (scroll) {
      setScroll(false);
      fetchMore({
        variables: {
          page: data?.characters.info.next,
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

  if (loading)
    return (
      <p className="p-5 rounded-full bg-secondary text-white m-5">{t("loading")}</p>
    );
  if (error)
    return (
      <p className="p-5 rounded-full bg-red-600 text-white m-5">
        {t(`error` + `: ` + `${error.message}`)}
      </p>
    );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-135 xl:h-150 overflow-y-auto p-5 gap-5 bg-secondary m-5 rounded-2xl">
      {data?.characters.results.map((character) => (
        <div
          key={character.id}
          className="flex items-center justify-start bg-primary rounded-xl h-50 hover:shadow-[0_0_5px] cursor-pointer transition-all"
        >
          <img
            src={character.image}
            alt={character.name}
            className="rounded-l-xl h-50"
          />
          <div className="text-accent h-full p-5 flex flex-col items-start">
            <div className="font-extrabold">
              <h1 className="text-2xl hover:text-secondary">
                {character.name}
              </h1>
              <div className="flex items-center gap-2">
                <div
                  className={`rounded-full size-2 ${
                    character.status === "Alive"
                      ? "bg-green-500"
                      : character.status === "Dead"
                      ? "bg-red-600"
                      : "bg-accent"
                  }`}
                ></div>
                {t(`status.${character.status}`)} - {t(`species.${character.species}`)}
              </div>
            </div>
            <div>
              <p>{t(`gender.${character.gender}`)}</p>
              <p>{character.origin.name}</p>
            </div>
          </div>
        </div>
      ))}

      {data?.characters.info.next && (
        <InView
          className="flex items-center justify-center w-full lg:col-span-2"
          as="div"
          triggerOnce={true}
          onChange={(inView) => {
            if (inView && scroll) {
              handleLoadMore();
            }
          }}
        >
            <div
              onClick={handleLoadMore}
              className={`flex items-center self-center justify-center p-5 rounded-full bg-primary text-white cursor-pointer ${data?.characters.info.next < 3 ? "hidden" : ""}`}
            >
              Load More
            </div>
        </InView>
      )}
    </div>
  );
}
