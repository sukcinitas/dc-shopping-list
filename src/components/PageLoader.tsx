import React from "react";

import "../sass/App.scss";
import "../sass/Loader.scss";
import "../sass/headings.scss";
import "../sass/PageLoader.scss";
import image from "../assets/source.svg";

const PageLoader = () => (
  <div className="main page-loader">
    <div>
      <div className="loader">
        <img src={image} alt="sauce" />
      </div>
    </div>
    <h2 className="subheading">
      The app is starting up. Please hold on for a moment.
    </h2>
  </div>
);

export default PageLoader;
