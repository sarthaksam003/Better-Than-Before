import React from "react";
import loadingSpinner from "./assets/loadingSpinner.png";
import classes from "./LoadingSpinner.module.css";

const LoadingSpinner = () => {
  return (
    <React.Fragment>
      <div className={classes["loadingspinner-layout"]}>
        <div className={classes["loadingspinner-img"]}>
          <img src={loadingSpinner} alt="" />
        </div>
        Loading more exercises.Please wait.
      </div>
    </React.Fragment>
  );
};

export default LoadingSpinner;
