import { baseApi } from "../../api/baseApi";

const sellerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //create user:
    createSeller: builder.mutation({
      query: (data) => ({
        url: "/user/create-seller",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCreateSellerMutation } = sellerApi;
