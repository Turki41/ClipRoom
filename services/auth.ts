import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({}),
    endpoints: (builder) => ({
        signup: builder.mutation({
            query: (body) => ({
                url: "/api/auth/signup",
                method: "POST",
                body,
            })
        }),
        login: builder.mutation({
            query: (body) => ({
                url: "/api/auth/login",
                method: "POST",
                body,
            })
        })
    })
})

export const { useSignupMutation, useLoginMutation } = authApi;