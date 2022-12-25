import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

const portSlice = createSlice({
  name: "portSlice",
  initialState: {
    category: [],
    items: [],
    action: "",
    userName: "",
    token: "",
  },
  reducers: {
    setCategory: (state: any, action: PayloadAction<any>) => {
      state.items = action.payload.item;
      state.category = action.payload.Cat;
    },
    addCategory: (state: any, action: PayloadAction<object>) => {
      state.category = [...state.category, action.payload];
    },
    addItem: (state: any, action: PayloadAction<object>) => {
      state.items = [...state.items, action.payload];
    },
    setAction: (state: any, action: PayloadAction<any>) => {
      state.action = action.payload;
    },
    deleteCategory: (state: any, action: PayloadAction<object>) => {
      let items = state.category.filter((el: any) => el.key !== action.payload);
      state.category = items;
    },
    deleteItem: (state: any, action: PayloadAction<object>) => {
      let items = state.items.filter((el: any) => el.key !== action.payload);
      state.items = items;
    },
    updateCategory: (state: any, action: PayloadAction<any>) => {
      let upCat = action.payload.newCat;
      let Cat = state.category.filter((el: any) => el.key !== upCat.key);
      state.category = [...Cat, upCat];
    },
    updateItem: (state: any, action: PayloadAction<any>) => {
      let upItem = action.payload.newIt;
      let Cat = state.items.filter((el: any) => el.key !== upItem.key);
      state.items = [...Cat, upItem];
    },
    updateAllItems: (state: any, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (el: any) => el.category !== action.payload
      );
    },
  },
});

/* Export Reducers */
export default portSlice.reducer;
export const {
  addCategory,
  addItem,
  setAction,
  setCategory,
  deleteCategory,
  deleteItem,
  updateCategory,
  updateItem,
  updateAllItems,
} = portSlice.actions;

/* Export States */
export const selectCat = (state: RootState) => state.portSlice.category;
export const selectItem = (state: RootState) => state.portSlice.items;
export const selectAct = (state: RootState) => state.portSlice.action;
