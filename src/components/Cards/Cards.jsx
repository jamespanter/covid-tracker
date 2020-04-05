import React from "react";
import styles from "./Cards.module.scss";

const Cards = (props) => {
  const { data } = props;

  return (
    <section className={styles.cards}>
      <div className={styles.cases}>
        <h2>Cases</h2>
        <p>{data.confirmed.value}</p>
      </div>
      <div className={styles.recovered}>
        <h2>Recovered</h2>
        <p>{data.recovered.value}</p>
      </div>
      <div className={styles.deaths}>
        <h2>Deaths</h2>
        <p>{data.deaths.value}</p>
      </div>
    </section>
  );
};

export default Cards;
