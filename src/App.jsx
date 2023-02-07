import "./App.scss";
import { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MuscleGroups from "./components/pages/Muscle Groups/MuscleGroups.jsx";
import MainHeader from "./components/MainHeader/MainHeader";
import Landing from "./components/pages/Landing page/Landing";
// import Chest from "./components/pages/Chest/Chest";
import ExercisesLogBook from "./components/pages/ExercisesLogBook/ExercisesLogBook.jsx";
import { useDispatch } from "react-redux";
import { exerciseLogActions } from "./store/exerciseslogged-slice";
import FetchWorkout from "./components/pages/FetchWorkout/FetchWorkout";

export default function App() {
  const dispatch = useDispatch();
  // eslint-disable-next-line
  const [arr, setArray] = useState([]);
  useEffect(() => {
    fetch(
      "https://betterthanbefore-6ce9c-default-rtdb.asia-southeast1.firebasedatabase.app/currentCart.json"
    )
      .then((response) => response.json())
      .then((result) => {
        // setArray(result);
        if (result) {
          dispatch(exerciseLogActions.initializeCart(result));
        } else {
          dispatch(exerciseLogActions.initializeCart([]));
        }
      });
  });
  if (arr.length !== 0) {
    // dispatch(exerciseLogActions.initializeCart(arr));
  }
  return (
    <Box width="100%" className="app-background">
      <BrowserRouter>
        <MainHeader />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/muscle-groups" element={<MuscleGroups />} />
          <Route path="/save-workout" element={<ExercisesLogBook />} />
          <Route path="/fetch-workout" element={<FetchWorkout />} />
          {/* <Route path="/muscle-groups/chest" element={<Chest />} />*/}
        </Routes>
      </BrowserRouter>
    </Box>
  );
}
