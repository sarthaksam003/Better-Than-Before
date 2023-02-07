import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    modalVisible: false,
    modalTitle: "",
    modalImage: "",
    modalEquipReq: "",
    modalTarget: "",
    toasterNotif: false,
    loading: false,
  },
  reducers: {
    toggleModal(state) {
      state.modalVisible = !state.modalVisible;
    },
    setModalTitle(state, name) {
      state.modalTitle = name.payload;
    },
    setModalImage(state, image) {
      state.modalImage = image.payload;
    },
    setModalEquipReq(state, equipmentReq) {
      state.modalEquipReq = equipmentReq.payload;
    },
    setModalTarget(state, target) {
      state.modalTarget = target.payload;
    },
    triggerToasterNotif(state) {
      state.toasterNotif = !state.toasterNotif;
    },
    triggerLoading(state) {
      state.loading = !state.loading;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
