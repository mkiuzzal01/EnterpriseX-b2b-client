"use client";
import { CssVarsProvider } from "@mui/joy/styles";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import { Box, Typography } from "@mui/joy";
import {
  useAllCategoryQuery,
  useAllMainCategoryQuery,
  useAllSubCategoryQuery,
} from "../../../redux/features/category/category-api";

const AllCategory = () => {
  const { data: subCate, isLoading: isSubCate } = useAllSubCategoryQuery({});
  const { data: mainCate, isLoading: isMainCate } = useAllMainCategoryQuery({});
  const { data: cate, isLoading: isCate } = useAllCategoryQuery({});

  console.log(subCate);

  return (
    <Box>
      <CssVarsProvider>
        <Tabs aria-label="Category Tabs" defaultValue={0}>
          <TabList>
            <Tab>Main Categories</Tab>
            <Tab>Sub Categories</Tab>
            <Tab>Product Categories</Tab>
          </TabList>

          <TabPanel value={0}>
            <Typography level="title-md" sx={{ mb: 1 }}>
              All Main Categories
            </Typography>
            {/* Replace this with your MainCategoryList component */}
            <Box>Coming soon: Main Category List/Table</Box>
          </TabPanel>

          <TabPanel value={1}>
            <Typography level="title-md" sx={{ mb: 1 }}>
              All Sub Categories
            </Typography>
            {/* Replace this with your SubCategoryList component */}

            <Box>Coming soon: Sub Category List/Table</Box>
          </TabPanel>

          <TabPanel value={2}>
            <Typography level="title-md" sx={{ mb: 1 }}>
              All Product Categories
            </Typography>
            {/* Replace this with your CategoryList component */}
            <Box>Coming soon: Product Category List/Table</Box>
          </TabPanel>
        </Tabs>
      </CssVarsProvider>
    </Box>
  );
};

export default AllCategory;
