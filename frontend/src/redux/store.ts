import { configureStore } from '@reduxjs/toolkit'
import jobsReducer from './jobsSlice'
import userReducer from './userSlice'
import jwtReducer from './jwtSlice'

export const store = configureStore({
  reducer: {
    jobs: jobsReducer,
    user: userReducer,
    jwt: jwtReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch