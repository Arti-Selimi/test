import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useTranslations } from "next-intl";
import { CharactersData, Character } from "../types";

type Props = {
  data: CharactersData;
  onSortChange: (value: string) => void;
  setCharacters: React.Dispatch<React.SetStateAction<Character[]>>;
  selectedSort: string;
};

export default function Sort({
  onSortChange,
  data,
  setCharacters,
  selectedSort,
}: Props) {
  const t = useTranslations("sort");
  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleDropdownChange = (selectedOption: { value: string; label: string } | null) => {
    if (!selectedOption) return;
    
    const value = selectedOption.value;
    
    if (value === "default") {
      setSelectedValue("");
      onSortChange(""); 
      setCharacters(data.characters.results); 
      return;
    }

    setSelectedValue(value);
    onSortChange(value);
  };

  useEffect(() => {
    if (!data?.characters?.results) return;

    let sortedCharacters = [...data.characters.results];

    switch (selectedSort) {
      case "nameAsc":
        sortedCharacters.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "nameDesc":
        sortedCharacters.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "originAsc":
        sortedCharacters.sort((a, b) =>
          a.origin.name.localeCompare(b.origin.name)
        );
        break;
      case "originDesc":
        sortedCharacters.sort((a, b) =>
          b.origin.name.localeCompare(a.origin.name)
        );
        break;
      default:
        sortedCharacters = [...data.characters.results];
        break;
    }

    setCharacters(sortedCharacters);
  }, [selectedSort, data, setCharacters]);

  return (
    <Select
      options={[
        { value: "default", label: t("default") }, 
        { value: "nameAsc", label: t("nameAsc") },
        { value: "nameDesc", label: t("nameDesc") },
        { value: "originAsc", label: t("originAsc") },
        { value: "originDesc", label: t("originDesc") },
      ]}
      value={{ value: selectedValue, label: t(`${selectedValue}`) }} 
      onChange={handleDropdownChange}
      placeholder={t("default")}
      className="w-70 font-l p-1"
      styles={{
        control: (provided) => ({
          ...provided,
          backgroundColor: "#001124", 
          borderColor: "#64748B", 
          color: "#F1F5F9", 
          borderRadius: "8px",
        }),
        option: (provided) => ({
          ...provided,
          backgroundColor: "#001124",
          color: "white",
          padding: "10px",
          cursor: "pointer",
          ":hover": {
            backgroundColor: "#A35852",
            color: "#FFFFFF",
          }
        }),
        singleValue: (provided) => ({
          ...provided,
          backgroundColor: "#001124",
          color: "#FFFFFF",
          borderRadius: "5px",
          padding: "0 5px",
        }),
        placeholder: (provided) => ({
          ...provided,
          color: "#CBD5E1",
        }),
      }}
    />
  );
}
