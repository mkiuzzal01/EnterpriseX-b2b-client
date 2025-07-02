import { Box, Typography, Tabs, Tab } from "@mui/material";
import { useState } from "react";
import SubCategories from "./components/SubCategories";
import MainCategory from "./components/MainCategory";
import Category from "./components/Category";

const AllCategory = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Box>
      <Tabs value={tabIndex} onChange={handleChange}>
        <Tab label="Main Categories" />
        <Tab label="Sub Categories" />
        <Tab label="Categories" />
      </Tabs>

      {tabIndex === 0 && (
        <Box sx={{ mt: 2 }}>
          <MainCategory />
        </Box>
      )}

      {tabIndex === 1 && (
        <Box sx={{ mt: 2 }}>
          <SubCategories />
        </Box>
      )}

      {tabIndex === 2 && (
        <Box sx={{ mt: 2 }}>
          <Category />
        </Box>
      )}
    </Box>
  );
};

export default AllCategory;
