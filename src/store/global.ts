import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// const initialState: GlobalStateProps = {
//   uploaded: null,
//   selectedProducts: [],
//   service: "",
// };

// const globalSlice = createSlice({
//   name: "global",
//   initialState,
//   reducers: {
//     setUploaded: (state, action) => {
//       state.uploaded = action.payload;
//     },
//     setSelectedProducts: (state, action) => {
//       state.selectedProducts = action.payload;
//     },

//     setService: (state, action) => {
//       state.service = action.payload;
//     },
//   },
// });

// export const { setUploaded, setSelectedProducts, setService } =
//   globalSlice.actions;
// export default globalSlice.reducer;

const initialState: GlobalStateProps = {
  uploaded: null,
  selectedProducts: [],
  service: "",
  selectedCase: null,
  editTransactionId: null,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setUploaded: (state, action) => {
      state.uploaded = action.payload;
    },
    setSelectedProducts: (state, action) => {
      state.selectedProducts = action.payload;
    },
    setService: (state, action) => {
      state.service = action.payload;
    },
    setSelectedCase: (state, action) => {
      state.selectedCase = action.payload;
    },
    setEditTransactionId: (state, action: PayloadAction<string | null>) => {
      state.editTransactionId = action.payload;
    },
  },
});

export const {
  setUploaded,
  setSelectedProducts,
  setService,
  setSelectedCase,
  setEditTransactionId,
} = globalSlice.actions;

export default globalSlice.reducer;
