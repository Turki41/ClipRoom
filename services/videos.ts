import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const videos = createApi({
    reducerPath: "videos",
    baseQuery: fetchBaseQuery({}),
    endpoints: (builder) => ({
        getVideos: builder.query<Video[], void>({
            query: () => ({
                url: 'api/videos',
                method: 'GET',
            })
        })
    })
})

export const { useGetVideosQuery } = videos;