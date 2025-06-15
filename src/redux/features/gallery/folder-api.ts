import { baseApi } from "../../api/baseApi";

const folderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //create folder:
    createFolder: builder.mutation({
      query: (data) => ({
        url: "/gallery/create-folder",
        method: "POST",
        body: data,
      }),
    }),
    //delete folder:
    deleteFolder: builder.mutation({
      query: (id) => ({
        url: `/gallery/delete-folder/${id}`,
        method: "DELETE",
      }),
    }),
    //update folder:
    updateFolder: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/gallery/update-folder/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    //get all folders:
    getFolders: builder.query({
      query: () => ({
        url: "/gallery/all-folder",
        method: "GET",
      }),
    }),
    //get folder by id:
    getFolderById: builder.query({
      query: (id) => ({
        url: `/gallery/single-folder/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateFolderMutation,
  useDeleteFolderMutation,
  useUpdateFolderMutation,
  useGetFoldersQuery,
  useGetFolderByIdQuery,
} = folderApi;
