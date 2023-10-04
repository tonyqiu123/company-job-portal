import { createSlice } from '@reduxjs/toolkit'

export const jwtSlice = createSlice({
    name: 'jwt',
    initialState: {
        userJwt: null,
        adminJwt: null
    },
    reducers: {
        overwriteUserJwt: (state, action) => {
            state.userJwt = action.payload;
        },
        overwriteAdminJwt: (state, action) => {
            state.adminJwt = action.payload;
        },
    },
});

export const { overwriteUserJwt, overwriteAdminJwt } = jwtSlice.actions

export default jwtSlice.reducer