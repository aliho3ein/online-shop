import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

const loginSlice = createSlice({
  name: "LogInSlice",
  initialState: {
    users: [],
    userName: "",
    token: "",
    abMn: false,
    abTm: false,
    abSc: false,
  },
  reducers: {
    logInUser: (state: any, action: PayloadAction<any>) => {
      state.token = action.payload.token as string | null;
      state.userName = action.payload.name as string | null;
      state.abMn = action.payload.ability[1];
      state.abTm = action.payload.ability[2];
      state.abSc = action.payload.ability[3];
      if (action.payload.ability[0] == true) {
        state.abMn = true;
        state.abTm = true;
        state.abSc = true;
      }
    },
    logOutUser: (state: any) => {
      state.token = "";
    },
    setUsers: (state: any, action: PayloadAction<any>) => {
      state.users = action.payload;
    },
    addUser: (state: any, action: PayloadAction<object>) => {
      state.users = [...state.users, action.payload];
    },
    updateItem: (state: any, action: PayloadAction<any>) => {
      let upUs = action.payload;
      let Us = state.users.filter((el: any) => el.key !== upUs.key);
      state.users = [...Us, upUs].sort(compare);
    },
    deleteUser: (state: any, action: PayloadAction<object>) => {
      state.users = state.users.filter((el: any) => el.key !== action.payload);
    },
  },
});

export default loginSlice.reducer;
export const {
  logInUser,
  setUsers,
  addUser,
  updateItem,
  deleteUser,
  logOutUser,
} = loginSlice.actions;

export const selectAllUser = (state: RootState) => state.loginSlice.users;
export const selectUser = (state: RootState) => state.loginSlice.userName;
export const selectToken = (state: RootState) => state.loginSlice.token;
export const mnValid = (state: RootState) => state.loginSlice.abMn;
export const tmValid = (state: RootState) => state.loginSlice.abTm;
export const scValid = (state: RootState) => state.loginSlice.abSc;

/*================= Sort the Lists =======================*/
function compare(a: any, b: any) {
  if (a.key < b.key) {
    return -1;
  }
  if (a.key > b.key) {
    return 1;
  }
  return 0;
}
