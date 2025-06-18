import { Avatar, Box } from "@mui/material";
import DataTable from "../../../shared/DataTable";
import Loader from "../../../shared/Loader";
import { useToast } from "../../utils/tost-alert/ToastProvider";
import { useAllUsersQuery } from "../../../redux/features/user/user-api";

const userColumns = [
  {
    field: "image",
    headerName: "Image",
    width: 100,
    sortable: false,
    filterable: false,
    renderCell: () => (
      <Avatar
        alt="User"
        src="/default-avatar.png"
        sx={{ width: 40, height: 40 }}
      />
    ),
  },
  { field: "email", headerName: "Email", width: 200 },
  { field: "role", headerName: "Role", width: 150 },
  { field: "status", headerName: "Status", width: 120 },
  { field: "isDeleted", headerName: "Is Deleted", width: 120 },
];

const AllUsers = () => {
  const { showToast } = useToast();
  const { data: users = [], isLoading } = useAllUsersQuery(undefined);

  if (isLoading) return <Loader />;

  return (
    <Box p={3}>
      <DataTable
        title="All Users"
        rows={users?.data}
        columns={userColumns}
        updatePath="/update-user"
        createPath="/create-user"
        viewPath="/view-user"
      />
    </Box>
  );
};

export default AllUsers;
