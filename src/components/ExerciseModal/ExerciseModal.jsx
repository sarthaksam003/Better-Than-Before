import React, { useState } from "react";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import classes from "./ExerciseModal.module.css";
import { exerciseLogActions } from "../../store/exerciseslogged-slice";
import { uiActions } from "../../store/ui-slice";
import { useDispatch, useSelector } from "react-redux";
import InputAdornment from "@mui/material/InputAdornment";
// import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";

const ExerciseModal = (props) => {
  const [formValues, setFormValues] = useState([{ weight: "", reps: "" }]);
  const [disabledBtn, setDisabledBtn] = useState(true);
  const dispatch = useDispatch();
  const nameOfExercise = useSelector((state) => state.ui.modalTitle);
  const imageOfExercise = useSelector((state) => state.ui.modalImage);
  const equipmentRequired = useSelector((state) => state.ui.modalEquipReq);
  const musclesTargeted = useSelector((state) => state.ui.modalTarget);

  let handleChange = (i, e) => {
    const re = /^\d*\.?\d*$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      let newFormValues = [...formValues];
      newFormValues[i][e.target.name] = e.target.value;
      setFormValues(newFormValues);
    }

    if (formValues[0].weight !== "" && formValues[0].reps !== "") {
      setDisabledBtn(false);
    }
  };

  let addFormFields = () => {
    // let flag = false;
    // for (let i = 0; i < formValues.length; i++) {
    //   if (formValues[i].weight !== "" && formValues[i].reps !== "") {
    //     flag = true;
    //     // setDisabledBtn(false);
    //   } else {
    //     flag = false;
    //     break;
    //     // setDisabledBtn(true);
    //   }
    // }
    // if (flag === true) {
    //   setDisabledBtn(true);
    // } else {
    //   setDisabledBtn(false);
    // }
    setFormValues([...formValues, { weight: "", reps: "" }]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };
  let handleSubmit = (event) => {
    event.preventDefault();
    // alert(JSON.stringify(formValues));
    dispatch(
      exerciseLogActions.addExerciseToLog({
        nameOfExercise: nameOfExercise,
        routine: { formValues },
      })
    );
    setFormValues([{ weight: "", reps: "" }]);
    handleSnackBarClose();
  };

  const closeModalHandler = () => {
    dispatch(uiActions.toggleModal());
  };

  const handleSnackBarClose = () => {
    dispatch(uiActions.triggerToasterNotif());
  };
  return (
    <React.Fragment>
      <div className={classes["modal-layout"]}>
        <div className={classes["cross"]} onClick={closeModalHandler}>
          <CloseIcon />
        </div>
        <Card id={classes["card-layout"]}>
          <div className={["exercise-illustration"]}>
            <div className={["exercise-illustration-img"]}>
              <img src={imageOfExercise} alt="" />
            </div>
            <div>
              <h2 className={classes["modal-title"]}>{nameOfExercise}</h2>
              <Typography
                fontWeight="400"
                textTransform={"capitalize"}
                sx={{ textAlign: "center" }}
              >
                Equipment Required: {equipmentRequired}
              </Typography>
              <Typography
                fontWeight="400"
                textTransform={"capitalize"}
                sx={{ textAlign: "center" }}
              >
                Muscles Targeted: {musclesTargeted}
              </Typography>
            </div>
          </div>
          <div></div>
          <div className={classes["exercise-details"]}>
            <form onSubmit={handleSubmit}>
              {formValues.map((element, index) => (
                <div className={classes["form-inline"]} key={index}>
                  Set {index + 1}
                  <OutlinedInput
                    type="text"
                    name="weight"
                    className={classes["input-field"]}
                    value={element.weight || ""}
                    onChange={(e) => handleChange(index, e)}
                    endAdornment={
                      <InputAdornment position="end">kg</InputAdornment>
                    }
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                      "aria-label": "weight",
                    }}
                    sx={{ margin: "0.5em" }}
                    required={true}
                  />
                  <OutlinedInput
                    type="text"
                    name="reps"
                    value={element.reps || ""}
                    onChange={(e) => handleChange(index, e)}
                    endAdornment={
                      <InputAdornment position="end">Reps</InputAdornment>
                    }
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                      "aria-label": "weight",
                    }}
                    sx={{ margin: "0.5em" }}
                    required={true}
                    className={classes["input-field"]}
                  />
                  {/* <input
                  type="text"
                  name="name"
                  value={element.name || ""}
                  onChange={(e) => handleChange(index, e)}
                /> */}
                  {/* <input
                  type="text"
                  name="email"
                  value={element.email || ""}
                  onChange={(e) => handleChange(index, e)}
                /> */}
                  {index ? (
                    <button
                      type="button"
                      className={classes["remove"]}
                      onClick={() => removeFormFields(index)}
                    >
                      <DeleteIcon sx={{ color: "white" }} />
                    </button>
                  ) : null}
                </div>
              ))}
              <div className={classes["button-section"]}>
                <button
                  className={classes["button"]}
                  type="button"
                  onClick={() => addFormFields()}
                >
                  Add Set
                </button>
                {disabledBtn && (
                  <button
                    className={classes["disabled-button"]}
                    disabled={disabledBtn}
                  >
                    Add to routine
                  </button>
                )}
                {!disabledBtn && (
                  <button className={classes["button"]} type="submit">
                    Add to routine
                  </button>
                )}
              </div>
            </form>
          </div>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default ExerciseModal;
