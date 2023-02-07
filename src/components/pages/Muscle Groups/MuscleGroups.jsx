import { Box } from "@mui/system";
import React, { useState } from "react";
import { Card, Alert, Snackbar } from "@mui/material";
import classes from "./MuscleGroups.module.css";
import { exerciseOptions } from "../../../store/workout-slice";
import { useSelector, useDispatch } from "react-redux";
import { workoutActions } from "../../../store/workout-slice";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Exercises from "../Exercises/Exercises";
import { uiActions } from "../../../store/ui-slice";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
    slidesToSlide: 3,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};
function MuscleGroups() {
  const dispatch = useDispatch();
  const [bodypart, setBodypart] = useState("");

  const setExercisesArrayHandler = async (bodyPart) => {
    dispatch(uiActions.triggerLoading());
    // eslint-disable-next-line
    const response = fetch(
      `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`,
      exerciseOptions
    )
      .then((response) => response.json())
      .then((response) => {
        dispatch(workoutActions.setExercisesArray(response, bodyPart));
      })
      .catch((err) => console.error(err));

    setBodypart(bodyPart);
    window.scrollTo(0, 586);
    dispatch(uiActions.triggerLoading());
  };
  let open = useSelector((state) => state.ui.toasterNotif);
  let exercisesArray = useSelector(
    (state) => state.workout.workoutExercisesArray
  );

  const handleSnackBarClose = () => {
    dispatch(uiActions.triggerToasterNotif());
  };
  let isLoading = useSelector((state) => state.ui.loading);
  return (
    <React.Fragment>
      <Box width="100%">
        <div className={classes["muscle-groups-layout"]}>
          <span className={classes["muscle-groups-heading"]}>
            Choose Muscle Group
          </span>
          <Carousel responsive={responsive} containerClass="carousel-container">
            <Box className={classes["muscle-group-cards"]}>
              <Card onClick={() => setExercisesArrayHandler("chest")}>
                <img src={require("./images/chest.png")} alt="" />
                Chest
              </Card>
            </Box>
            <Box className={classes["muscle-group-cards"]}>
              <Card onClick={() => setExercisesArrayHandler("back")}>
                <img src={require("./images/back.png")} alt="" />
                Back
              </Card>
            </Box>
            <Box className={classes["muscle-group-cards"]}>
              <Card onClick={() => setExercisesArrayHandler("shoulders")}>
                <img src={require("./images/shoulders.png")} alt="" />
                Shoulders
              </Card>
            </Box>
            <Box className={classes["muscle-group-cards"]}>
              <Card onClick={() => setExercisesArrayHandler("upper legs")}>
                <img src={require("./images/legs.png")} alt="" />
                Legs
              </Card>
            </Box>
            <Box className={classes["muscle-group-cards"]}>
              <Card onClick={() => setExercisesArrayHandler("upper arms")}>
                <img src={require("./images/upperarms.png")} alt="" />
                Upper Arms
              </Card>
            </Box>
            <Box className={classes["muscle-group-cards"]}>
              <Card onClick={() => setExercisesArrayHandler("lower arms")}>
                <img src={require("./images/lower arms.png")} alt="" />
                Lower Arms
              </Card>
            </Box>
            <Box className={classes["muscle-group-cards"]}>
              <Card onClick={() => setExercisesArrayHandler("waist")}>
                <img src={require("./images/waist.png")} alt="" />
                Waist
              </Card>
            </Box>
          </Carousel>
        </div>
      </Box>
      {isLoading && <LoadingSpinner />}

      {bodypart && (
        <Exercises title={bodypart} exercisesArray={exercisesArray} />
      )}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleSnackBarClose}
      >
        <Alert
          onClose={handleSnackBarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Exercise logged successfully!
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}

export default MuscleGroups;
