import { createSlice } from "@reduxjs/toolkit";

interface VideoItialState {
    file: File | null
    duration: number
}

const initialState: VideoItialState = {
    file: null,
    duration: 0,
}

export const videoSlice = createSlice({
    name: 'video',
    initialState,
    reducers: {
        setFile: (state, action) => {
            if (typeof action.payload === 'object' && 'file' in action.payload) {
                state.file = action.payload.file
                state.duration = action.payload.duration
            } else {
                state.file = action.payload
            }
        },
        resetFileState: (state) => {
            state.file = null
            state.duration = 0
        },
    }
})

export const { setFile, resetFileState } = videoSlice.actions

export default videoSlice.reducer