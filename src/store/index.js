import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./ui-slice";
import workoutSlice from "./workout-slice";
import exerciseLogSlice from "./exerciseslogged-slice";

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    workout: workoutSlice.reducer,
    exerciseLog: exerciseLogSlice.reducer,
  },
});

export default store;
