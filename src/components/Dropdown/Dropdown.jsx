import React, { useEffect, useState } from "react";
import styles from "./Dropdown.module.scss";

const Dropdown = (props) => {
  const { loading, setCountry } = props;
  const [data, setData] = useState(null);

  const fetchData = async () => {
    fetch("https://covid19.mathdro.id/api/countries")
      .then((response) => response.json())
      .then((data) => {
        setData(data.countries);
      })
      .catch((error) => console.log(error));
  };

  const getDropDownOptions = () => {
    return data.map((country) => {
      return <option value={country.name}>{country.name}</option>;
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return data ? (
    <div className={styles.dropdown}>
      <select
        type="text"
        onChange={(e) => {
          setCountry(e.target.value);
        }}
      >
        <option value="All">All</option>;{getDropDownOptions()}
      </select>
    </div>
  ) : (
    loading
  );
};

export default Dropdown;
