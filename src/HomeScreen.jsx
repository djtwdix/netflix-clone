import React from "react";
import Banner from "./Banner";
import "./HomeScreen.scss";
import Nav from "./Nav";

function HomeScreen() {
  return (
    <div className="homeScreen">
      <Nav />
      <Banner />
      {/* Rows */}
    </div>
  );
}

export default HomeScreen;
