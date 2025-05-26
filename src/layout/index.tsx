import { Outlet, useNavigate } from "react-router-dom";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import { navigation } from "./navigation";
import React from "react";

export default function Index() {
  const navigate = useNavigate();
  const authentication = React.useMemo(() => {
    return {
      signIn: async () => {
        navigate("/login");
      },
      signOut: async () => {
        // Implement sign-out logic here
      },
    };
  }, []);

  return (
    <AppProvider
      authentication={authentication}
      navigation={navigation}
      branding={{
        title: "EnterpriseX",
      }}
    >
      <DashboardLayout>
        <PageContainer>
          <Outlet />
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
