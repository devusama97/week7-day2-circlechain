import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL || 'https://week7-day2-circlechain.onrender.com',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['User', 'Newsletter'],
    endpoints: (builder) => ({
        subscribeToNewsletter: builder.mutation<{ success: boolean; message: string }, { email: string }>({
            query: (body) => ({
                url: 'newsletter/subscribe',
                method: 'POST',
                body,
            }),
        }),
        getUserProfile: builder.query<{ email: string; firstName: string; lastName: string; picture: string }, void>({
            query: () => 'users/profile',
            providesTags: ['User'],
        }),
        signup: builder.mutation<{ access_token: string; user: any }, { firstName: string; lastName: string; email: string; password: string }>({
            query: (body) => ({
                url: 'auth/signup',
                method: 'POST',
                body,
            }),
        }),
        login: builder.mutation<{ access_token: string; user: any }, { email: string; password: string }>({
            query: (body) => ({
                url: 'auth/login',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const { useSubscribeToNewsletterMutation, useGetUserProfileQuery, useSignupMutation, useLoginMutation } = api;
