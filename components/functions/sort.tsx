import Dropdown from "../Dropdown";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

type Props = {
  data: any;
  onSortChange: (value: string) => void;
  setCharacters: React.Dispatch<React.SetStateAction<any>>;
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

  const handleDropdownChange = (value: string) => {
    setSelectedValue(value);
    onSortChange(value);
  };

  useEffect(() => {
    if (!data?.characters?.results) return;

    let sortedCharacters = [...data.characters.results];

    switch (selectedSort) {
      case t("nameAsc"):
        sortedCharacters.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case t("nameDesc"):
        sortedCharacters.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case t("originAsc"):
        sortedCharacters.sort((a, b) =>
          a.origin.name.localeCompare(b.origin.name)
        );
        break;
      case t("originDesc"):
        sortedCharacters.sort((a, b) =>
          b.origin.name.localeCompare(a.origin.name)
        );
        break;
      default:
        sortedCharacters = [...data.characters.results];
        break;
    }

    setCharacters(sortedCharacters);
  }, [selectedSort, data]);

  return (
    <Dropdown
      options={[t("nameAsc"), t("nameDesc"), t("originAsc"), t("originDesc")]}
      defaultValue={t("default")}
      onChange={handleDropdownChange}
      className="text-white p-1 rounded-[5px] border-2 border-accent"
    />
  );
}
