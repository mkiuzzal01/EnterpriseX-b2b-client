import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useEffect, useState } from "react";
import { Box, Typography, Button, Divider, Paper, Grid } from "@mui/material";
import ReusableForm from "../../../shared/ReusableFrom";
import SelectInputField from "../../../utils/input-fields/SelectInputField";
import TextInput from "../../../utils/input-fields/TextInput";
import DateInput from "../../../utils/input-fields/DateInput";
import SectionHeader from "../../../utils/section/SectionHeader";
import { GrAction } from "react-icons/gr";
import { FaUser } from "react-icons/fa6";
import { MdAccountBalance, MdSecurity } from "react-icons/md";

type RegistrationProps = {
  role: string;
  password?: string;
  name: {
    firstName: string;
    middleName?: string;
    lastName: string;
  };
  email: string;
  phone?: string;
  nid: string;
  dateOfBirth: string;
  gender: string;
  dateOfJoining: string;
  address: {
    presentAddress: string;
    permanentAddress: string;
  };
  bankAccountInfo?: {
    paymentMethod: string;
    bankName: string;
    accountNumber: string;
  };
};

const CreateUser = () => {
  const [role, setRole] = useState<string>("");
  const [isSeller, setIsSeller] = useState<boolean>(false);

  useEffect(() => {
    setIsSeller(role === "Seller");
  }, [role]);

  const onSubmit = (data: RegistrationProps) => {
    console.log("Form Data:", data);
  };

  return (
    <Box>
      <Paper elevation={2} sx={{ p: { xs: 2, sm: 3, md: 4 }, borderRadius: 2 }}>
        <ReusableForm onSubmit={onSubmit}>
          <Box className="bg-green-800 p-6">
            <Typography variant="h6" fontWeight="bold" color="white">
              User Registration
            </Typography>
            <Typography variant="body2" color="white" sx={{ opacity: 0.8 }}>
              Please fill in authentic details below.
            </Typography>
          </Box>

          <SectionHeader
            icon={<GrAction />}
            title="Role Information"
            subtitle="Choose the user role"
          />

          <Box>
            <SelectInputField
              name="role"
              label="Role"
              options={["Admin", "Seller"]}
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
                options={["Male", "Female", "Other"]}
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
                    options={["Bank Transfer", "Mobile Banking"]}
                    requiredMessage="Payment method is required"
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <SelectInputField
                    name="bankAccountInfo.bankName"
                    label="Bank Name"
                    options={["DBBL", "City Bank", "Brac Bank"]}
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
