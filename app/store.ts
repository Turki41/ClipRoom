import { authApi } from '@/services/auth'
import { uploadApi } from '@/services/upload'
import { videos } from '@/services/videos'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [uploadApi.reducerPath]: uploadApi.reducer,
        [videos.reducerPath]: videos.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware, uploadApi.middleware, videos.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch