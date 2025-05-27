import { Outlet } from "react-router-dom";
import { ReactRouterAppProvider } from "@toolpad/core/react-router";
import { DashboardLayout, ThemeSwitcher } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import { navigation } from "./navigation";
import { IconButton, Stack, TextField, Tooltip } from "@mui/material";
import { SearchIcon } from "lucide-react";
import User from "./components/User";

const branding = {
  title: "EnterpriseX",
  homeUrl: "/overview",
};


const App = () => {

  const ToolbarActionsSearch = () => {
    return (
      <Stack direction="row">
        <Tooltip title="Search" enterDelay={1000}>
          <div>
            <IconButton
              type="button"
              aria-label="search"
              sx={{
                display: { xs: "inline", md: "none" },
              }}
            >
              <SearchIcon />
            </IconButton>
          </div>
        </Tooltip>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          slotProps={{
            input: {
              endAdornment: (
                <IconButton type="button" aria-label="search" size="small">
                  <SearchIcon />
                </IconButton>
              ),
              sx: { pr: 0.5 },
            },
          }}
          sx={{ display: { xs: "none", md: "inline-block" }, mr: 1 }}
        />
        <ThemeSwitcher />
      </Stack>
    );
  };

  return (
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
  );
};

export default App;
