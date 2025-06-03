import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useEffect, useState } from "react";
import { Box, Button, Paper, Grid } from "@mui/material";
import ReusableForm from "../../../shared/ReusableFrom";
import SelectInputField from "../../utils/input-fields/SelectInputField";
import TextInput from "../../utils/input-fields/TextInput";
import DateInput from "../../utils/input-fields/DateInput";
import SectionHeader from "../../utils/section/SectionHeader";
import { GrAction } from "react-icons/gr";
import { FaUser } from "react-icons/fa6";
import { MdAccountBalance, MdSecurity } from "react-icons/md";
import FormHeader from "../../utils/FormHeader";
import { useCreateSellerMutation } from "../../../redux/features/seller/seller-api";
import { useCreateStakeHolderMutation } from "../../../redux/features/stake-holder/stakeHolder-api";
import { useToast } from "../../utils/tost-alert/ToastProvider";
import Loader from "../Loader";
import type { FieldValues } from "react-hook-form";

const CreateUser = () => {
  const [addSeller, { isLoading }] = useCreateSellerMutation();
  const [addStakeHolder, { isLoading: isFacing }] =
    useCreateStakeHolderMutation();
  const [role, setRole] = useState<string>("");
  const [isSeller, setIsSeller] = useState<boolean>(false);
  const { showToast } = useToast();

  useEffect(() => {
    setIsSeller(role === "seller");
  }, [role]);

  const onSubmit = async (data: FieldValues) => {
    try {
      if (isFacing || isLoading) return <Loader />;
      let res;
      if (role === "admin") {
        const stakeHolder = {
          password: data?.password,
          stakeholder: {
            name: data?.name,
            email: data?.email,
            role: data?.role,
            status: data?.status,
            phone: data?.phone,
            nid: data?.nid,
            dateOfBirth: data?.dateOfBirth,
            gender: data?.gender,
            dateOfJoining: data?.dateOfJoining,
            address: data?.address,
          },
        };
        res = await addStakeHolder(stakeHolder);
      } else if (role === "seller") {
        const seller = {
          password: data?.password,
          seller: {
            name: data?.name,
            email: data?.email,
            role: data?.role,
            phone: data?.phone,
            nid: data?.nid,
            dateOfBirth: data?.dateOfBirth,
            gender: data?.gender,
            dateOfJoining: data?.dateOfJoining,
            address: data?.address,
            bankAccountInfo: data?.bankAccountInfo,
          },
        };

        res = await addSeller(seller);
      }
      if (res?.data.success) {
        setRole("");
        showToast({
          message: res.data.message,
          duration: 2000,
          position: {
            horizontal: "right",
            vertical: "top",
          },
          type: "success",
        });
      }
    } catch {
      showToast({
        message: "Something wrong",
        duration: 2000,
        position: {
          horizontal: "right",
          vertical: "top",
        },
        type: "error",
      });
    }
  };

  return (
    <Box>
      <Paper elevation={2} sx={{ p: { xs: 2, sm: 3, md: 4 }, borderRadius: 2 }}>
        <ReusableForm onSubmit={onSubmit}>
          <FormHeader
            title="User Registration"
            subTitle="Please fill in authentic details below."
          />

          <SectionHeader
            icon={<GrAction />}
            title="Role Information"
            subtitle="Choose the user role"
          />

          <Box>
            <SelectInputField
              name="role"
              label="Role"
              options={["admin", "seller"]}
              requiredMessage="Select a role"
              onChange={(value) => setRole(value)}
            />
          </Box>

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

            {isSeller && (
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
                placeholder="Enter your password"
                required
              />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                sx={{ py: 1.5 }}
              >
                Create Account
              </Button>
            </Grid>
          </Grid>
        </ReusableForm>
      </Paper>
    </Box>
  );
};

export default CreateUser;
