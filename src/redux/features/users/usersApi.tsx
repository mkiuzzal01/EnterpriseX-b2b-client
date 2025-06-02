/* eslint-disable @typescript-eslint/no-explicit-any */
import type { TQueryParam, TResponseRedux } from "../../../types/global";
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

    //this is for all stack holder:
    allStakeHolder: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/stakeholder/all-stakeholder",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["allStakeHolder"],
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),


  }),
});

export const { useAllUsersQuery, useSingleUserQuery, useAllStakeHolderQuery } =
  userApi;
