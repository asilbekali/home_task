import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Stack {
    id: string;
    name: string;
    image: string;
}

export const stackApi = createApi({
    reducerPath: "stackApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://54.210.160.235/",
        headers: {
            "Content-Type": "application/json",
        },
    }),
    tagTypes: ["Stack"],
    endpoints: (builder) => ({
        getStacks: builder.query<Stack[], void>({
            query: () => "stacks",
            transformResponse: (response: {
                success: boolean;
                data: Stack[];
            }) => response.data,
            providesTags: ["Stack"],
        }),

        createStack: builder.mutation<void, Omit<Stack, "id">>({
            query: (body) => ({
                url: "stacks",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Stack"],
        }),

        updateStack: builder.mutation<void, Stack>({
            query: ({ id, ...rest }) => ({
                url: `stacks/${id}`,
                method: "PATCH",
                body: rest,
            }),
            invalidatesTags: ["Stack"],
        }),

        deleteStack: builder.mutation<void, string>({
            query: (id) => ({
                url: `stacks/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Stack"],
        }),
    }),
});

export const {
    useGetStacksQuery,
    useCreateStackMutation,
    useUpdateStackMutation,
    useDeleteStackMutation,
} = stackApi;
