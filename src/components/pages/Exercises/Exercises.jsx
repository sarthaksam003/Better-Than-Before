import React, { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
import classes from "./Exercises.module.css";
import ExerciseModal from "../../ExerciseModal/ExerciseModal";
import { useSelector } from "react-redux";
import ExerciseCard from "../../ExerciseCard/ExerciseCard";
import {
  Pagination,
  Box,
  Stack,
  // Typography,
  TextField,
  // Button,
} from "@mui/material";
// import { exercisesArray } from "../Chest/jiji";
// import SearchIcon from "@mui/icons-material/Search";

const Chest = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQueryArray, setSearchQueryArray] = useState([]);
  const exercisesPerPage = 9;
  // const indexOfLastExercise = currentPage * exercisesPerPage;
  // const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  let exercisesArray = useSelector(
    (state) => state.workout.workoutExercisesArray
  );
  // const currentExercises = exercisesArray.slice(
  //   indexOfFirstExercise,
  //   indexOfLastExercise
  // );
  let modalVisible = useSelector((state) => state.ui.modalVisible);
  const paginate = (e, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 502, behavior: "smooth" });
  };

  const searchExerciseHandler = (e) => {
    let searchQuery = document.getElementById("text-field").value;
    // eslint-disable-next-line
    const matches = exercisesArray.filter((exercise) => {
      if (exercise.name.includes(searchQuery)) {
        return true;
      }
    });
    setSearchQueryArray(matches);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [exercisesArray]);

  return (
    <div>
      <span className={classes["page-heading"]}>{props.title} Exercises</span>
      <Box position="relative" textAlign="center" mb="2em">
        <TextField
          className={classes["exercise-search-bar"]}
          placeholder={`Search ${props.title} exercises`}
          sx={{
            input: { fontWeight: 600, border: "none" },
            width: { lg: 1000, sm: 600 },
          }}
          id="text-field"
          onChange={searchExerciseHandler}
        />
        {/* <Button
          className={classes["search-btn"]}
          onClick={searchExerciseHandler}
        >
          <SearchIcon></SearchIcon>Search
        </Button> */}
      </Box>
      <div className={classes["chest-exercises"]}>
        {searchQueryArray.length === 0 &&
          exercisesArray.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              id={exercise.id}
              name={exercise.name}
              image={exercise.gifUrl}
              bodyPart={exercise.bodyPart}
              targetMuscle={exercise.target}
              equipmentReq={exercise.equipment}
            />
          ))}
        {searchQueryArray.length !== 0 &&
          searchQueryArray.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              id={exercise.id}
              name={exercise.name}
              image={exercise.gifUrl}
              bodyPart={exercise.bodyPart}
              targetMuscle={exercise.target}
              equipmentReq={exercise.equipment}
            />
          ))}
      </div>
      <Stack mt="100px" alignItems="center">
        {exercisesArray.length > 9 && (
          <Pagination
            color="success"
            shape="rounded"
            defaultPage={1}
            count={Math.ceil(exercisesArray.length / exercisesPerPage)}
            page={currentPage}
            onChange={paginate}
            size="large"
            className={classes["pagination-text"]}
          />
        )}
      </Stack>
      {modalVisible && <ExerciseModal nameOfExercise={""} image={""} />}
    </div>
  );
};

export default Chest;
