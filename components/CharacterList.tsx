"use client";

import { useQuery } from "@apollo/client";
import { CharactersData, CharactersVars } from "./types";
import { InView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { GET_CHARACTERS } from "./API/get";
import handleLoadMore from "./API/handleLoad";
import Sort from "./functions/sort";
import Filter from "./functions/filter";

export default function CharacterList() {
  const t = useTranslations("CharacterList");
  const [scroll, setScroll] = useState(false);
  const [selectedSort, setSelectedSort] = useState("default")
  const [species, setSpecies] = useState("");
  const [filter, setFilter] = useState(false)

  const { loading, error, data, fetchMore } = useQuery<
    CharactersData,
    CharactersVars
  >(GET_CHARACTERS, {
    variables: { page: 1 },
  });

  const [characters, setCharacters] = useState<any[]>([]);

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
    <div className="flex flex-col align-center justify-center px-10 py-5">
      <div className="flex gap-2 ml-5 mb-5">
        <Sort
          data={data}
          onSortChange={setSelectedSort}
          setCharacters={setCharacters}
          selectedSort={selectedSort}
        />
        <Filter 
          setSpecies={setSpecies}
          setFilter={setFilter}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-135 xl:h-120 overflow-y-auto p-5 gap-5 bg-secondary rounded-2xl">
        {characters.map((character) => (
          <div
            key={character.id}
            className={`flex items-center justify-start bg-primary rounded-xl h-50 hover:shadow-[0_0_5px] cursor-pointer transition-all ${!filter ? "" : (character.species === species || character.status === species) ? "" : "hidden"}`}
          >
            <img
              src={character.image}
              alt={character.name}
              className="rounded-l-xl h-50"
            />
            <div className="text-accent h-full p-5 flex flex-col items-start">
              <div className="font-extrabold">
                <h1 className="text-2xl hover:text-current">
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
                  {t(`status.${character.status}`)} -{" "}
                  {t(`species.${character.species}`)}
                </div>
              </div>
              <div>
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
