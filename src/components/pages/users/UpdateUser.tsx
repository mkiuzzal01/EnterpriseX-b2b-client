import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSingleUserBySlugQuery } from "../../../redux/features/user/user-api";
import {
  useCreateSellerMutation,
  useGetSellerByIdQuery,
  useUpdateSellerMutation,
} from "../../../redux/features/seller/seller-api";
import {
  useCreateStakeHolderMutation,
  useGetStakeHolderByIdQuery,
  useUpdateStackHolderMutation,
} from "../../../redux/features/stake-holder/stakeHolder-api";
import { Box, Button, CircularProgress, Grid, Paper } from "@mui/material";
import ReusableForm from "../../../shared/ReusableFrom";
import FormHeader from "../../utils/FormHeader";
import SectionHeader from "../../utils/section/SectionHeader";
import { FaUser } from "react-icons/fa6";
import Loader from "../../../shared/Loader";
import ReusableDrawer from "../../../shared/ReusableDrawer";
import Images from "../../gallery/Images";
import SelectInputField from "../../utils/input-fields/SelectInputField";
import TextInput from "../../utils/input-fields/TextInput";
import DateInput from "../../utils/input-fields/DateInput";
import { MdAccountBalance, MdSecurity } from "react-icons/md";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { GrAction } from "react-icons/gr";
import { useGetImageByIdQuery } from "../../../redux/features/gallery/image-api";
import { useToast } from "../../utils/tost-alert/ToastProvider";
import { useAppSelector } from "../../../redux/hooks";
import type { FieldValue } from "react-hook-form";
import RadioInput from "../../utils/input-fields/RadioInput";

