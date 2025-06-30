import { Box } from "@mui/material";
import { useState } from "react";
import { useAllUsersQuery } from "../../../redux/features/user/user-api";
import Loader from "../../../shared/Loader";
import DataTable from "../../../shared/DataTable";
import { Avatar, Fab } from "@mui/material";

const userColumns = [
  {
    field: "image",
    headerName: "Image",
    width: 100,
    sortable: false,
    filterable: false,
    renderCell: (params: any) => (
      <Fab size="small" color="primary">
        <Avatar
          src={params.value || "/default-avatar.png"}
          alt="User"
          sx={{ width: 40, height: 40 }}
        />
      </Fab>
    ),
  },
  { field: "email", headerName: "Email", width: 200 },
  { field: "role", headerName: "Role", width: 150 },
  { field: "status", headerName: "Status", width: 120 },
  { field: "isDeleted", headerName: "Is Deleted", width: 120 },
];

const AllUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("active");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, isLoading } = useAllUsersQuery({
    searchTerm,
    status: status,
    page,
    limit,
  });

  //loading handle:
  if (isLoading) return <Loader />;

  return (
    <Box p={3}>
      <DataTable
        title="All Users"
        rows={data?.data?.result || []}
        columns={userColumns}
        meta={data?.meta}
        updatePath="/update-user"
        createPath="/create-user"
        viewPath="/view-user"
        search={searchTerm}
        setSearch={setSearchTerm}
        filter={status}
        setFilter={setStatus}
        page={page}
        setPage={setPage}
        limit={limit}
        setLimit={setLimit}
      />
    </Box>
  );
};

export default AllUsers;
