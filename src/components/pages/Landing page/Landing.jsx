import React from "react";
import { Link } from "react-router-dom";
import classes from "./Landing.module.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Landing = () => {
  return (
    <div className={classes["landing-page-layout"]}>
      <div className={classes["landing-page-left"]}>
        <div>
          <p className={classes["landing-page-heading"]}>
            Think Less <br />
            Lift More
          </p>
          <p className={classes["landing-page-sub-heading"]}>
            <span className={classes["b4b-styling"]}>Better Than Before</span>{" "}
            is the simplest, most intuitive workout tracking experience. Keep
            track of your best sets, repetitions, max 1RM and more.
          </p>
          <Link to="/muscle-groups">
            <button className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-green-400 duration-300 bg-green-600 hover:bg-green-400 text-gray-200 font-bold py-2 px-4 my-7 rounded inline-flex items-center">
              <span className={classes["explore-exercises-btn"]}>
                Explore exercises
              </span>
              <ArrowForwardIcon className={classes["ui-icons"]} />
            </button>
          </Link>
        </div>
      </div>
      <div className={classes["landing-page-right"]}>
        <img
          src={require("./assets/background-overlay.jpg")}
          alt=""
          id={classes.landingImg}
        />
      </div>
    </div>
  );
};

export default Landing;
