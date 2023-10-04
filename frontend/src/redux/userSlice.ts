import { createSlice } from '@reduxjs/toolkit'


interface Attachment {
    _id: string
    fileType: string
}

interface UserState {
    _id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    location?: string;
    phone?: string;
    urls?: string[];
    attachments?: Attachment[];
    date?: Date;
    appliedJobs?: string[];
    shortlisted?: string[];
};


const initialUserState: UserState = {}

export const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        overwriteUserData: (_, action) => {
            return action.payload;
        },
    },
});

export const { overwriteUserData } = userSlice.actions

export default userSlice.reducer