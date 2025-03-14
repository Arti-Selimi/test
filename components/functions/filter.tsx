import React from "react";
import Dropdown from "../Dropdown";
import { useTranslations } from "next-intl";

type Props = {
    setSpecies: React.Dispatch<React.SetStateAction<any>>;
    setFilter: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Filter({setSpecies, setFilter}: Props) {
  const t = useTranslations("filter");

  const handleDropdownChange = (value: string) => {
    setFilter(true)
    if(value === "Species (Human)" || value === "Spezies (Mensch)") {
        setSpecies("Human")
    } else if(value === "Species (Alien)" || value === "Spezies (Außerirdisch)") {
        setSpecies("Alien")
    }else if(value === "Species (Poopybutthole)" || value === "Spezies (Poopybutthole)") {
        setSpecies("Poopybutthole")
    }else if(value === "Status (Alive)" || value === "Status (Lebendig)") {
        setSpecies("Alive")
    }else if(value === "Status (Dead)" || value === "Status (Tot)") {
        setSpecies("Dead")
    } else {
        setSpecies("")
        setFilter(false)
    }
  };

  return (
    <Dropdown
      options={[
        t("statusAlive"),
        t("statusDead"),
        t("speciesHuman"),
        t("speciesAlien"),
        t("speciesPoopybutthole"),
      ]}
      defaultValue={t("default")}
      onChange={handleDropdownChange}
      className="text-white p-1 rounded-[5px] border-2 border-accent"
    />
  );
}
