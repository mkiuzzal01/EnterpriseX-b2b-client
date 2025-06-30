import { Box, Button, Grid, IconButton, Paper } from "@mui/material";
import FormHeader from "../../utils/FormHeader";
import ReusableForm from "../../../shared/ReusableFrom";
import SelectInputField from "../../utils/input-fields/SelectInputField";
import TextInput from "../../utils/input-fields/TextInput";
import SectionHeader from "../../utils/section/SectionHeader";
import { BiSolidCategory } from "react-icons/bi";
import {
  useAllMainCategoryQuery,
  useAllSubCategoryQuery,
} from "../../../redux/features/category/category-api";
import Loader from "../../../shared/Loader";
import ReusableModal from "../../../shared/ReusableModal";
import { useState } from "react";

type SubCategoryProps = {
  name: string;
};
type CategoryProps = {
  name: string;
  mainCategoryId?: string;
  subCategoryId?: string;
};
type MainCategoryProps = {
  name: string;
};
const CreateCategory = () => {
  const [isSubCate, setSubCate] = useState(false);
  const [isCate, setCate] = useState(false);
  const { data: subCategoryData, isLoading } = useAllSubCategoryQuery({});
  const { data: mainCategoryData, isLoading: isMainCategoryLoading } =
    useAllMainCategoryQuery({});

  console.log(mainCategoryData?.data);

  const handleSubCategory = (data: SubCategoryProps) => {
    console.log(data);
  };
  const handleMainCategory = (data: CategoryProps) => {
    console.log(data);
  };
  const handleCategory = (data: MainCategoryProps) => {
    console.log(data);
  };

  // handle loading
  if (isLoading || isMainCategoryLoading) return <Loader />;
  return (
    <Box>
      <Paper elevation={2} sx={{ p: { xs: 2, sm: 3, md: 4 }, borderRadius: 2 }}>
        <FormHeader
          title="Create product category"
          subTitle="Provide your proper information"
        />
        <Grid container spacing={3}>
          <Grid
            size={{
              xs: 12,
            }}
          >
            <Grid container spacing={3} alignItems={"center"} pt={3}>
              <Grid
                size={{
                  xs: 12,
                  md: 6,
                }}
              >
                <Button variant="contained" onClick={() => setSubCate(true)}>
                  + Create Sub Category
                </Button>
              </Grid>
              <Grid
                size={{
                  xs: 12,
                  md: 6,
                }}
              >
                <Button variant="contained" onClick={() => setCate(true)}>
                  + Create Main Category
                </Button>
              </Grid>
            </Grid>
          </Grid>

          {/* Category */}
          <Grid size={{ xl: 12 }}>
            <SectionHeader
              icon={<BiSolidCategory />}
              title="Create Category"
              subtitle="Link your main and sub categories into one."
            />
          </Grid>

          <Grid size={{ xs: 12, md: 12 }}>
            <ReusableForm onSubmit={handleCategory}>
              <Box>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <SelectInputField
                      name="mainCategory"
                      label="Main Category"
                      options={mainCategoryData?.data || []}
                      requiredMessage="Select Main Category"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <SelectInputField
                      name="subCategory"
                      label="Sub Category"
                      options={subCategoryData?.data || []}
                      requiredMessage="Select Sub Category"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 12 }}>
                    <TextInput
                      name="nameCategory"
                      label="Category Name"
                      required
                    />
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="success"
                      size="large"
                      sx={{ py: 1.5 }}
                    >
                      Create
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </ReusableForm>
          </Grid>
        </Grid>
      </Paper>

      {/* modal for sub category*/}
      <ReusableModal onClose={() => setSubCate(false)} open={isSubCate}>
        <Grid size={{ xs: 12, md: 6 }}>
          <ReusableForm onSubmit={handleSubCategory}>
            <TextInput name="name" label="Sub Category Name" required />{" "}
            <Box mt={3}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="small"
                sx={{ py: 1.5 }}
              >
                Create
              </Button>
            </Box>
          </ReusableForm>
        </Grid>
      </ReusableModal>

      {/* modal for main category */}
      <ReusableModal onClose={() => setCate(false)} open={isCate}>
        {/* mainCategory */}
        <Grid size={{ xs: 12, md: 6 }}>
          <ReusableForm onSubmit={handleMainCategory}>
            <TextInput name="name" label="Main Category Name" required />
            <Box mt={3}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="small"
                sx={{ py: 1.5 }}
              >
                Create
              </Button>
            </Box>
          </ReusableForm>
        </Grid>
      </ReusableModal>
    </Box>
  );
};

export default CreateCategory;
