import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import styles from "./App.module.scss";
import Cards from "./components/Cards";
import Chart from "./components/Chart";
import Dropdown from "./components/Dropdown";

const App = () => {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    fetch("https://covid19.mathdro.id/api")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.app}>
      <h1>COVID-19 TRACKER</h1>
      <p>Last update : {data ? data.lastUpdate : null}</p>
      <Cards data={data} />
      <Chart data={data} />
      <Dropdown data={data} />
    </div>
  );
};

export default App;
