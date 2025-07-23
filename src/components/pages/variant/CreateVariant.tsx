import React from "react";
import { Box, Grid, Paper, Button, CircularProgress } from "@mui/material";
import ReusableForm from "../../../shared/ReusableFrom";
import FormHeader from "../../utils/FormHeader";
import Loader from "../../../shared/Loader";
import {
  useAllVariantQuery,
  useCreateVariantMutation,
} from "../../../redux/features/variant/variant-api";
import { useToast } from "../../utils/tost-alert/ToastProvider";
import AutocompleteInput from "../../utils/input-fields/AutocompleteInput";
import type { FieldValues } from "react-hook-form";

const VARIANT_FIELDS = [
  {
    name: "size",
    label: "Size",
    placeholder: "e.g. S, M, L, XL",
  },
  {
    name: "color",
    label: "Color",
    placeholder: "e.g. Red, Blue, Green",
  },
  {
    name: "dressType",
    label: "Dress Type",
    placeholder: "e.g. Casual, Formal, Evening",
  },
  {
    name: "sleeve",
    label: "Sleeve",
    placeholder: "e.g. Long, Short, Sleeveless",
  },
  {
    name: "material",
    label: "Material",
    placeholder: "e.g. Cotton, Silk, Polyester",
  },
  {
    name: "occasion",
    label: "Occasion",
    placeholder: "e.g. Work, Party, Wedding",
  },
];

type Variant = {
  name: string;
  attributes: { value: string }[];
};

const CreateVariant = () => {
  const { showToast } = useToast();
  const { data, isLoading } = useAllVariantQuery({});
  const [createVariant, { isLoading: isCreating }] = useCreateVariantMutation();

  const variants = React.useMemo<Variant[]>(() => {
    return data?.data?.result?.filter((variant: any) => variant?.name) || [];
  }, [data]);

  const variantOptions = React.useMemo(
    () => variants.map(({ name }) => ({ label: name, value: name })),
    [variants]
  );

  const onSubmit = async (formData: FieldValues) => {
    try {
      const variants = VARIANT_FIELDS.filter(
        (field) => formData[field.name]?.length > 0
      ).map((field) => ({
        name: field.name,
        values: formData[field.name].map((value: string) => ({
          value: value.trim(),
        })),
      }));

      if (variants.length === 0) {
        showToast({
          message: "Please add at least one variant value",
          type: "error",
          position: {
            horizontal: "right",
            vertical: "top",
          },
        });
        return;
      }

      const payload = {
        ...variants,
      };

      console.log(payload);

      await createVariant(payload).unwrap();

      showToast({
        message: "Variant created successfully!",
        type: "success",
      });
    } catch (err) {
      console.error("Variant creation error:", err);
      showToast({
        message: "Failed to create variant",
        type: "error",
      });
    }
  };

  if (isLoading) return <Loader />;

  return (
    <Box>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <FormHeader
          title="Create New Variant"
          subTitle="Define product variants like size, color, material etc."
        />

        <ReusableForm onSubmit={onSubmit}>
          <Grid container spacing={3} sx={{ mt: 2 }}>
            {VARIANT_FIELDS.map((field) => (
              <Grid size={{ xs: 12 }} key={field.name}>
                <AutocompleteInput
                  name={field.name}
                  label={field.label}
                  placeholder={field.placeholder}
                  options={variantOptions}
                  chipVariant="outlined"
                  multiple
                  freeSolo
                  fullWidth
                />
              </Grid>
            ))}

            <Grid size={{ xs: 12 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isCreating}
              >
                {isCreating ? (
                  <CircularProgress size={24} sx={{ color: "white" }} />
                ) : (
                  "Create Variant"
                )}
              </Button>
            </Grid>
          </Grid>
        </ReusableForm>
      </Paper>
    </Box>
  );
};

export default CreateVariant;
