import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserProps, UsersListProps } from "../../types/users";


const initialState:UsersListProps  = {
    users: [],
    isLoading: false,
    error: ''
}

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        usersFetching(state) {
            state.isLoading = true; 
        },
        usersFetchingSuccess(state, action: PayloadAction<UserProps[]>) {
            state.isLoading = false; 
            state.users = action.payload;
            state.error = '';
        },
        usersFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false; 
            state.error = action.payload;
        }
    },
});

export default usersSlice.reducer;