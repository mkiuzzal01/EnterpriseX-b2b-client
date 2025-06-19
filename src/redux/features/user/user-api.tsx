import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //update user:
    updateUser: builder.mutation({
      query: ({ _id, ...data }) => ({
        url: `/user/update-user/${_id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    //get all users:
    allUsers: builder.query({
      query: () => ({
        url: "/user/all-user",
        method: "GET",
      }),
    }),

    //this is single users by slug:
    singleUserBySlug: builder.query({
      query: (slug: string) => ({
        url: `/user/single-user-with-slug/${slug}`,
        method: "GET",
      }),
    }),
    //this is single users by id:
    singleUserById: builder.query({
      query: (id: string) => ({
        url: `/user/single-user-with-id/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useAllUsersQuery,
  useSingleUserByIdQuery,
  useSingleUserBySlugQuery,
} = userApi;
