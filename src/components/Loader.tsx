import React from "react";

import image from "../assets/source.svg";
import "../sass/Loader.scss";

const Loader = ({ style }: { style?: string }) => (
  <div className={style === "dots" ? "loader--dots loader" : "loader"}>
    {style === "dots" ? (
      <div className="loader__dots">
        <div className="loader__dot"></div>
        <div className="loader__dot"></div>
        <div className="loader__dot"></div>
      </div>
    ) : (
      <img className="loader__img" src={image} alt="" />
    )}
  </div>
);

export default Loader;
