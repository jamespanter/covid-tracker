import React, { useEffect, useState } from "react";
import styles from "./Chart.module.scss";
import { Line, Bar } from "react-chartjs-2";

const Chart = (props) => {
  const { loading, country, loadingJSX } = props;
  const [data, setData] = useState(null);

  const fetchData = async (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    country !== "All"
      ? fetchData(`https://covid19.mathdro.id/api/countries/${country}`)
      : fetchData("https://covid19.mathdro.id/api/daily");
  }, [country]);

  return loading ? (
    loadingJSX
  ) : data && country === "All" ? (
    <div className={styles.chart}>
      <div className={styles.lineChart}>
        <Line
          data={{
            labels: data.map((day) => day.reportDate),
            datasets: [
              {
                data: data.map((day) => day.confirmed.total),
                fill: true,
                label: "Cases",
                borderColor: "rgb(97, 188, 224)",
              },
              {
                data: data.map((day) => day.deaths.total),
                fill: true,
                label: "Deaths",
                borderColor: "rgb(238, 117, 117)",
              },
            ],
          }}
        />
      </div>
    </div>
  ) : data && data.confirmed ? (
    <div className={styles.chart}>
      <div className={styles.barChart}>
        <Bar
          options={{
            legend: { display: false },
            title: { display: true, text: `Current state in ${country}` },
          }}
          data={{
            labels: ["Cases", "Recovered", "Deaths"],
            datasets: [
              {
                label: "People",
                backgroundColor: [
                  "rgb(97, 188, 224)",
                  "rgb(112, 216, 112)",
                  "rgb(238, 117, 117)",
                ],
                data: [
                  data.confirmed.value,
                  data.recovered.value,
                  data.deaths.value,
                ],
              },
            ],
          }}
        />
      </div>
    </div>
  ) : (
    loading
  );
};

export default Chart;
