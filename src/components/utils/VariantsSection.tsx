import React, { useEffect, useCallback } from "react";
import { Add, Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useFormContext, useWatch } from "react-hook-form";
import TextInput from "./input-fields/TextInput";
import AutocompleteInput from "./input-fields/AutocompleteInput";

// Type definitions
interface Attribute {
  id: string;
  value: string;
  quantity: number;
}

interface Variant {
  id: string;
  name: string;
  attributes: Attribute[];
}

interface Option {
  label: string;
  value: string;
}

interface VariantsSectionProps {
  variants: Variant[];
  setVariants: React.Dispatch<React.SetStateAction<Variant[]>>;
  variantNameOptions?: Option[];
  attributeOptions?: Record<string, Option[]>;
  maxVariants?: number;
  maxAttributesPerVariant?: number;
}

const VariantsSection: React.FC<VariantsSectionProps> = ({
  variants,
  setVariants,
  variantNameOptions = [],
  attributeOptions = {},
  maxVariants = 10,
  maxAttributesPerVariant = 20,
}) => {
  const { setValue, control } = useFormContext();

  // Watch variant names for dynamic attribute options
  const variantNames: string[] =
    useWatch({
      control,
      name: "variants",
    })?.map((v: any) => v?.name || "") || [];

  // Sync variants state with form
  useEffect(() => {
    setValue("variantsData", JSON.stringify(variants));
  }, [variants, setValue]);

  // Generate unique ID
  const generateId = useCallback((): string => {
    return (
      crypto.randomUUID?.() ||
      `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    );
  }, []);

  // Create empty variant
  const createEmptyVariant = useCallback(
    (): Variant => ({
      id: generateId(),
      name: "",
      attributes: [{ id: generateId(), value: "", quantity: 0 }],
    }),
    [generateId]
  );

  // Create empty attribute
  const createEmptyAttribute = useCallback(
    (): Attribute => ({
      id: generateId(),
      value: "",
      quantity: 0,
    }),
    [generateId]
  );

  // Add new variant
  const addVariant = useCallback(() => {
    if (variants.length >= maxVariants) return;

    setVariants((prev) => [...prev, createEmptyVariant()]);
  }, [variants.length, maxVariants, setVariants, createEmptyVariant]);

  // Remove variant
  const removeVariant = useCallback(
    (variantId: string) => {
      setVariants((prev) => {
        const filtered = prev.filter((v) => v.id !== variantId);
        return filtered.length > 0 ? filtered : [createEmptyVariant()];
      });
    },
    [setVariants, createEmptyVariant]
  );

  // Add attribute to variant
  const addAttribute = useCallback(
    (variantId: string) => {
      setVariants((prev) =>
        prev.map((variant) => {
          if (variant.id !== variantId) return variant;
          if (variant.attributes.length >= maxAttributesPerVariant)
            return variant;

          return {
            ...variant,
            attributes: [...variant.attributes, createEmptyAttribute()],
          };
        })
      );
    },
    [setVariants, maxAttributesPerVariant, createEmptyAttribute]
  );

  // Remove attribute from variant
  const removeAttribute = useCallback(
    (variantId: string, attributeId: string) => {
      setVariants((prev) =>
        prev.map((variant) => {
          if (variant.id !== variantId || variant.attributes.length <= 1) {
            return variant;
          }

          return {
            ...variant,
            attributes: variant.attributes.filter(
              (attr) => attr.id !== attributeId
            ),
          };
        })
      );
    },
    [setVariants]
  );

  // Get attribute options for specific variant
  const getAttributeOptions = useCallback(
    (variantIndex: number): Option[] => {
      const variantKey = variantNames[variantIndex]?.toLowerCase?.() || "";
      return Array.isArray(attributeOptions[variantKey])
        ? attributeOptions[variantKey]
        : [];
    },
    [variantNames, attributeOptions]
  );

  return (
    <Box sx={{ mb: 4 }}>
      {variants.map((variant, variantIndex) => {
        const dynamicAttributeOptions = getAttributeOptions(variantIndex);
        const canRemoveVariant = variants.length > 1;
        const canAddVariant = variants.length < maxVariants;
        const canAddAttribute =
          variant.attributes.length < maxAttributesPerVariant;
        const canRemoveAttribute = variant.attributes.length > 1;

        return (
          <Card
            key={variant.id}
            variant="outlined"
            sx={{
              mb: 3,
              borderColor: "divider",
              "&:hover": {
                borderColor: "primary.main",
              },
            }}
          >
            <CardContent>
              {/* Variant Header */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  <Chip
                    label={`Variant ${variantIndex + 1}`}
                    color="primary"
                    size="small"
                    variant="outlined"
                  />
                  {variant.name && (
                    <Typography variant="body2" color="text.secondary">
                      {variant.name}
                    </Typography>
                  )}
                </Stack>

                <Stack direction="row" spacing={1}>
                  {canRemoveVariant && (
                    <IconButton
                      color="error"
                      onClick={() => removeVariant(variant.id)}
                      size="small"
                      aria-label={`Remove variant ${variantIndex + 1}`}
                    >
                      <Delete />
                    </IconButton>
                  )}
                  {canAddVariant && (
                    <Button
                      startIcon={<Add />}
                      onClick={addVariant}
                      variant="outlined"
                      size="small"
                      color="primary"
                    >
                      Add Variant
                    </Button>
                  )}
                </Stack>
              </Box>

              <Grid container spacing={3}>
                {/* Variant Type */}
                <Grid
                  size={{
                    sm: 12,
                    md: 4,
                  }}
                >
                  <AutocompleteInput
                    name={`variants.${variantIndex}.name`}
                    label="Variant Type"
                    placeholder="e.g., Color, Size, Material"
                    required
                    options={variantNameOptions}
                  />
                </Grid>

                {/* Attributes */}
                <Grid
                  size={{
                    sm: 12,
                    md: 8,
                  }}
                >
                  <Box>
                    {variant.attributes.map((attribute, attributeIndex) => (
                      <Grid
                        container
                        spacing={2}
                        key={attribute.id}
                        alignItems="center"
                        sx={{ mb: 2 }}
                      >
                        <Grid
                          size={{
                            sm: 12,
                            md: 5,
                          }}
                        >
                          <AutocompleteInput
                            name={`variants.${variantIndex}.attributes.${attributeIndex}.value`}
                            label="Option Value"
                            placeholder="e.g., Red, Small, Cotton"
                            required
                            options={dynamicAttributeOptions}
                          />
                        </Grid>

                        <Grid
                          size={{
                            sm: 12,
                            md: 5,
                          }}
                        >
                          <TextInput
                            name={`variants.${variantIndex}.attributes.${attributeIndex}.quantity`}
                            label="Stock Quantity"
                            type="number"
                            placeholder="0"
                            required
                          />
                        </Grid>

                        <Grid
                          size={{
                            sm: 2,
                          }}
                        >
                          {canRemoveAttribute && (
                            <IconButton
                              color="error"
                              onClick={() =>
                                removeAttribute(variant.id, attribute.id)
                              }
                              size="small"
                              aria-label={`Remove option ${attributeIndex + 1}`}
                            >
                              <Delete fontSize="small" />
                            </IconButton>
                          )}
                        </Grid>
                      </Grid>
                    ))}

                    {canAddAttribute && (
                      <Button
                        startIcon={<Add />}
                        onClick={() => addAttribute(variant.id)}
                        variant="outlined"
                        size="small"
                        color="primary"
                      >
                        Add Option
                      </Button>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
};

export default VariantsSection;
