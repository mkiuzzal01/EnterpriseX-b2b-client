/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Grid,
  IconButton,
  Paper,
  Button,
  CircularProgress,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { useMemo, useState } from "react";
import { nanoid } from "nanoid";
import ReusableForm from "../../../shared/ReusableFrom";
import FormHeader from "../../utils/FormHeader";
import Loader from "../../../shared/Loader";
import InputWithSuggestion from "../../utils/input-fields/InputWithSuggestion";
import {
  useAllVariantQuery,
  useCreateVariantMutation,
} from "../../../redux/features/variant/variant-api";
import { useToast } from "../../utils/tost-alert/ToastProvider";

type AttributeValue = {
  id: string;
  value: string;
};

type Option = {
  label: string;
  value: string;
};

const CreateVariant = () => {
  const [attributes, setAttributes] = useState<AttributeValue[]>([
    { id: nanoid(), value: "" },
  ]);
  const { showToast } = useToast();
  const { data, isLoading, refetch } = useAllVariantQuery({});
  const [createVariant, { isLoading: isCreating }] = useCreateVariantMutation();

  const variants = useMemo(() => {
    return data?.data?.filter((variant: any) => variant?.name) || [];
  }, [data]);

  const variantNameOptions = useMemo(
    () => variants.map(({ name }: any) => ({ label: name, value: name })),
    [variants]
  );

  const attributeValueOptions: Option[] = useMemo(() => {
    const values = variants.flatMap((variant: any) =>
      variant.attributes?.map((attr: any) => attr.value)
    );
    const unique = [...new Set(values)];
    return unique
      .filter((val): val is string => typeof val === "string")
      .map((val) => ({ label: val, value: val }));
  }, [variants]);

  const handleAddAttribute = () => {
    setAttributes((prev) => [...prev, { id: nanoid(), value: "" }]);
  };

  const handleRemoveAttribute = (id: string) => {
    setAttributes((prev) => prev.filter((attr) => attr.id !== id));
  };

  //handle variant submit:
  const onSubmit = async (formData: Record<string, any>) => {
    try {
      const attributeValues: { value: string }[] = attributes.map((attr) => {
        const input = formData[`attr_${attr.id}`];
        return {
          value:
            typeof input === "object" && input?.value ? input.value : input,
        };
      });

      const nameInput = formData.name;
      const name =
        typeof nameInput === "object" && nameInput?.value
          ? nameInput.value
          : nameInput;

      const payload = {
        name,
        attributes: attributeValues,
      };
      const res = await createVariant(payload).unwrap();
      if (res?.success) {
        showToast({
          message: "Variant created successfully!",
          type: "success",
        });
        refetch();
      }
    } catch (err) {
      console.error(err);
      showToast({
        message: "Something went wrong",
        type: "error",
        position: {
          horizontal: "right",
          vertical: "top",
        },
      });
    }
  };

  //handle loading:
  if (isLoading) return <Loader />;

  return (
    <Box>
      <Paper elevation={2} sx={{ p: 4 }}>
        <FormHeader
          title="Create a New Variant"
          subTitle="Define the type of variant such as color, size, material, etc."
        />

        <ReusableForm onSubmit={onSubmit}>
          <Grid container spacing={3}>
            {/* Variant Name */}
            <Grid size={{ xs: 12 }} mt={4}>
              <InputWithSuggestion
                name="name"
                label="Variant Name"
                placeholder="e.g. Color, Size"
                options={variantNameOptions}
                required
              />
            </Grid>

            {/* Attribute Fields */}
            <Grid size={{ xs: 12 }}>
              {attributes.map((attr) => (
                <Grid
                  key={attr.id}
                  container
                  spacing={2}
                  alignItems="center"
                  sx={{ mb: 1 }}
                >
                  <Grid size={{ xs: 10 }}>
                    <InputWithSuggestion
                      name={`attr_${attr.id}`}
                      label="Value"
                      options={attributeValueOptions}
                      placeholder="e.g. Red, Large, Cotton"
                      required
                    />
                  </Grid>
                  <Grid size={{ xs: 2 }}>
                    {attributes.length > 1 && (
                      <IconButton
                        color="error"
                        onClick={() => handleRemoveAttribute(attr.id)}
                      >
                        <Delete />
                      </IconButton>
                    )}
                  </Grid>
                </Grid>
              ))}

              <Button
                onClick={handleAddAttribute}
                variant="outlined"
                startIcon={<Add />}
                sx={{ mt: 2 }}
              >
                Add More Values
              </Button>
            </Grid>

            {/* Submit Button */}
            <Grid size={{ xs: 12 }}>
              <Button type="submit" variant="contained">
                {isCreating ? (
                  <CircularProgress size={24} sx={{ color: "white" }} />
                ) : (
                  "Submit Variant"
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
