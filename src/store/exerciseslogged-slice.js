import { createSlice } from "@reduxjs/toolkit";

const exerciseLogSlice = createSlice({
  name: "exerciseLog",
  initialState: { exercisesLogBook: [] },
  reducers: {
    initializeCart(state, savedCart) {
      state.exercisesLogBook = savedCart.payload;
    },
    addExerciseToLog(state, userLoggedExercises) {
      state.exercisesLogBook = state.exercisesLogBook.concat(
        userLoggedExercises.payload
      );
    },
    clearExerciseLog(state) {
      state.exercisesLogBook = [];
    },
  },
});

export const exerciseLogActions = exerciseLogSlice.actions;
export default exerciseLogSlice;
