import React, { useEffect, useState } from "react";
import classes from "./ExercisesLogBook.module.css";
import {
  Card,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Alert, Snackbar } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { exerciseLogActions } from "../../../store/exerciseslogged-slice";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const color = "#fff";

const theme = createTheme({
  components: {
    MuiIconButton: {
      styleOverrides: {
        sizeMedium: {
          color,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          color,
        },
      },
    },
  },
});

const ExercisesLogBook = () => {
  const dispatch = useDispatch();
  const currentDate = new Date();
  const loggedExercisesArray = useSelector(
    (state) => state.exerciseLog.exercisesLogBook
  );
  const [value, setValue] = useState(dayjs(currentDate.toISOString()));
  const [dateOfWorkout, setDateOfWorkout] = useState("");
  const [titleOfWorkout, setTitleOfWorkout] = useState("");
  const [open, setOpen] = useState(false);
  const handleChange = (newValue) => {
    setValue(newValue);
    let finaldate =
      newValue["$d"].getDate() +
      "/" +
      (newValue["$d"].getMonth() + 1) +
      "/" +
      newValue["$d"].getFullYear();
    setDateOfWorkout(finaldate);
  };

  useEffect(() => {
    fetch(
      "https://betterthanbefore-6ce9c-default-rtdb.asia-southeast1.firebasedatabase.app/currentCart.json",
      {
        method: "PUT",
        body: JSON.stringify(loggedExercisesArray),
      }
    );
  }, [loggedExercisesArray]);

  const saveWorkoutToDbHandler = (e) => {
    e.preventDefault();

    fetch(
      "https://betterthanbefore-6ce9c-default-rtdb.asia-southeast1.firebasedatabase.app/savedWorkouts.json",
      {
        method: "POST",
        body: JSON.stringify({
          currentDate: dateOfWorkout
            ? dateOfWorkout
            : value["$d"].getDate() +
              "/" +
              (value["$d"].getMonth() + 1) +
              "/" +
              value["$d"].getFullYear(),
          title: titleOfWorkout,
          loggedExercisesArray,
        }),
      }
    );
    clearWorkoutHandler();
    handleSnackBarClose();
  };

  const clearWorkoutHandler = () => {
    dispatch(exerciseLogActions.clearExerciseLog());
  };
  const getTitleOfWorkoutHandler = (e) => {
    setTitleOfWorkout(e.target.value);
  };

  const handleSnackBarClose = () => {
    setOpen(true);
    setTimeout(() => setOpen(false), 3000);
  };
  return (
    <React.Fragment>
      <div className={classes["logged-exercises-layout"]}>
        <Typography
          className={classes["exercises-logged-heading"]}
          sx={{
            fontFamily: "Bebas Neue",
            fontSize: "2em",
            margin: "1em 2em",
            textAlign: "center",
          }}
        >
          Exercises Log
        </Typography>
        {loggedExercisesArray.length === 0 && (
          <Typography
            className={classes["exercises-logged-heading"]}
            sx={{
              fontFamily: "Source Sans Pro",
              fontSize: "1.2em",
              margin: "1em 2em",
              textAlign: "center",
            }}
          >
            No exercises have been logged. Choose a muscle group and log
            exercises&nbsp;
            <Link to="/muscle-groups" className={classes["here-styling"]}>
              here
            </Link>
          </Typography>
        )}
        {loggedExercisesArray.length !== 0 && (
          <form onSubmit={saveWorkoutToDbHandler}>
            <div className={classes["date-of-workout-input"]}>
              <ThemeProvider theme={theme}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TextField
                    id="outlined-basic"
                    label="Enter title of workout"
                    variant="outlined"
                    className={classes["title-of-workout"]}
                    required
                    onChange={getTitleOfWorkoutHandler}
                  />

                  <DesktopDatePicker
                    label="Choose date of workout"
                    inputFormat="DD/MM/YYYY"
                    value={value}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                    className={classes["date-of-workout-desktop"]}
                    required
                  />
                  <MobileDatePicker
                    label="Choose date of workout"
                    inputFormat="DD/MM/YYYY"
                    value={value}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                    className={classes["date-of-workout-mobile"]}
                    required
                  />
                </LocalizationProvider>
              </ThemeProvider>
            </div>
            <Card className={classes["logged-exercises-card"]}>
              <div>
                {loggedExercisesArray.map((exerciseInLogArray, index) => (
                  <Accordion key={index}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography
                        className={classes["logged-exercises-details"]}
                      >
                        {exerciseInLogArray.nameOfExercise
                          ? exerciseInLogArray.nameOfExercise
                          : ""}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <TableContainer component={Paper}>
                        <Table
                          sx={{ lg: 400, sm: 600 }}
                          aria-label="a dense table"
                        >
                          <TableHead
                            sx={{ backgroundColor: "#00b712", text: "white" }}
                          >
                            <TableRow>
                              <TableCell align="center">
                                <Typography color="white">Set</Typography>
                              </TableCell>
                              <TableCell align="center">
                                <Typography color="white">
                                  Weight (kg)
                                </Typography>
                              </TableCell>
                              <TableCell align="center">
                                <Typography color="white">
                                  Repetitions
                                </Typography>
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {exerciseInLogArray.routine.formValues.map(
                              (set, index) => (
                                <TableRow
                                  key={index}
                                  sx={{
                                    "&:last-child td, &:last-child th": {
                                      border: 0,
                                    },
                                  }}
                                >
                                  <TableCell
                                    align="center"
                                    component="th"
                                    scope="row"
                                  >
                                    {++index}
                                  </TableCell>
                                  <TableCell align="center">
                                    {set.weight}
                                  </TableCell>
                                  <TableCell align="center">
                                    {set.reps}
                                  </TableCell>
                                </TableRow>
                              )
                            )}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </div>
            </Card>
            <div className={classes["button-section"]}>
              <button className={classes["button"]} type="submit">
                Save Workout
              </button>

              <button
                className={classes["button"]}
                type="submit"
                onClick={clearWorkoutHandler}
              >
                Clear Workout
              </button>
            </div>
          </form>
        )}
      </div>{" "}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleSnackBarClose}
      >
        <Alert
          onClose={handleSnackBarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Exercise log saved to database successfully!
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};

export default ExercisesLogBook;
