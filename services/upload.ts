import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const uploadApi = createApi({
    reducerPath: "uploadApi",
    baseQuery: fetchBaseQuery({}),
    endpoints: (builder) => ({
        uploadVideo: builder.mutation({
            query: (body) => ({
                url: 'api/upload/video',
                method: 'POST',
                body,
            })
        })
    })
})

export const { useUploadVideoMutation } = uploadApi;