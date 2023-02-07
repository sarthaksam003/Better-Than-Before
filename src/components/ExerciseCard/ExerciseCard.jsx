import React from "react";
import { Typography, Card } from "@mui/material";
import { uiActions } from "../../store/ui-slice";
import { useDispatch } from "react-redux";
// import ExerciseModal from "../ExerciseModal/ExerciseModal";

const ExerciseCard = (props) => {
  // const [showModal, setShowModal] = useState("");

  const dispatch = useDispatch();

  const setupModal = (exercise, image, equipmentReq, target) => {
    dispatch(uiActions.toggleModal());
    dispatch(uiActions.setModalTitle(exercise));
    dispatch(uiActions.setModalImage(image));
    dispatch(uiActions.setModalEquipReq(equipmentReq));
    dispatch(uiActions.setModalTarget(target));
  };

  return (
    <React.Fragment>
      <Card
        onClick={() =>
          setupModal(
            props.name,
            props.image,
            props.equipmentReq,
            props.targetMuscle
          )
        }
      >
        <img src={props.image} alt={props.name} loading="lazy" />
        <Typography
          ml="0px"
          fontSize="1em"
          color="#000"
          fontWeight="bold"
          mt="11px"
          pb="10px"
          textTransform="capitalize"
        >
          {props.name}
        </Typography>
      </Card>
    </React.Fragment>
  );
};

export default ExerciseCard;
