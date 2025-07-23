"use client";
import { useState } from "react";
import { Box, Button, CircularProgress, Grid, Paper } from "@mui/material";
import {
  Category as CategoryIcon,
  InfoOutlined as InfoOutlinedIcon,
  Inventory as InventoryIcon,
  AttachMoney as AttachMoneyIcon,
  Style as StyleIcon,
  Description as DescriptionIcon,
  Save as SaveIcon,
} from "@mui/icons-material";
import { FaProductHunt } from "react-icons/fa6";
import TextInput from "../../utils/input-fields/TextInput";
import SelectInputField from "../../utils/input-fields/SelectInputField";
import SectionHeader from "../../utils/section/SectionHeader";
import FormHeader from "../../utils/FormHeader";
import ReusableForm from "../../../shared/ReusableFrom";
import VariantsSection from "../../utils/VariantsSection";
import Loader from "../../../shared/Loader";
import ReusableDrawer from "../../../shared/ReusableDrawer";
import Images from "../../gallery/Images";
import { CategorySelector } from "./components/CategorySelector";
import { useGetImageByIdQuery } from "../../../redux/features/gallery/image-api";
import { useAllMainCategoryQuery } from "../../../redux/features/category/category-api";
import { useAllVariantQuery } from "../../../redux/features/variant/variant-api";
import { useCreateProductMutation } from "../../../redux/features/products/product-api";
import { useAppSelector } from "../../../redux/hooks";
import { useToast } from "../../utils/tost-alert/ToastProvider";
import type { FieldValues } from "react-hook-form";