export default function UpdateUsers() {
  const [sellerId, setSellerId] = useState<string>("");
  const [stakeHolderId, setStakeHolderId] = useState<string>("");
  const { slug } = useParams();
  const { data: singleUser, isLoading: userLoading } = useSingleUserBySlugQuery(
    slug ?? ""
  );
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [addSeller, { isLoading: isCreatingSeller }] =
    useCreateSellerMutation();
  const [updateSeller, { isLoading: isUpdatingSeller }] =
    useUpdateSellerMutation();
  const [addStakeHolder, { isLoading: isCreatingStakeHolder }] =
    useCreateStakeHolderMutation();
  const [updateStakeHolder, { isLoading: isUpdatingStakeHolder }] =
    useUpdateStackHolderMutation();

  const selectedId = useAppSelector((state) => state.selectedId.selectedId);
  const { data: image, isLoading: isImageLoading } = useGetImageByIdQuery(
    selectedId || null
  );

  useEffect(() => {
    if (singleUser?.data?.role === "seller") {
      setSellerId(singleUser?.data?._id);
      setStakeHolderId("");
    } else if (singleUser?.data?.role === "admin") {
      setStakeHolderId(singleUser?.data?._id);
      setSellerId("");
    }
  }, [singleUser]);

  const { data: singleSeller, isLoading: sellerLoading } =
    useGetSellerByIdQuery(sellerId, {
      skip: !sellerId,
    });
  const { data: singleStakeHolder, isLoading: stakeHolderLoading } =
    useGetStakeHolderByIdQuery(stakeHolderId, {
      skip: !stakeHolderId,
    });

  const currentData = singleSeller?.data || singleStakeHolder?.data;
  const currentRole = currentData?.userId?.role || singleUser?.data?.role || "";

  console.log(currentData);

  const [role, setRole] = useState<string>(currentRole);
  const [isSellerRole, setIsSellerRole] = useState<boolean>(false);
  const { showToast } = useToast();

  useEffect(() => {
    setIsSellerRole(role === "seller");
  }, [role]);

  useEffect(() => {
    if (currentRole) {
      setRole(currentRole);
    }
  }, [currentRole]);

  const getDefaultValues = () => {
    if (!currentData) return {};

    const baseValues = {
      name: {
        firstName: currentData.name?.firstName || "",
        middleName: currentData.name?.middleName || "",
        lastName: currentData.name?.lastName || "",
      },
      email: currentData.email || "",
      phone: currentData.phone || "",
      nid: currentData.nid || "",
      dateOfBirth: currentData.dateOfBirth
        ? new Date(currentData.dateOfBirth).toISOString().split("T")[0]
        : "",
      dateOfJoining: currentData.dateOfJoining
        ? new Date(currentData.dateOfJoining).toISOString().split("T")[0]
        : "",
      gender: currentData.gender || "",
      address: {
        presentAddress: currentData.address?.presentAddress || "",
        permanentAddress: currentData.address?.permanentAddress || "",
      },
      profileStatus: currentData.userId?.status || "active",
      isDeleted: Boolean(currentData?.isDeleted),
      role: role,
    };

    // Add bank info if seller
    if (role === "seller" && currentData.bankAccountInfo) {
      return {
        ...baseValues,
        bankAccountInfo: {
          paymentMethod: currentData.bankAccountInfo.paymentMethod || "",
          bankName: currentData.bankAccountInfo.bankName || "",
          accountNumber: currentData.bankAccountInfo.accountNumber || "",
        },
      };
    }

    return baseValues;
  };

  //submit the updated data
  const onSubmit = async (data: FieldValue<any>) => {
    try {
      const submissionData = {
        ...data,
        profileImage: selectedId
          ? {
              publicId: image?.data?.photo?.publicId || "",
              url: image?.data?.photo?.url || "",
            }
          : currentData?.profileImage,
      };

      let result;

      console.log(sellerId);
      if (role === "seller") {
        if (sellerId && currentData) {
          result = await updateSeller({
            id: sellerId,
            data: submissionData,
          }).unwrap();
        } else {
          result = await addSeller(submissionData).unwrap();
        }
      } else {
        if (stakeHolderId && currentData) {
          result = await updateStakeHolder({
            id: stakeHolderId,
            data: submissionData,
          }).unwrap();
        } else {
          result = await addStakeHolder(submissionData).unwrap();
        }
      }

      if (result.success) {
        showToast({
          message: result.message || "User updated successfully!",
          duration: 200,
          position: {
            horizontal: "right",
            vertical: "top",
          },
          type: "success",
        });
      }
    } catch {
      showToast({
        message: "Failed to update user.",
        duration: 200,
        position: {
          horizontal: "right",
          vertical: "top",
        },
        type: "error",
      });
    }
  };

  const isLoading = userLoading || sellerLoading || stakeHolderLoading;
  const isSubmitting =
    isCreatingSeller ||
    isUpdatingSeller ||
    isCreatingStakeHolder ||
    isUpdatingStakeHolder;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box>
      <Paper elevation={2} sx={{ p: { xs: 2, sm: 3, md: 4 }, borderRadius: 2 }}>
        <ReusableForm
          onSubmit={onSubmit}
          defaultValues={getDefaultValues()}
          key={`${sellerId}-${stakeHolderId}-${role}`}
        >
          <FormHeader
            title={currentData ? "Update User" : "User Registration"}
            subTitle={
              currentData
                ? "Update user details below."
                : "Please fill in authentic details below."
            }
          />

          {/* Image Section */}
          <Box sx={{ mb: 4 }}>
            <SectionHeader
              icon={<FaUser />}
              title="User Photo"
              subtitle="Upload or select a profile image"
            />

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                flexWrap: "wrap",
              }}
            >
              {/* Preview */}
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
                ) : currentData?.profileImage?.url ? (
                  <img
                    src={currentData.profileImage.url}
                    alt="Current Profile"
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

              {/* Image Details */}
              {(image?.data?.photoName ||
                currentData?.profileImage?.publicId) && (
                <Box sx={{ flexGrow: 1 }}>
                  <Box fontWeight={500}>
                    {image?.data?.photoName ||
                      currentData?.profileImage?.publicId}
                  </Box>
                </Box>
              )}

              {/* Add or Change Button */}
              <Box>
                <Button
                  variant="outlined"
                  onClick={() => setDrawerOpen(true)}
                  sx={{ textTransform: "none" }}
                >
                  {selectedId || currentData?.profileImage?.url
                    ? "Change Image"
                    : "Add Image"}
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
          </Box>

          {/* Role Section */}
          <SectionHeader
            icon={<GrAction />}
            title="Role Information"
            subtitle="Choose the user role"
          />

          <Box sx={{ mb: 3 }}>
            <SelectInputField
              name="role"
              label="Role"
              options={["admin", "seller"]}
              requiredMessage="Select a role"
              onChange={(value) => setRole(value)}
            />
          </Box>

          {/* Personal Information */}
          <SectionHeader
            icon={<FaUser />}
            title="Personal Information"
            subtitle="Enter basic personal details"
          />

          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextInput name="name.firstName" label="First Name" required />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextInput name="name.middleName" label="Middle Name" />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextInput name="name.lastName" label="Last Name" required />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextInput name="email" label="Email" type="email" required />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextInput name="phone" label="Phone" type="tel" required />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextInput name="nid" label="NID" required />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <DateInput name="dateOfBirth" label="Date of Birth" required />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <DateInput name="dateOfJoining" label="Joining Date" required />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <SelectInputField
                name="gender"
                label="Gender"
                options={["male", "female", "other"]}
                requiredMessage="Gender is required"
              />
            </Grid>

            {/* Address Section */}
            <Grid size={{ xs: 12, md: 12 }}>
              <SectionHeader
                icon={<InfoOutlinedIcon />}
                title="Address Information"
                subtitle="Enter present and permanent address"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextInput
                name="address.presentAddress"
                label="Present Address"
                required
                multiline
                row={2}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextInput
                name="address.permanentAddress"
                label="Permanent Address"
                required
                multiline
                row={2}
              />
            </Grid>

            {/* Bank Information - Only for Sellers */}
            {isSellerRole && (
              <>
                <Grid size={{ xs: 12, md: 12 }}>
                  <SectionHeader
                    icon={<MdAccountBalance />}
                    title="Bank Information"
                    subtitle="Only for sellers"
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <SelectInputField
                    name="bankAccountInfo.paymentMethod"
                    label="Payment Method"
                    options={["bankTransfer", "mobileBanking"]}
                    requiredMessage="Payment method is required"
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <SelectInputField
                    name="bankAccountInfo.bankName"
                    label="Bank Name"
                    options={["bKash", "Nagad", "dhakaBank"]}
                    requiredMessage="Bank name is required"
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <TextInput
                    name="bankAccountInfo.accountNumber"
                    label="Account Number"
                    required
                  />
                </Grid>
              </>
            )}

            <Grid size={{ xs: 12, md: 12 }}>
              <SectionHeader
                icon={<MdSecurity />}
                title="User Status"
                subtitle="Update the status and profile settings"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <SelectInputField
                name="profileStatus"
                label="Profile Status"
                options={["active", "inactive", "blocked", "leaved"]}
                requiredMessage="Profile Status is required"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <RadioInput
                name="isDeleted"
                label="Profile Deletion Status"
                options={[
                  { label: "Active", value: false },
                  { label: "Deleted", value: true },
                ]}
              />
            </Grid>

            {/* Password Section - Only for new users */}
            {!currentData && (
              <>
                <Grid size={{ xs: 12, md: 12 }}>
                  <SectionHeader
                    icon={<MdSecurity />}
                    title="Security"
                    subtitle="Create new password"
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 12 }}>
                  <TextInput
                    name="password"
                    label="Password"
                    type="password"
                    defaultValue="12345"
                    placeholder="Enter password"
                    required
                  />
                </Grid>
              </>
            )}

            {/* Submit Button */}
            <Grid size={{ xs: 12, md: 3 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                sx={{ py: 1.5 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <CircularProgress size={24} sx={{ color: "white" }} />
                ) : currentData ? (
                  "Update User"
                ) : (
                  "Create Account"
                )}
              </Button>
            </Grid>
          </Grid>
        </ReusableForm>
      </Paper>
    </Box>
  );
}
