import { baseApi } from "../../api/baseApi";

const imageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //upload image:
    uploadImage: builder.mutation({
      query: (data) => ({
        url: "/gallery/create-photo",
        method: "POST",
        body: data,
      }),
    }),
    //update image:
    updateImage: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/gallery/update-photo/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    //delete image:
    deleteImage: builder.mutation({
      query: (id) => ({
        url: `/gallery/delete-photo/${id}`,
        method: "DELETE",
      }),
    }),
    //get all images:
    getImages: builder.query({
      query: ({ folderId, search }) => ({
        url: `/gallery/all-photo?fields=${folderId}&searchTerm=${search}`,
        method: "GET",
      }),
    }),
    //get image by id:
    getImageById: builder.query({
      query: (id) => ({
        url: `/gallery/single-photo/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useUploadImageMutation,
  useUpdateImageMutation,
  useDeleteImageMutation,
  useGetImagesQuery,
  useGetImageByIdQuery,
} = imageApi;
