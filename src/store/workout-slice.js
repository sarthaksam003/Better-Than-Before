import { createSlice } from "@reduxjs/toolkit";

export const exerciseOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
  },
};

const workoutSlice = createSlice({
  name: "workout",
  initialState: { bodyPart: "", workoutExercisesArray: [] },
  reducers: {
    setExercisesArray(state, chosenBodyPartExercisesArray) {
      state.workoutExercisesArray = chosenBodyPartExercisesArray.payload;
      state.bodyPart = chosenBodyPartExercisesArray.payload[0].bodyPart;
    },
  },
});

export const workoutActions = workoutSlice.actions;
export default workoutSlice;
