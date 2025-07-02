"use client";

import { useState } from "react";
import { Box, Button, CircularProgress, Grid, Paper } from "@mui/material";
import FormHeader from "../../utils/FormHeader";
import ReusableForm from "../../../shared/ReusableFrom";
import SelectInputField from "../../utils/input-fields/SelectInputField";
import SectionHeader from "../../utils/section/SectionHeader";
import { BiSolidCategory } from "react-icons/bi";
import {
  useAllCategoryQuery,
  useAllMainCategoryQuery,
  useAllSubCategoryQuery,
  useCreateCategoryMutation,
  useCreateMainCategoryMutation,
  useCreateSubCategoryMutation,
} from "../../../redux/features/category/category-api";
import Loader from "../../../shared/Loader";
import ReusableModal from "../../../shared/ReusableModal";
import AutocompleteInput from "../../utils/input-fields/AutocompleteInput";
import { useToast } from "../../utils/tost-alert/ToastProvider";

type SubCategoryProps = { name: string };
type MainCategoryProps = { name: string };
type CategoryProps = {
  mainCategory: string;
  subCategory: string;
  name: string;
};

const CreateCategory = () => {
  const [isSubCate, setSubCate] = useState(false);
  const [isCate, setCate] = useState(false);
  const { showToast } = useToast();

  const {
    data: subCategoryData,
    isLoading: subLoading,
    refetch: refetchSub,
  } = useAllSubCategoryQuery({});
  const {
    data: mainCategoryData,
    isLoading: mainLoading,
    refetch: refetchMain,
  } = useAllMainCategoryQuery({});
  const {
    data: categoryData,
    isLoading: categoryLoading,
    refetch: refetchCategory,
  } = useAllCategoryQuery({});

  const [createSubCategory, { isLoading: creatingSub }] =
    useCreateSubCategoryMutation();
  const [createMainCategory, { isLoading: creatingMain }] =
    useCreateMainCategoryMutation();
  const [createCategory, { isLoading: creatingCategory }] =
    useCreateCategoryMutation();

  const mainCategoryOptions = mainCategoryData?.data || [];
  const subCategoryOptions = subCategoryData?.data || [];
  const categoryNames = categoryData?.data?.map((i: any) => i.name) || [];
  const subCategoryNames = subCategoryOptions.map((i: any) => i.name);
  const mainCategoryNames = mainCategoryOptions.map((i: any) => i.name);

  const onSubmitCategory = async (data: CategoryProps) => {
    // return console.log(data);
    try {
      const res = await createCategory(data).unwrap();
      if (res?.success) {
        showToast({
          message: res.message || "Category created successfully!",
          type: "success",
          duration: 3000,
          position: { horizontal: "center", vertical: "top" },
        });
        refetchCategory();
      }
    } catch {
      showToast({
        message: "Failed to create category.",
        type: "error",
        duration: 3000,
        position: { horizontal: "center", vertical: "top" },
      });
    }
  };

  const onSubmitSubCategory = async (data: SubCategoryProps) => {
    try {
      const res = await createSubCategory(data).unwrap();
      if (res?.success) {
        showToast({
          message: res.message || "Sub Category created!",
          type: "success",
          duration: 3000,
          position: { horizontal: "center", vertical: "top" },
        });
        refetchSub();
        setSubCate(false);
      }
    } catch {
      showToast({
        message: "Failed to create sub category.",
        type: "error",
        duration: 3000,
        position: { horizontal: "center", vertical: "top" },
      });
    }
  };

  const onSubmitMainCategory = async (data: MainCategoryProps) => {
    try {
      const res = await createMainCategory(data).unwrap();
      if (res?.success) {
        showToast({
          message: res.message || "Main Category created!",
          type: "success",
          duration: 3000,
          position: { horizontal: "center", vertical: "top" },
        });
        refetchMain();
        setCate(false);
      }
    } catch {
      showToast({
        message: "Failed to create main category.",
        type: "error",
        duration: 3000,
        position: { horizontal: "center", vertical: "top" },
      });
    }
  };

  if (subLoading || mainLoading || categoryLoading) return <Loader />;

  return (
    <Box>
      <Paper elevation={2} sx={{ p: { xs: 2, sm: 3, md: 4 }, borderRadius: 2 }}>
        <FormHeader
          title="Create Product Category"
          subTitle="Provide your proper information"
        />

        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <Box
              sx={{ display: "flex", justifyContent: "space-evenly", pt: 2 }}
            >
              <Button variant="contained" onClick={() => setSubCate(true)}>
                + Add Sub Category
              </Button>
              <Button variant="contained" onClick={() => setCate(true)}>
                + Add Main Category
              </Button>
            </Box>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <SectionHeader
              icon={<BiSolidCategory />}
              title="Create Category"
              subtitle="Link your main and sub categories into one."
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <ReusableForm onSubmit={onSubmitCategory}>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <SelectInputField
                    name="mainCategory"
                    label="Main Category"
                    options={mainCategoryOptions}
                    requiredMessage="Select Main Category"
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <SelectInputField
                    name="subCategory"
                    label="Sub Category"
                    options={subCategoryOptions}
                    requiredMessage="Select Sub Category"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <AutocompleteInput
                    name="name"
                    label="Category Name"
                    options={categoryNames}
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
                    disabled={creatingCategory}
                  >
                    {creatingCategory ? (
                      <CircularProgress size={24} sx={{ color: "white" }} />
                    ) : (
                      "Create"
                    )}
                  </Button>
                </Grid>
              </Grid>
            </ReusableForm>
          </Grid>
        </Grid>
      </Paper>

      {/* Sub Category Modal */}
      <ReusableModal onClose={() => setSubCate(false)} open={isSubCate}>
        <Grid size={{ xs: 12, md: 6 }} sx={{ p: 2 }}>
          <ReusableForm onSubmit={onSubmitSubCategory}>
            <>
              <AutocompleteInput
                name="name"
                label="Sub Category Name"
                options={subCategoryNames}
                required
              />
              <Box mt={3}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{ py: 1.5 }}
                  disabled={creatingSub}
                >
                  {creatingSub ? (
                    <CircularProgress size={24} sx={{ color: "white" }} />
                  ) : (
                    "Create"
                  )}
                </Button>
              </Box>
            </>
          </ReusableForm>
        </Grid>
      </ReusableModal>

      {/* Main Category Modal */}
      <ReusableModal onClose={() => setCate(false)} open={isCate}>
        <Grid size={{ xs: 12, md: 6 }} sx={{ p: 2 }}>
          <ReusableForm onSubmit={onSubmitMainCategory}>
            <>
              <AutocompleteInput
                name="name"
                label="Main Category Name"
                options={mainCategoryNames}
                required
              />
              <Box mt={3}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{ py: 1.5 }}
                  disabled={creatingMain}
                >
                  {creatingMain ? (
                    <CircularProgress size={24} sx={{ color: "white" }} />
                  ) : (
                    "Create"
                  )}
                </Button>
              </Box>
            </>
          </ReusableForm>
        </Grid>
      </ReusableModal>
    </Box>
  );
};

export default CreateCategory;
