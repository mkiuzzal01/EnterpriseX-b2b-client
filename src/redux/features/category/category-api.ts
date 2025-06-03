import { baseApi } from "../../api/baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSubCategory: builder.mutation({
      query: (data) => ({
        url: "",
        method: "POST",
        body: data,
      }),
    }),
    updateSubCategory: builder.mutation({
      query: (data) => ({
        url: "",
        method: "PATCH",
        body: data,
      }),
    }),
    deleteSubCategory: builder.query({
      query: () => ({
        url: "",
        method: "DELETE",
      }),
    }),
    allSubCategory: builder.query({
      query: () => ({
        url: "",
        method: "POST",
      }),
    }),
    singleSubCategory: builder.query({
      query: (id: string) => ({
        url: `${id}`,
        method: "POST",
      }),
    }),
    createMainCategory: builder.mutation({
      query: (data) => ({
        url: "",
        method: "POST",
        body: data,
      }),
    }),
    updateMainCategory: builder.mutation({
      query: (data) => ({
        url: "",
        method: "PATCH",
        body: data,
      }),
    }),
    deleteMainCategory: builder.query({
      query: () => ({
        url: "",
        method: "DELETE",
      }),
    }),
    allMainCategory: builder.query({
      query: () => ({
        url: "",
        method: "GET",
      }),
    }),
    singleMainCategory: builder.query({
      query: () => ({
        url: "",
        method: "GET",
      }),
    }),
    createCategory: builder.mutation({
      query: (data) => ({
        url: "",
        method: "POST",
        body: data,
      }),
    }),
    updateCategory: builder.mutation({
      query: (data) => ({
        url: "",
        method: "POST",
        body: data,
      }),
    }),
    deleteCategory: builder.query({
      query: () => ({
        url: "",
        method: "DELETE",
      }),
    }),
    allCategory: builder.query({
      query: () => ({
        url: "",
        method: "GET",
      }),
    }),
    singleCategory: builder.query({
      query: () => ({
        url: "",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useAllSubCategoryQuery,
  useSingleSubCategoryQuery,
  useUpdateSubCategoryMutation,
  useDeleteSubCategoryQuery,

  useAllMainCategoryQuery,
  useSingleMainCategoryQuery,
  useDeleteMainCategoryQuery,
  useUpdateMainCategoryMutation,

  useAllCategoryQuery,
  useSingleCategoryQuery,
  useDeleteCategoryQuery,
  useUpdateCategoryMutation,
} = categoryApi;
