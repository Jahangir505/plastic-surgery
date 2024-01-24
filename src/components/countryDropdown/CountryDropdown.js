// components/CountryCodeDropdown.js
import Select from "react-select";

const CountryCodeDropdown = ({ countries }) => {
  const defaultValue = { value: "+1", label: "🇺🇸 +1" };
  const countryOptions = countries.map((country, index) => ({
    value: country.idd.root,
    label: (
      <div className="flex">
        <img src={country?.flags?.png} alt={country.name.common} height={20} width={30} />{" "}
        {country.idd.root}
      </div>
    )
  }));

  return (
    <Select
        back
      defaultValue={defaultValue}
      options={countryOptions}
      isSearchable
      className="react-select-container"
      classNamePrefix="react-select"
    />
  );
};

export default CountryCodeDropdown;
