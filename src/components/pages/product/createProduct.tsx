import { useState } from "react";
import { Box, Button, Grid, Paper } from "@mui/material";
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

type Attribute = {
  id: string;
  value: string;
  quantity: number;
};

type Variant = {
  id: string;
  name: string;
  attributes: Attribute[];
};

const CreateProduct = () => {
  const { showToast } = useToast();

  // Drawer state for image selector
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Selected image id from global redux state
  const selectedId = useAppSelector((state) => state.selectedId.selectedId);

  // Fetch selected image details for preview
  const { data: image, isLoading: isImageLoading } = useGetImageByIdQuery(
    selectedId || null
  );

  // Fetch main category data for selector dropdown
  const { data: mainCategoryData, isLoading: isMainCatLoading } =
    useAllMainCategoryQuery({});

  // Fetch variant & attributes data for autocomplete options
  const { data: variantData, isLoading: isVariantLoading } = useAllVariantQuery(
    {}
  );

  // Mutation for product creation
  const [createProduct, { isLoading: isCreatingProduct }] =
    useCreateProductMutation();

  // Utility to generate unique IDs
  const generateId = () => crypto.randomUUID?.() || String(Date.now());

  // Local state for variants with IDs
  const [variants, setVariants] = useState<Variant[]>([
    {
      id: generateId(),
      name: "",
      attributes: [{ id: generateId(), value: "", quantity: 0 }],
    },
  ]);

  // Build variant name options for Autocomplete
  const variantNameOptions =
    variantData?.data?.result?.map((v: any) => ({
      label: v.name,
      value: v.name,
    })) ?? [];

  // Build attribute options keyed by variant name
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

  // Submission handler
  const onSubmit = async (data: FieldValues) => {
    try {

      console.log(variants);
      if (!selectedId) {
        showToast({ message: "Product image is required.", type: "warning" });
        return;
      }

      const formattedProduct = {
        productCode: data?.productCode,
        title: data?.title,
        subTitle: data?.subTitle,
        price: String(data?.price ?? ""),
        discount: String(data?.discount ?? ""),
        parentageForSeller: String(data?.parentageForSeller ?? ""),
        status: data?.status,
        activity: data?.activity,
        description: data?.description,
        optionalLinks: data?.optionalLinks,
        productImage: selectedId,
        categories: {
          mainCategory: data?.mainCategory,
          category: data?.category,
          subCategory: data?.subCategory,
        },
        variants: variants.map((v) => ({
          id: v.id,
          name: v.name || "",
          attributes: v.attributes.map((attr) => ({
            id: attr.id,
            value: attr.value || "",
            quantity: String(attr.quantity ?? "0"),
          })),
        })),
      };

      console.log(formattedProduct);

      await createProduct(formattedProduct).unwrap();

      showToast({ message: "Product created successfully!", type: "success" });

      // Reset variants state with IDs
      setVariants([
        {
          id: generateId(),
          name: "",
          attributes: [{ id: generateId(), value: "", quantity: 0 }],
        },
      ]);

      // You can also reset the form fields here with react-hook-form reset if needed
    } catch (error) {
      console.error("Error creating product:", error);
      showToast({ message: "Failed to create product.", type: "error" });
    }
  };

  // Show loader while fetching categories or variants
  if (isMainCatLoading || isVariantLoading ) return <Loader />;

  return (
    <Box>
      <Paper className="rounded-lg p-4 overflow-hidden">
        <FormHeader
          title="Create New Product"
          subTitle="Complete all required fields to create a new product listing"
        />

        <ReusableForm onSubmit={onSubmit}>
          <Box>
            {/* Image Upload */}
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

            {/* Basic Info */}
            <SectionHeader
              icon={<InfoOutlinedIcon />}
              title="Basic Information"
              subtitle="Primary product details"
            />
            <Grid container spacing={3}>
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

            {/* Pricing */}
            <SectionHeader
              icon={<AttachMoneyIcon />}
              title="Pricing & Inventory"
              subtitle="Manage product stock and pricing"
            />
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextInput
                  name="price"
                  label="Base Price"
                  type="number"
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextInput
                  name="discount"
                  label="Discount"
                  type="number"
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextInput
                  name="parentageForSeller"
                  label="Seller Percentage"
                  type="number"
                  required
                />
              </Grid>
            </Grid>

            {/* Categories */}
            <SectionHeader
              icon={<CategoryIcon />}
              title="Category Information"
              subtitle="Specify product categories"
            />
            <CategorySelector mainCategoryData={mainCategoryData} />

            {/* Status */}
            <SectionHeader
              icon={<InventoryIcon />}
              title="Status & Activity"
              subtitle="Set product visibility and availability"
            />
            <Grid container spacing={3}>
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

            {/* Description */}
            <SectionHeader
              icon={<DescriptionIcon />}
              title="Product Description"
              subtitle="Provide product details"
            />
            <Grid container spacing={3}>
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

            {/* Variants */}
            <SectionHeader
              icon={<StyleIcon />}
              title="Product Variants"
              subtitle="Add different versions of your product"
            />
            <VariantsSection
              variants={variants}
              setVariants={setVariants}
              variantNameOptions={variantNameOptions}
              attributeOptions={attributeOptions}
            />

            {/* Submit Button */}
            <Box className="flex mt-4">
              <Button
                type="submit"
                variant="contained"
                color="success"
                size="large"
                startIcon={<SaveIcon />}
                disabled={isCreatingProduct}
              >
                {isCreatingProduct ? "Creating..." : "Create Product"}
              </Button>
            </Box>
          </Box>
        </ReusableForm>
      </Paper>
    </Box>
  );
};

export default CreateProduct;
