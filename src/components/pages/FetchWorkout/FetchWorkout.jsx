import React, { useState } from "react";
import classes from "./FetchWorkout.module.css";
import dayjs from "dayjs";
// import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { TimePicker } from "@mui/x-date-pickers/TimePicker";
// import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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

const FetchWorkout = () => {
  const currentDate = new Date();
  const [loggedExercisesArray, setArr] = useState([]);
  const [value, setValue] = useState(dayjs(currentDate.toISOString()));
  const [calendarTouched, setCalendarTouched] = useState(false);
  const [dateofworkout, setdateofworkout] = useState("");
  const [workoutTitle, setWorkoutTitle] = useState("");
  let exerciseArrayToShow = [];

  const handleChange = (newValue) => {
    setValue(newValue);
    setCalendarTouched(true);
    fetchWorkoutFromDb(newValue);
  };

  const fetchWorkoutFromDb = async (newValue) => {
    let finaldate =
      newValue["$d"].getDate() +
      "/" +
      (newValue["$d"].getMonth() + 1) +
      "/" +
      newValue["$d"].getFullYear();
    setdateofworkout(finaldate);
     let res = await fetch(
      "https://betterthanbefore-6ce9c-default-rtdb.asia-southeast1.firebasedatabase.app/savedWorkouts.json"
    );
    const data = await res.json();
     for (let i in data) {
       if (data[i].currentDate === finaldate) {
        exerciseArrayToShow = data[i].loggedExercisesArray;
        setWorkoutTitle(data[i].title);
      }
    }
     populateExercisesArray(exerciseArrayToShow);
  };

  const populateExercisesArray = (arr) => {
    setArr(arr);
   };

  return (
    <React.Fragment>
      {!calendarTouched && (
        <p className={classes["fetch-workout-heading"]}>
          Choose date of workout to fetch
        </p>
      )}
      {calendarTouched && (
        <p className={classes["fetch-workout-heading"]}>
          Workout done on {dateofworkout}
        </p>
      )}
      <div className={classes["fetch-workout-layout"]}>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className={classes["DesktopDatePicker"]}>
              <DesktopDatePicker
                label="Date of workout to fetch"
                inputFormat="DD/MM/YYYY"
                value={value}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </div>
            <div className={classes["MobileDatePicker"]}>
              <MobileDatePicker
                label="Date of workout to fetch"
                inputFormat="DD/MM/YYYY"
                value={value}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </div>
          </LocalizationProvider>
        </ThemeProvider>
        {loggedExercisesArray.length >= 1 && (
          <Card className={classes["logged-exercises-card"]}>
            <div>
              <p style={{ margin: "0 0 1em 0", fontSize: "1.22em" }}>
                {workoutTitle ? `Title: ${workoutTitle}` : ""}
              </p>
              {loggedExercisesArray.map((exerciseInLogArray, index) => (
                <Accordion key={index}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className={classes["logged-exercises-details"]}>
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
                              <Typography color="white">Weight (kg)</Typography>
                            </TableCell>
                            <TableCell align="center">
                              <Typography color="white">Repetitions</Typography>
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
                                <TableCell align="center">{set.reps}</TableCell>
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
        )}
        {loggedExercisesArray.length === 0 && calendarTouched && (
          <p className={classes["no-exercises"]}>
            No logged workout found for the date: {dateofworkout}
          </p>
        )}
      </div>
    </React.Fragment>
  );
};

export default FetchWorkout;
