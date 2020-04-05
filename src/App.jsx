import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import styles from "./App.module.scss";
import Cards from "./components/Cards";
import Chart from "./components/Chart";
import Dropdown from "./components/Dropdown";

const App = () => {
  const [data, setData] = useState(null);
  const [country, setCountry] = useState("All");

  const fetchData = async () => {
    fetch("https://covid19.mathdro.id/api")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => console.log(error));
  };

  const loading = (
    <div className={styles.loginContainer}>
      <div className={styles.loadingBox}>
        <h3 className="text-center">Loading...please wait...</h3>
        <div className={styles.loader}></div>
      </div>
    </div>
  );

  useEffect(() => {
    fetchData();
  }, []);

  return data ? (
    <div className={styles.app}>
      <h1>COVID-19</h1>
      <p>Last update : {data.lastUpdate}</p>
      <Cards data={data} />
      <Dropdown loading={loading} setCountry={setCountry} />
      <Chart loading={loading} country={country} />
    </div>
  ) : (
    loading
  );
};

export default App;
