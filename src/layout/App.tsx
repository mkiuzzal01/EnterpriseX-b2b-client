import { Outlet } from "react-router-dom";
import { ReactRouterAppProvider } from "@toolpad/core/react-router";
import { DashboardLayout, ThemeSwitcher } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import { IconButton, Stack, TextField, Tooltip } from "@mui/material";
import { SearchIcon } from "lucide-react";
import { useMemo } from "react";
import User from "./components/User";
import { navigation } from "./Navigation";
import ProtectedRoute from "../route/protectedRoute";
// import { useAppDispatch } from "../redux/hooks";

const branding = {
  title: "EnterpriseX",
  homeUrl: "/overview",
};

const App = () => {
  // const dispatch = useAppDispatch();
  const ToolbarActionsSearch = useMemo(
    () => () => (
      <Stack direction="row" alignItems="center" spacing={1}>
        <Tooltip title="Search" enterDelay={1000}>
          <IconButton
            type="button"
            aria-label="Open search"
            sx={{ display: { xs: "inline", md: "none" } }}
          >
            <SearchIcon />
          </IconButton>
        </Tooltip>

        <TextField
          label="Search"
          variant="outlined"
          size="small"
          sx={{ display: { xs: "none", md: "inline-flex" }, mr: 1 }}
          InputProps={{
            endAdornment: (
              <IconButton type="button" aria-label="Search" size="small">
                <SearchIcon />
              </IconButton>
            ),
          }}
        />

        <ThemeSwitcher />
      </Stack>
    ),
    []
  );

  return (
      <ProtectedRoute>
        <ReactRouterAppProvider navigation={navigation} branding={branding}>
          <DashboardLayout
            slots={{
              toolbarActions: ToolbarActionsSearch,
              toolbarAccount: User,
            }}
          >
            <PageContainer breadcrumbs={[]} title="">
              <Outlet />
            </PageContainer>
          </DashboardLayout>
        </ReactRouterAppProvider>
      </ProtectedRoute>
  );
};

export default App;
