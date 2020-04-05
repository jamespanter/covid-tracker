import React from "react";
import logo from "./logo.svg";
import styles from "./App.module.scss";
import Card from "./components/Cards";

function App() {
  return (
    <div className="App">
      <h1>COVID-19 TRACKER</h1>
      <Card />
      <Card />
      <Card />
    </div>
  );
}

export default App;
