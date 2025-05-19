/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import TextInput from "../utils/input-fields/TextInput";
import DateInput from "../utils/input-fields/DateInput";
import SelectInputField from "../utils/input-fields/SelectInputField";
import ReusableForm from "../shared/ReusableFrom";

type RegistrationProps = {
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
  bankAccountInfo: {
    paymentMethod: string;
    bankName: string;
    accountNumber: string;
  };
};

const Registration = () => {
  const [role, setRole] = useState<string>("");
  const [isSeller, setIsSeller] = useState<boolean>(false);

  useEffect(() => {
    setIsSeller(role === "Seller");
  }, [role]);

  const onSubmit = (data: RegistrationProps) => {
    console.log("Form Data:", data);
  };

  return (
    <Box className="flex flex-col items-center p-4 sm:p-8 bg-gray-100 min-h-screen">
      <ReusableForm onSubmit={onSubmit}>
        <Box className="w-full max-w-6xl bg-white p-6 sm:p-10 rounded shadow">
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            User Information
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            Please fill in authentic details below.
          </Typography>

          <Box mb={2}>
            <SelectInputField
              name="role"
              label="Role"
              options={["Admin", "Seller"]}
              requiredMessage="Select a role"
              onChange={(value) => setRole(value)}
            />
          </Box>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextInput name="firstName" label="First Name" required />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextInput name="middleName" label="Middle Name" required />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextInput name="lastName" label="Last Name" required />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextInput name="email" label="Email" type="email" required />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextInput name="phone" label="Phone" type="tel" required />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextInput name="nid" label="NID" type="number" required />
            </Grid>
            {isSeller && (
              <>
                <Grid size={{ xs: 12, md: 6 }}>
                  <SelectInputField
                    name="paymentMethod"
                    label="Payment Method"
                    options={["Bank Transfer", "Mobile Banking"]}
                    requiredMessage="Payment method is required"
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <SelectInputField
                    name="bankName"
                    label="Bank Name"
                    options={["DBBL", "City Bank", "Brac Bank"]}
                    requiredMessage="Bank name is required"
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 12 }}>
                  <TextInput
                    name="accountNumber"
                    label="Account Number"
                    type="text"
                    required
                  />
                </Grid>
              </>
            )}
            <Grid size={{ xs: 12, md: 6 }}>
              <TextInput
                name="presentAddress"
                label="Present Address"
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextInput
                name="permanentAddress"
                label="Permanent Address"
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <DateInput name="dateOfBirth" label="Date of Birth" required />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <DateInput name="joiningData" label="Joining Date" required />
            </Grid>

            <Grid size={{ xs: 12, md: 12 }}>
              <TextInput
                name="password"
                label="Password"
                type="password"
                placeholder="Enter your password"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 12 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
              >
                Register
              </Button>
            </Grid>
          </Grid>
        </Box>
      </ReusableForm>
    </Box>
  );
};

export default Registration;
