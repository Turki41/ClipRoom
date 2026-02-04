import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const videos = createApi({
    reducerPath: "videos",
    baseQuery: fetchBaseQuery({ baseUrl: '/' }),
    endpoints: (builder) => ({
        getVideos: builder.query<{ videos: Video[] }, void>({
            query: () => ({
                url: 'api/videos',
                method: 'GET',
            })
        }),
        getVideoById: builder.query<{ video: Video }, any>({
            query: (id: string) => ({
                url: `api/videos/${id}`,
                method: 'GET',
            })
        }),
        getVideosByUserId: builder.query<Video[], any>({
            query: (userId: string) => ({
                url: `api/videos/user/${userId}`,
                method: 'GET',
            })
        }),
    })
});

export const { useGetVideosQuery, useGetVideoByIdQuery, useGetVideosByUserIdQuery } = videos;