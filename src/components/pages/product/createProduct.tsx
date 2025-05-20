import {
  Box,
  Button,
  Grid,
  Typography,
  IconButton,
  Paper,
  Card,
  CardContent,
  Stack,
  Chip,
} from "@mui/material";
import ReusableForm from "../../../shared/ReusableFrom";
import TextInput from "../../../utils/input-fields/TextInput";
import SelectInputField from "../../../utils/input-fields/SelectInputField";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CategoryIcon from "@mui/icons-material/Category";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import InventoryIcon from "@mui/icons-material/Inventory";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import StyleIcon from "@mui/icons-material/Style";
import DescriptionIcon from "@mui/icons-material/Description";
import SaveIcon from "@mui/icons-material/Save";
import SectionHeader from "../../../utils/section/SectionHeader";

type Attribute = {
  value: string;
  quantity: number;
};

type Variant = {
  name: string;
  attributes: Attribute[];
};

type CreateProductProps = {
  productCode: string;
  title: string;
  subTitle: string;
  totalQuantity: number;
  price: number;
  discount: number;
  parentageForSeller: number;
  variants: Variant[];
  mainCategory: string;
  category: string;
  subCategory: string;
  description: string;
  status: string;
  activity: string;
};

const CreateProduct = () => {
  const [variants, setVariants] = useState<Variant[]>([
    { name: "", attributes: [{ value: "", quantity: 0 }] },
  ]);

  const addVariant = () => {
    setVariants([
      ...variants,
      { name: "", attributes: [{ value: "", quantity: 0 }] },
    ]);
  };

  const removeVariant = (variantIndex: number) => {
    const newVariants = variants.filter((_, index) => index !== variantIndex);
    setVariants(
      newVariants.length
        ? newVariants
        : [{ name: "", attributes: [{ value: "", quantity: 0 }] }]
    );
  };

  const addAttribute = (variantIndex: number) => {
    const newVariants = [...variants];
    newVariants[variantIndex].attributes.push({ value: "", quantity: 0 });
    setVariants(newVariants);
  };

  const removeAttribute = (variantIndex: number, attributeIndex: number) => {
    const newVariants = [...variants];
    if (newVariants[variantIndex].attributes.length > 1) {
      newVariants[variantIndex].attributes = newVariants[
        variantIndex
      ].attributes.filter((_, index) => index !== attributeIndex);
      setVariants(newVariants);
    }
  };

  const onSubmit = (data: CreateProductProps) => {
    console.log("Hello");
    const formData =  {
      ...data,
      variants: variants,
    };
    console.log("Form Data:", formData);
  };

  return (
    <Box className="bg-gray-50 min-h-screen py-8 px-4">
      <Paper
        elevation={0}
        className="max-w-7xl mx-auto rounded-lg overflow-hidden"
      >
        <Box className="bg-green-700 p-6">
          <Typography variant="h4" fontWeight="bold" color="white">
            Create New Product
          </Typography>
          <Typography variant="body1" color="white" sx={{ opacity: 0.8 }}>
            Complete all required fields to create a new product listing
          </Typography>
        </Box>

        <ReusableForm onSubmit={onSubmit}>
          <Box className="p-6 md:p-8">
            {/* Basic Information Section */}
            <SectionHeader
              icon={<InfoOutlinedIcon />}
              title="Basic Information"
              subtitle="Primary product details"
            />

            <Grid container spacing={3} className="mb-8">
              <Grid size={{ xs: 12, md: 4 }}>
                <TextInput
                  name="productCode"
                  label="Product Code"
                  required
                  placeholder="Enter unique product code"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextInput
                  name="title"
                  label="Product Title"
                  required
                  placeholder="Enter descriptive product title"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextInput
                  name="subTitle"
                  label="Product Subtitle"
                  required
                  placeholder="Enter additional product information"
                />
              </Grid>
            </Grid>

            {/* Pricing & Inventory Section */}
            <SectionHeader
              icon={<AttachMoneyIcon />}
              title="Pricing & Inventory"
              subtitle="Manage product stock and pricing"
            />

            <Grid container spacing={3} className="mb-8">
              <Grid size={{ xs: 12, md: 3 }}>
                <TextInput
                  name="price"
                  label="Base Price"
                  type="number"
                  required
                  placeholder="0.00"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <TextInput
                  name="discount"
                  label="Discount"
                  type="number"
                  required
                  placeholder="0"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <TextInput
                  name="totalQuantity"
                  label="Total Quantity"
                  type="number"
                  required
                  placeholder="0"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <TextInput
                  name="parentageForSeller"
                  label="Seller Percentage"
                  type="number"
                  required
                  placeholder="0"
                />
              </Grid>
            </Grid>

            {/* Category Section */}
            <SectionHeader
              icon={<CategoryIcon />}
              title="Category Information"
              subtitle="Specify product categories for better organization"
            />

            <Grid container spacing={3} className="mb-8">
              <Grid size={{ xs: 12, md: 4 }}>
                <TextInput
                  name="mainCategory"
                  label="Main Category"
                  required
                  placeholder="e.g. Electronics"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextInput
                  name="category"
                  label="Category"
                  required
                  placeholder="e.g. Smartphones"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextInput
                  name="subCategory"
                  label="Sub Category"
                  required
                  placeholder="e.g. Android Phones"
                />
              </Grid>
            </Grid>

            {/* Status & Activity Section */}
            <SectionHeader
              icon={<InventoryIcon />}
              title="Status & Activity"
              subtitle="Set product visibility and availability"
            />

            <Grid container spacing={3} className="mb-8">
              <Grid size={{ xs: 12, md: 6 }}>
                <SelectInputField
                  name="status"
                  label="Inventory Status"
                  options={["in-stock", "out-stock", "low-stock", "pre-order"]}
                  requiredMessage="Status is required"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <SelectInputField
                  name="activity"
                  label="Market Activity"
                  options={[
                    "market-launch",
                    "not-now",
                    "coming-soon",
                    "discontinued",
                  ]}
                  requiredMessage="Activity is required"
                />
              </Grid>
            </Grid>

            {/* Description Section */}
            <SectionHeader
              icon={<DescriptionIcon />}
              title="Product Description"
              subtitle="Provide detailed information about your product"
            />

            <Grid container spacing={3} className="mb-8">
              <Grid size={{ xs: 12, md: 12 }}>
                <TextInput
                  name="description"
                  label="Full Description"
                  multiline={true}
                  row={6}
                  required
                  placeholder="Enter comprehensive product details, features, and specifications..."
                />
              </Grid>
            </Grid>

            {/* Variants Section */}
            <SectionHeader
              icon={<StyleIcon />}
              title="Product Variants"
              subtitle="Add different versions of your product"
            />

            <Box className="mb-8">
              {variants.map((variant, variantIndex) => (
                <Card
                  key={`variant-${variantIndex}`}
                  variant="outlined"
                  className="mb-4"
                  sx={{ borderColor: "rgba(0, 0, 0, 0.1)" }}
                >
                  <CardContent>
                    <Box className="flex justify-between items-center mb-4">
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Chip
                          label={`Variant ${variantIndex + 1}`}
                          color="primary"
                          size="small"
                          variant="outlined"
                        />
                      </Stack>
                      <Box>
                        <IconButton
                          color="error"
                          onClick={() => removeVariant(variantIndex)}
                          disabled={variants.length === 1}
                          size="small"
                        >
                          <DeleteIcon />
                        </IconButton>
                        <Button
                          startIcon={<AddIcon />}
                          onClick={addVariant}
                          variant="outlined"
                          color="primary"
                          className="mt-4"
                        >
                          Add Variant
                        </Button>
                      </Box>
                    </Box>

                    <Grid container spacing={3}>
                      <Grid size={{ xs: 12, md: 4 }}>
                        <TextInput
                          name={`variant-${variantIndex}-name`}
                          label="Variant Type"
                          placeholder="e.g. Color, Size, Material, etc."
                          required
                        />
                      </Grid>

                      <Grid size={{ xs: 12, md: 8 }}>
                        {variant.attributes.map((attribute, attributeIndex) => (
                          <Grid
                            container
                            spacing={2}
                            key={`attribute-${variantIndex}-${attributeIndex}`}
                            className="flex items-center gap-3 mb-3"
                          >
                            <Grid size={{ xs: 12, md: 6 }}>
                              <TextInput
                                name={`variant-${variantIndex}-attribute-${attributeIndex}-value`}
                                label="Option Value"
                                placeholder="e.g. Red, Small, Cotton, etc."
                                required
                              />
                            </Grid>
                            <Grid size={{ xs: 12, md: 5 }}>
                              <TextInput
                                name={`variant-${variantIndex}-attribute-${attributeIndex}-quantity`}
                                type="number"
                                label="Stock"
                                required
                                placeholder="0"
                              />
                            </Grid>
                            <Grid
                              size={{ xs: 12, md: 1 }}
                              className="flex items-center"
                            >
                              {attributeIndex > 0 && (
                                <IconButton
                                  color="error"
                                  onClick={() =>
                                    removeAttribute(
                                      variantIndex,
                                      attributeIndex
                                    )
                                  }
                                  size="small"
                                >
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              )}
                            </Grid>
                          </Grid>
                        ))}

                        <Box className="mt-2">
                          <Button
                            startIcon={<AddIcon />}
                            onClick={() => addAttribute(variantIndex)}
                            variant="outlined"
                            color="primary"
                            size="small"
                          >
                            Add Option
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              ))}
            </Box>

            <Box className="flex">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                startIcon={<SaveIcon />}
              >
                Create Product
              </Button>
            </Box>
          </Box>
        </ReusableForm>
      </Paper>
    </Box>
  );
};

export default CreateProduct;
