import React, { useState } from "react";
import classes from "./MainHeader.module.css";
import logo from "../../images/logo2.png";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import GetAppIcon from "@mui/icons-material/GetApp";
import { useSelector } from "react-redux";

const MainHeader = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const toggleSideBarHandler = () => {
    setToggleSidebar(!toggleSidebar);
  };
  let badgeCounter = useSelector((state) => {
    if (state.exerciseLog.exercisesLogBook) {
      return state.exerciseLog.exercisesLogBook.length;
    } else {
      return 0;
    }
  });
  if (badgeCounter > 9) {
    badgeCounter = "9+";
  }
  return (
    <div className={classes.layout}>
      {toggleSidebar && (
        <div className={classes.sidebar}>
          <div className={classes.cross} onClick={toggleSideBarHandler}>
            <CloseIcon className={classes["ui-icons"]} />
            <div className={classes["sidebar-navigation-buttons"]}>
              <Link to="/muscle-groups">
                <button
                  className={classes["sidebar-navigation-buttons-button"]}
                >
                  <div className={classes["add-exercises-button"]}>
                    <AddIcon className={classes["ui-icons"]} /> Add Exercises
                  </div>
                </button>
              </Link>
              <Link to="/fetch-workout">
                <button
                  className={classes["sidebar-navigation-buttons-button"]}
                >
                  <div className={classes["fetch-workout-button"]}>
                    <GetAppIcon className={classes["ui-icons"]} /> Fetch Workout
                  </div>
                </button>
              </Link>
              <Link to="/save-workout">
                <button
                  className={classes["sidebar-navigation-buttons-button"]}
                >
                  <div className={classes["save-workout-button"]}>
                    <SaveIcon className={classes["ui-icons"]} />
                    <div className={classes["total-exercises-badge"]}>
                      <span>{badgeCounter ? badgeCounter : 0}</span>
                    </div>
                  </div>
                  Save Workout
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
      <div className={classes.padding}>
        <div className={classes["main-logo"]}>
          <div className={classes["logo-kebab-layout"]}>
            <div className={classes.kebab} onClick={toggleSideBarHandler}>
              {!toggleSidebar && <MenuIcon className={classes["ui-icons"]} />}
            </div>
            <Link to={"/"}>
              <img src={logo} alt="" />
            </Link>
          </div>
          <div className={classes["main-pages-navigation"]}>
            <Link to="/muscle-groups">
              <button>
                <AddIcon className={classes["ui-icons"]} />
                Add Exercises
              </button>
            </Link>
            <Link to="/fetch-workout">
              <button>
                <GetAppIcon className={classes["ui-icons"]} />
                Fetch Workout
              </button>
            </Link>
            <Link to="/save-workout">
              <button>
                <div className={classes["save-workout-button"]}>
                  <SaveIcon className={classes["ui-icons"]} />
                  <div className={classes["total-exercises-badge"]}>
                    <span>{badgeCounter ? badgeCounter : 0}</span>
                  </div>
                </div>
                Save Workout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainHeader;
