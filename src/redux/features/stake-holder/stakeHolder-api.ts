import type { TQueryParam, TResponseRedux } from "../../../types/global";
import { baseApi } from "../../api/baseApi";

const stakeHolderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //get all stack holder:
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
      // providesTags: ["allStakeHolder"],
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    //create stakeHolder:
    createStakeHolder: builder.mutation({
      query: (data) => ({
        url: "/user/create-stakeholder",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useAllStakeHolderQuery, useCreateStakeHolderMutation } =
  stakeHolderApi;
