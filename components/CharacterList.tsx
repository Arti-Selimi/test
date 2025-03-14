"use client";

import { useQuery } from "@apollo/client";
import { Character, CharactersData, CharactersVars } from "./types";
import { InView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { GET_CHARACTERS } from "./API/get";
import Sort from "./functions/sort";
import Filter from "./functions/filter";
import handleLoadMore from "./API/handleLoad";
import Image from "next/image";

export default function CharacterList() {
  const t = useTranslations("CharacterList");
  const [scroll, setScroll] = useState(false);
  const [selectedSort, setSelectedSort] = useState("default");
  const [filterOptions, setFilterOptions] = useState<string[]>([]);

  const { loading, error, data, fetchMore } = useQuery<
    CharactersData,
    CharactersVars
  >(GET_CHARACTERS, {
    variables: { page: 1 },
  });

  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    if (data?.characters?.info?.next) {
      setScroll(true);
    }
  }, [data]);

  if (loading)
    return (
      <p className="p-5 rounded-full bg-secondary text-white m-5">
        {t("loading")}
      </p>
    );

  if (error)
    return (
      <p className="p-5 rounded-full bg-red-600 text-white m-5">
        {t(`error` + `: ` + `${error.message}`)}
      </p>
    );

  return (
    <div className="flex flex-col align-center justify-center px-10 py-5 w-full">
      <div className="flex flex-col md:flex-row gap-2 mb-5 items-center">
        <Sort
          data={data}
          onSortChange={setSelectedSort}
          setCharacters={setCharacters}
          selectedSort={selectedSort}
        />
        <Filter setFilterOptions={setFilterOptions}/>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-135 xl:h-120 overflow-y-auto p-5 gap-5 bg-secondary rounded-2xl">
        {characters
          .filter((character) => {
            if (!filterOptions.length) return true;
            return filterOptions.every(
              (val) => val === character.species || val === character.status
            );
          })
          .map((character) => (
            <div
              key={character.id}
              className="flex flex-col sm:flex-row md:h-max items-center justify-start bg-primary rounded-xl hover:shadow-[0_0_5px] cursor-pointer transition-all"
            >
              <Image
                src={character.image}
                alt={character.name}
                width={150}
                height={150}
                className="rounded-xl h-50 w-full sm:w-min md:w-auto"
              />
              <div className="text-accent h-full p-5 flex flex-col items-start">
                <div className="font-extrabold text-center sm:text-left w-full">
                  <h1 className="text-2xl hover:text-current">
                    {character.name}
                  </h1>
                  <div className="flex items-center justify-center sm:justify-start gap-2 text-center sm:text-left w-full">
                    <div
                      className={`rounded-full size-2 ${
                        character.status === "Alive"
                          ? "bg-green-500"
                          : character.status === "Dead"
                          ? "bg-red-600"
                          : "bg-accent"
                      }`}
                    ></div>
                    {t(`status.${character.status}`)} -{" "}
                    {t(`species.${character.species}`)}
                  </div>
                </div>
                <div className="text-center sm:text-left w-full">
                  <p>{t(`gender.${character.gender}`)}</p>
                  <p>{character.origin.name}</p>
                </div>
              </div>
            </div>
          ))}
        {data?.characters?.info?.next && (
          <InView
            className="flex items-center justify-center w-full lg:col-span-2"
            as="div"
            triggerOnce={true}
            onChange={(inView) => {
              if (inView && scroll) {
                handleLoadMore({ scroll, setScroll, data, fetchMore });
              }
            }}
          >
            <div
              onClick={() =>
                handleLoadMore({ scroll, setScroll, data, fetchMore })
              }
              className={`flex items-center self-center justify-center p-5 rounded-full bg-primary text-white cursor-pointer ${
                data?.characters?.info?.next < 3 ? "hidden" : ""
              }`}
            >
              Load More
            </div>
          </InView>
        )}
      </div>
    </div>
  );
}
