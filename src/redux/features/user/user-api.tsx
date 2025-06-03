import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //get all users:
    allUsers: builder.query({
      query: () => ({
        url: "/user/all-user",
        method: "GET",
      }),
    }),

    //this is single users:
    singleUser: builder.query({
      query: (id: string) => ({
        url: `/user/single-user/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useAllUsersQuery, useSingleUserQuery } = userApi;