const CreateProduct = () => {
  const { showToast } = useToast();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const selectedId = useAppSelector((state) => state?.selectedId?.selectedId);

  const { data: image, isLoading: isImageLoading } = useGetImageByIdQuery(
    selectedId || null
  );
  const { data: mainCategoryData, isLoading: isMainCatLoading } =
    useAllMainCategoryQuery({});
  const { data: variantData, isLoading: isVariantLoading } = useAllVariantQuery(
    {}
  );
  const [createProduct, { isLoading: isCreatingProduct }] =
    useCreateProductMutation();

  const variantNameOptions =
    variantData?.data?.result?.map((v: any) => ({
      label: v.name,
      value: v.name,
    })) ?? [];

  const attributeOptions =
    variantData?.data?.result?.reduce(
      (acc: Record<string, any[]>, variant: any) => {
        acc[variant.name] = variant.attributes.map((attr: any) => ({
          label: attr.value,
          value: attr.value,
        }));
        return acc;
      },
      {}
    ) ?? {};

  const onSubmit = async (data: FieldValues) => {
    try {
      const formattedProduct = {
        productCode: data.productCode,
        title: data.title,
        subTitle: data.subTitle,
        price: String(data.price ?? ""),
        discount: String(data.discount ?? ""),
        totalQuantity: String(data.totalQuantity ?? ""),
        parentageForSeller: String(data.parentageForSeller ?? ""),
        status: data.status,
        activity: data.activity,
        description: data.description,
        optionalLinks: data.optionalLinks,
        productImage: selectedId,
        categories: {
          mainCategory: data.mainCategory,
          category: data.category,
          subCategory: data.subCategory,
        },
        variants: data.variants,
      };

      console.log("Submitting:", formattedProduct);
      await createProduct(formattedProduct).unwrap();
      showToast({ message: "Product created successfully!", type: "success" });
    } catch {
      showToast({ message: "something went wrong", type: "error" });
    }
  };

  if (isMainCatLoading || isVariantLoading) return <Loader />;

  return (
    <Box>
      <Paper className="rounded-lg p-4 overflow-hidden">
        <FormHeader
          title="Create New Product"
          subTitle="Complete all required fields to create a new product listing"
        />

        <ReusableForm onSubmit={onSubmit}>
          <Box>
            {/* Product Image Section */}
            <SectionHeader
              icon={<FaProductHunt />}
              title="Product Image"
              subtitle="Upload or select a product image"
            />

            <Box className="flex items-center gap-4 flex-wrap mb-6">
              <Box
                sx={{
                  width: 120,
                  height: 120,
                  borderRadius: "8px",
                  overflow: "hidden",
                  border: "1px solid #ddd",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#fafafa",
                }}
              >
                {isImageLoading ? (
                  <Loader />
                ) : selectedId && image?.data?.photo?.url ? (
                  <img
                    src={image.data.photo.url}
                    alt={image?.data?.photoName || "Selected Image"}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      textAlign: "center",
                      color: "#888",
                      fontSize: "0.875rem",
                    }}
                  >
                    No Image
                  </Box>
                )}
              </Box>

              <Box>
                {image?.data?.photoName && (
                  <Box fontWeight={500}>{image.data.photoName}</Box>
                )}
                <Button
                  variant="outlined"
                  onClick={() => setDrawerOpen(true)}
                  sx={{ mt: 1 }}
                >
                  {selectedId ? "Change Image" : "Add Image"}
                </Button>
              </Box>
            </Box>

            {/* Basic Information */}
            <SectionHeader
              icon={<InfoOutlinedIcon />}
              title="Basic Information"
              subtitle="Primary product details"
            />
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextInput name="productCode" label="Product Code" required />
              </Grid>
              <Grid size={{ xs: 12, md: 8 }}>
                <TextInput name="title" label="Product Title" required />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextInput name="subTitle" label="Product Subtitle" required />
              </Grid>
            </Grid>

            {/* Pricing & Inventory */}
            <SectionHeader
              icon={<AttachMoneyIcon />}
              title="Pricing & Inventory"
              subtitle="Manage product stock and pricing"
            />
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid size={{ xs: 12, md: 3 }}>
                <TextInput
                  name="price"
                  label="Base Price"
                  type="number"
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <TextInput
                  name="discount"
                  label="Discount"
                  type="number"
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <TextInput
                  name="totalQuantity"
                  label="Total quantity"
                  type="number"
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <TextInput
                  name="parentageForSeller"
                  label="Seller Percentage"
                  type="number"
                  required
                />
              </Grid>
            </Grid>

            {/* Category Information */}
            <SectionHeader
              icon={<CategoryIcon />}
              title="Category Information"
              subtitle="Specify product categories"
            />
            <Box sx={{ mb: 4 }}>
              <CategorySelector mainCategoryData={mainCategoryData} />
            </Box>

            {/* Status & Activity */}
            <SectionHeader
              icon={<InventoryIcon />}
              title="Status & Activity"
              subtitle="Set product visibility and availability"
            />
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid size={{ xs: 12, md: 6 }}>
                <SelectInputField
                  name="status"
                  label="Inventory Status"
                  options={["in-stock", "out-of-stock", "upcoming"]}
                  requiredMessage="Status is required"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <SelectInputField
                  name="activity"
                  label="Market Activity"
                  options={["in-stock", "market-launch"]}
                  requiredMessage="Activity is required"
                />
              </Grid>
            </Grid>

            {/* Product Description */}
            <SectionHeader
              icon={<DescriptionIcon />}
              title="Product Description"
              subtitle="Provide product details"
            />
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid size={{ xs: 12 }}>
                <TextInput name="optionalLinks" label="Optional Link" />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextInput
                  name="description"
                  label="Full Description"
                  multiline
                  row={6}
                  required
                />
              </Grid>
            </Grid>

            {/* Product Variants */}
            <SectionHeader
              icon={<StyleIcon />}
              title="Product Variants"
              subtitle="Add different versions of your product"
            />
            <VariantsSection
              variantNameOptions={variantNameOptions}
              attributeOptions={attributeOptions}
            />

            {/* Submit Button */}
            <Box sx={{ display: "flex", justifyContent: "flex-start", mt: 4 }}>
              <Button
                type="submit"
                variant="contained"
                color="success"
                size="large"
                startIcon={<SaveIcon />}
                disabled={isCreatingProduct}
                sx={{ minWidth: 180 }}
              >
                {isCreatingProduct ? (
                  <CircularProgress size={24} sx={{ color: "white" }} />
                ) : (
                  "Create Product"
                )}
              </Button>
            </Box>
          </Box>
        </ReusableForm>
      </Paper>

      {/* Image Selection Drawer */}
      <ReusableDrawer
        width="50%"
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          return true;
        }}
      >
        <Images />
      </ReusableDrawer>
    </Box>
  );
};

export default CreateProduct;
