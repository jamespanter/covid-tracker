import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import styles from "./App.module.scss";
import Cards from "./components/Cards";
import Chart from "./components/Chart";
import Dropdown from "./components/Dropdown";

const App = () => {
  const [data, setData] = useState(null);
  const [country, setCountry] = useState("All");
  const [loading, toggleLoading] = useState(false);

  const fetchData = () => {
    fetch("https://covid19.mathdro.id/api")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setTimeout(() => toggleLoading(false), 500);
      })
      .catch((error) => console.log(error));
  };

  const loadingJSX = () => (
    <div className={styles.loginContainer}>
      <div className={styles.loadingBox}>
        <h3 className="text-center">Loading...please wait...</h3>
        <div className={styles.loader}></div>
      </div>
    </div>
  );

  const currentDate = () => {
    const day = data.lastUpdate.slice(8, 10);
    const month = data.lastUpdate.slice(5, 7);
    const year = data.lastUpdate.slice(0, 4);
    const hours = data.lastUpdate.slice(11, 13);
    const mins = data.lastUpdate.slice(14, 16);
    const seconds = data.lastUpdate.slice(17, 19);
    return `${day} ${getMonthAsString(
      month
    )} ${year} at ${hours}:${mins}:${seconds}`;
  };

  const getMonthAsString = (number) => {
    let month;

    switch (number) {
      case "01":
        month = "January";
        break;
      case "02":
        month = "February";
        break;
      case "03":
        month = "March";
        break;
      case "04":
        month = "April";
        break;
      case "05":
        month = "May";
        break;
      case "06":
        month = "June";
        break;
      case "07":
        month = "July";
        break;
      case "08":
        month = "August";
        break;
      case "09":
        month = "September";
        break;
      case "10":
        month = "October";
        break;
      case "11":
        month = "November";
        break;
      case "12":
        month = "December";
        break;
      default:
        month = number;
    }
    return month;
  };

  useEffect(() => {
    toggleLoading(true);
    fetchData();
  }, []);

  return loading ? (
    loadingJSX()
  ) : data ? (
    <div className={styles.app}>
      <h1>COVID-19</h1>
      <p>Last update : {data ? currentDate() : null}</p>
      <Cards data={data} />
      <Dropdown loading={loading} setCountry={setCountry} />
      <Chart loadingJSX={loadingJSX} country={country} />
    </div>
  ) : (
    loadingJSX()
  );
};

export default App;
