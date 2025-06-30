import React, { useState, type ChangeEvent, type MouseEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  DataGrid,
  type GridColDef,
  type GridRenderCellParams,
} from "@mui/x-data-grid";
import {
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Grid,
  Fab,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import SelectInputField from "../components/utils/input-fields/SelectInputField";
import ReusableForm from "./ReusableFrom";

interface RowData {
  _id: string;
  slug?: string;
  [key: string]: unknown;
}

interface Meta {
  total: number;
  page: number;
  limit: number;
}

interface TableProps {
  rows: RowData[];
  columns: GridColDef[];
  title?: string;
  updatePath: string;
  viewPath: string;
  createPath: string;
  onDelete?: (id: string) => void;
  setSearch?: (value: string) => void;
  search?: string;
  setFilter?: (value: string) => void;
  filter?: string;
  page: number;
  setPage: (value: number) => void;
  limit: number;
  setLimit: (value: number) => void;
  meta?: Meta;
}

const DataTable: React.FC<TableProps> = ({
  rows,
  columns,
  title = "Data Table",
  updatePath,
  viewPath,
  createPath,
  onDelete,
  setSearch,
  search = "",
  setFilter,
  page,
  setPage,
  limit,
  setLimit,
  meta,
}) => {
  const navigate = useNavigate();
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);

  const handleMenuOpen = (e: MouseEvent<HTMLButtonElement>, id: string) => {
    setMenuAnchor(e.currentTarget);
    setSelectedRowId(id);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedRowId(null);
  };

  const actionColumn: GridColDef = {
    field: "actions",
    headerName: "Actions",
    width: 100,
    sortable: false,
    filterable: false,
    renderCell: (params: GridRenderCellParams<any, RowData>) => (
      <>
        <IconButton
          onClick={(e) => handleMenuOpen(e, params.row._id)}
          size="small"
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor) && selectedRowId === params.row._id}
          onClose={handleMenuClose}
        >
          {onDelete && (
            <MenuItem
              onClick={() => {
                onDelete(params.row._id);
                handleMenuClose();
              }}
              sx={{ color: "error.main" }}
            >
              <DeleteIcon fontSize="small" sx={{ mr: 1 }} /> Delete
            </MenuItem>
          )}
          <MenuItem
            onClick={() => {
              navigate(`${updatePath}/${params.row.slug ?? params.row._id}`);
              handleMenuClose();
            }}
            sx={{ color: "primary.main" }}
          >
            <EditIcon fontSize="small" sx={{ mr: 1 }} /> Edit
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate(`${viewPath}/${params.row.slug ?? params.row._id}`);
              handleMenuClose();
            }}
            sx={{ color: "primary.main" }}
          >
            <RemoveRedEyeIcon fontSize="small" sx={{ mr: 1 }} /> View
          </MenuItem>
        </Menu>
      </>
    ),
  };

  return (
    <Box>
      <Typography
        variant="h5"
        sx={{ mb: 2, fontWeight: 600, textAlign: "center" }}
      >
        {title}
      </Typography>

      <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <Grid size={{ xs: 12, md: 2 }}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Fab
              size="small"
              color="warning"
              onClick={() => navigate(-1)}
              title="Go back"
            >
              <ArrowBackIcon />
            </Fab>
            <Link to={createPath}>
              <Fab size="small" color="primary" title="Add New">
                <AddIcon />
              </Fab>
            </Link>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 10 }}>
          <ReusableForm>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Search"
                  fullWidth
                  variant="outlined"
                  value={search}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setSearch?.(e.target.value)
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <SelectInputField
                  label="Filter by status"
                  name="status"
                  options={["active", "inactive", "blocked", "leaved"]}
                  onChange={(value: string) => setFilter?.(value)}
                />
              </Grid>
            </Grid>
          </ReusableForm>
        </Grid>
      </Grid>

      <DataGrid
        rows={rows}
        columns={[...columns, actionColumn]}
        getRowId={(row) => row._id}
        autoHeight
        disableRowSelectionOnClick
        paginationMode="server"
        rowCount={meta?.total || 0}
        paginationModel={{ page: page - 1, pageSize: limit }}
        onPaginationModelChange={({ page: newPage, pageSize: newLimit }) => {
          setPage(newPage + 1);
          if (newLimit !== limit) {
            setLimit(newLimit);
            setPage(1);
          }
        }}
        pageSizeOptions={[5, 10, 20, 50, 100]}
      />
    </Box>
  );
};

export default DataTable;
