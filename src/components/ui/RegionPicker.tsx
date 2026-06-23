import { Country, State } from "country-state-city";
import Select from "./Select";

type Props = {
  country: string;
  value: string;
  onChange: (value: string) => void;
};

export default function RegionPicker({ country, value, onChange }: Props) {
  const countryData = Country.getAllCountries().find((c) => c.name === country);

  const regions = countryData
    ? State.getStatesOfCountry(countryData.isoCode).map((state) => state.name)
    : [];

  return (
    <Select
      label="Region / State"
      value={value}
      onChange={onChange}
      options={regions}
    />
  );
}
