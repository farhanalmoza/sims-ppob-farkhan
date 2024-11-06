import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: localStorage.getItem("token") || null,
        isAuthenticated: !!localStorage.getItem("token"),
    },
    reducers: {
        setCredentials: (state, action) => {
            const { token } = action.payload; 
            state.token = token;
            state.isAuthenticated = true;
            localStorage.setItem("token", token);
        },
        logout: (state) => {
            state.token = null;
            state.isAuthenticated = false;
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;