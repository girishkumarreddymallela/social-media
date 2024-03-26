import React from "react";
import FetchData from "../../components/Data";
import Answer from "../../components/Answer";
import Query from "../../components/Query";
import Navbar from "../../components/Navbar";
import SearchBar from "../../components/SearchBar";
import "./dataQueryAnswer.css";
const DataAndAnswer = () => (
  <>
    <Navbar />

    <div className="A1">
      <div className="B1">
        <SearchBar className="C1" />
        <FetchData className="D1" />
      </div>
      <div className="E1">
        <Query className="F1" />
        <Answer className="G1" />
      </div>
    </div>
  </>
);

export default DataAndAnswer;
