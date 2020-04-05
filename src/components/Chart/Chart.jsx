import React, { useEffect, useState } from "react";
import styles from "./Chart.module.scss";
import { Line, Bar } from "react-chartjs-2";

const Chart = (props) => {
  const { loading } = props;
  const [data, setData] = useState(null);

  const fetchData = async () => {
    fetch("https://covid19.mathdro.id/api/daily")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return data ? (
    <>
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
                  borderColor: "blue",
                },
                {
                  data: data.map((day) => day.deaths.total),
                  fill: true,
                  label: "Deaths",
                  borderColor: "red",
                },
              ],
            }}
          />
        </div>
      </div>
    </>
  ) : (
    loading
  );
};

export default Chart;
{
  /* <Line
data={{
  labels: data.map((day) => day.reportDate),

  datasets: [data.map((day) => day.confirmed.total)],
}}
/> */
}
