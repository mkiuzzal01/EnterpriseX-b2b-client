import { Box } from "@mui/material";
import DataTable from "../../../shared/DataTable";
import Loader from "../../../shared/Loader";
import { useToast } from "../../utils/tost-alert/ToastProvider";
import { useAllUsersQuery } from "../../../redux/features/user/user-api";

const userColumns = [
  { field: "email", headerName: "Email", width: 200 },
  { field: "role", headerName: "Role", width: 150 },
  { field: "status", headerName: "Status", width: 120 },
  { field: "isDeleted", headerName: "Is Deleted", width: 120 },
];

const AllUsers = () => {
  const { showToast } = useToast();
  const { data, isLoading, isError } = useAllUsersQuery(undefined);

  if (isLoading) return <Loader />;

  if (isError) {
    showToast({
      message: "Something went wrong while fetching users.",
      duration: 2000,
      position: {
        horizontal: "right",
        vertical: "top",
      },
      type: "error",
    });
  }

  const userRows = data?.data || [];

  const handleDelete = async (id: string) => {
    console.log(id);
  };

  return (
    <Box p={3}>
      <DataTable
        title="All Users"
        rows={userRows}
        columns={userColumns}
        updatePath="/update-user"
        createPath="/create-user"
        viewPath="/view-user"
        onDelete={handleDelete}
      />
    </Box>
  );
};

export default AllUsers;
