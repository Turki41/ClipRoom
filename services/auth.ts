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
        }),
        checkAuth: builder.query<User, void>({
            query: () => ({
                url: '/api/auth/checkAuth',
                method: 'GET',
            })
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: "/api/auth/logout",
                method: "POST",
            })
        })
    })
});

export const { useSignupMutation, useLoginMutation, useCheckAuthQuery, useLogoutMutation } = authApi;