/**<div
            class="flex flex-col "
            className={classes["exercise-details-table"]}
          >
            <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="py-4 inline-block min-w-full sm:px-6 lg:px-8">
                <div class="overflow-hidden">
                  <table class="min-w-full text-center ">
                    <thead class="border-b bg-green-500">
                      <tr>
                        <th
                          scope="col"
                          class="text-sm font-medium text-white px-6 py-4"
                        >
                          Set
                        </th>
                        <th
                          scope="col"
                          class="text-sm font-medium text-white px-6 py-4"
                        >
                          Weight
                        </th>
                        <th
                          scope="col"
                          class="text-sm font-medium text-white px-6 py-4"
                        >
                          Reps
                        </th>
                        <th
                          scope="col"
                          class="text-sm font-medium text-white px-6 py-4"
                        ></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="bg-white border-b">
                        <td class=" whitespace-nowrap text-sm font-medium text-gray-900">
                          1
                        </td>
                        <td class="text-sm text-gray-900 font-light whitespace-nowrap">
                          <FormControl
                            sx={{ m: 1, width: "12ch" }}
                            variant="outlined"
                            size="small"
                          >
                            <OutlinedInput
                              id="outlined-adornment-weight"
                              // value={values.weight}
                               onBlur={handleWeightChange}
                              endAdornment={
                                <InputAdornment position="end">
                                  kg
                                </InputAdornment>
                              }
                              aria-describedby="outlined-weight-helper-text"
                              inputProps={{
                                "aria-label": "weight",
                              }}
                            />
                          </FormControl>
                        </td>
                        <td class="text-sm text-gray-900 font-light whitespace-nowrap">
                          <FormControl
                            sx={{ m: 1, width: "12ch" }}
                            variant="outlined"
                            size="small"
                          >
                            <OutlinedInput
                              id="outlined-adornment-reps "
                              // value={values.reps}
                               onBlur={handleRepChange}
                              aria-describedby="outlined-reps-helper-text"
                              inputProps={{
                                "aria-label": "reps",
                              }}
                            />
                          </FormControl>
                        </td>
                      </tr>
                      <tr class="bg-white border-b">
                        <td class=" whitespace-nowrap text-sm font-medium text-gray-900">
                          2
                        </td>
                        <td class="text-sm text-gray-900 font-light  whitespace-nowrap">
                          <FormControl
                            sx={{ m: 1, width: "12ch" }}
                            variant="outlined"
                            size="small"
                          >
                            <OutlinedInput
                              id="outlined-adornment-weight"
                              // value={values.weight}
                               onBlur={handleWeightChange}
                              endAdornment={
                                <InputAdornment position="end">
                                  kg
                                </InputAdornment>
                              }
                              aria-describedby="outlined-weight-helper-text"
                              inputProps={{
                                "aria-label": "weight",
                              }}
                            />
                          </FormControl>
                        </td>
                        <td class="text-sm text-gray-900 font-light whitespace-nowrap">
                          <FormControl
                            sx={{ m: 1, width: "12ch" }}
                            variant="outlined"
                            size="small"
                          >
                            <OutlinedInput
                              id="outlined-adornment-reps"
                              // value={values.reps}
                               onBlur={handleRepChange}
                              aria-describedby="outlined-reps-helper-text"
                              inputProps={{
                                "aria-label": "reps",
                              }}
                            />
                          </FormControl>
                        </td>
                        <td>
                          <DeleteIcon />
                        </td>
                      </tr>
                      <tr class="bg-white border-b">
                        <td class=" whitespace-nowrap text-sm font-medium text-gray-900">
                          3
                        </td>
                        <td class="text-sm text-gray-900 font-light  whitespace-nowrap">
                          <FormControl
                            sx={{ m: 1, width: "12ch" }}
                            variant="outlined"
                            size="small"
                          >
                            <OutlinedInput
                              id="outlined-adornment-weight"
                              // value={values.weight}
                               onBlur={handleWeightChange}
                              endAdornment={
                                <InputAdornment position="end">
                                  kg
                                </InputAdornment>
                              }
                              aria-describedby="outlined-weight-helper-text"
                              inputProps={{
                                "aria-label": "weight",
                              }}
                            />
                          </FormControl>
                        </td>
                        <td class="text-sm text-gray-900 font-light whitespace-nowrap">
                          <FormControl
                            sx={{ m: 1, width: "12ch" }}
                            variant="outlined"
                            size="small"
                          >
                            <OutlinedInput
                              id="outlined-adornment-reps"
                              // value={values.reps}
                               onBlur={handleRepChange}
                              aria-describedby="outlined-reps-helper-text"
                              inputProps={{
                                "aria-label": "reps",
                              }}
                            />
                          </FormControl>
                        </td>
                        <td>
                          <DeleteIcon />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div> */
