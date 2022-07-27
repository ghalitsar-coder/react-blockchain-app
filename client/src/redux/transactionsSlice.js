import { createSlice } from "@reduxjs/toolkit";

const Transaction = createSlice({
  name: "transaction",
  initialState: {
    isFetching: false,
    isError: false,
    errorMessage: "",
    currentAccount: "",
    masterData: {},
    gifUrl: "",
    transactions: [],
    transactionCount: localStorage.getItem("transactionCount"),
  },
  reducers: {
    transactionStart: (state, { payload }) => {
      state.isFetching = true;
      state.isError = false;
    },
    connectUserWallet: (state, { payload }) => {
      state.isFetching = false;
      console.log(payload);
      state.currentAccount = payload;
    },
    fillFormData: (state, { payload }) => {
      console.log(payload);
      state.masterData = { ...state.masterData, ...payload };
    },
    addTransaction: (state, { payload }) => {
      state.transactionCount = payload;
    },
    addTransactions: (state, { payload }) => {
      state.transactions = payload;
    },
    addGiftUrl: (state, { payload }) => {
      state.gifUrl = payload;
    },
    resetForm: (state, { payload }) => {
      state.masterData = {};
    },
    transactionEnd: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload;
    },
  },
});

export const {
  connectUserWallet,
  transactionStart,
  transactionEnd,
  fillFormData,
  addTransaction,
  resetForm,
  addGiftUrl,
  addTransactions,
} = Transaction.actions;
export default Transaction.reducer;
