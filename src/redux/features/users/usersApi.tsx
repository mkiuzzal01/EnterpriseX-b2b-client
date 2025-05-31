import { baseApi } from "../../api/baseApi";
const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (id: string) => ({
        url: `/user/user-info/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetUserQuery } = userApi;
