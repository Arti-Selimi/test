import React from "react";
import { useTranslations } from "next-intl";
import Select, { MultiValue } from "react-select";
import { Options } from "../types";

type Props = {
  setFilterOptions: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function Filter({ setFilterOptions }: Props) {
  const t = useTranslations("filter");

  const handleDropdownChange = (
    selectedOptions: MultiValue<Options>,
  ) => {
    console.log(selectedOptions);
    if (!selectedOptions) {
      setFilterOptions([]);
      return;
    }

    setFilterOptions(selectedOptions.map((option) => option.value));
  };

  return (
    <Select
      options={[
        { value: "Alive", label: t("statusAlive") },
        { value: "Dead", label: t("statusDead") },
        { value: "Human", label: t("speciesHuman") },
        { value: "Alien", label: t("speciesAlien") },
        { value: "Poopybutthole", label: t("speciesPoopybutthole") },
      ]}
      isMulti
      placeholder={t("default")}
      onChange={handleDropdownChange}
      className="w-full font-l"
      styles={{
        control: (base) => ({
          ...base,
          backgroundColor: "#001124", 
          borderColor: "#64748B", 
          color: "#F1F5F9", 
          borderRadius: "8px",
        }),
        option: (base, { isFocused, isSelected }) => ({
          ...base,
          backgroundColor: isSelected ? "#A35852" : isFocused ? "#A35852" : "#001124",
          color: isSelected ? "#FFFFFF" : "#F1F5F9",
          padding: "10px",
          cursor: "pointer",
        }),
        multiValue: (base) => ({
          ...base,
          backgroundColor: "#A35852",
          color: "#FFFFFF",
          borderRadius: "5px",
          cursor: "pointer"
        }),
        multiValueLabel: (base) => ({
          ...base,
          color: "#FFFFFF",
          cursor: "pointer"
        }),
        multiValueRemove: (base) => ({
          ...base,
          color: "#F1F5F9",
          ":hover": {
            backgroundColor: "#A35852",
            color: "#FFFFFF",
          },
        }),
        placeholder: (base) => ({
          ...base,
          color: "#CBD5E1",
        }),
      }}
    />
  );
}
