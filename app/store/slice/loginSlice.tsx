import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

const loginSlice = createSlice({
  name: "LogInSlice",
  initialState: {
    users: [],
    userName: "aliho3ein",
    token: "5",
    abMn: false,
    abTm: false,
    abSc: false,
  },
  reducers: {
    logInUser: (state: any, action: PayloadAction<any>) => {
      state.token = action.payload.token;
      state.userName = action.payload.name;
      state.abMn = action.payload.ability[1];
      state.abTm = action.payload.ability[2];
      state.abSc = action.payload.ability[3];
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
export const { logInUser, setUsers, addUser, updateItem, deleteUser } =
  loginSlice.actions;

export const selectAllUser = (state: RootState) => state.loginSlice.users;
export const selectUser = (state: RootState) => state.loginSlice.userName;
export const selectToken = (state: RootState) => state.loginSlice.token;

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
