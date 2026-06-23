import { Country } from "country-state-city";
import Select from "./Select";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function CountryPicker({ value, onChange }: Props) {
  const countries = Country.getAllCountries().map((country) => country.name);

  return (
    <Select
      label="Country"
      value={value}
      onChange={onChange}
      options={countries}
    />
  );
}
