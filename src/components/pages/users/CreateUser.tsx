/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  Paper,
  Grid,
} from "@mui/material";
import ReusableForm from "../../../shared/ReusableFrom";
import SelectInputField from "../../../utils/input-fields/SelectInputField";
import TextInput from "../../../utils/input-fields/TextInput";
import DateInput from "../../../utils/input-fields/DateInput";

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
    <Box sx={{ py: 4, px: { xs: 2, md: 4 } }}>
      <Paper elevation={2} sx={{ p: { xs: 2, sm: 3, md: 4 }, borderRadius: 2 }}>
        <ReusableForm onSubmit={onSubmit}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            User Registration
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom mb={3}>
            Please fill in authentic details below.
          </Typography>

          <Box mb={3}>
            <SelectInputField
              name="role"
              label="Role"
              options={["Admin", "Seller"]}
              requiredMessage="Select a role"
              onChange={(value) => setRole(value)}
            />
          </Box>

          <Typography variant="h6" gutterBottom mt={2}>
            Personal Information
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3}>
            <Grid  size={{ xs: 12, md: 4 }}>
              <TextInput name="name.firstName" label="First Name" required />
            </Grid>
            <Grid  size={{ xs: 12, md: 4 }}>
              <TextInput name="name.middleName" label="Middle Name" />
            </Grid>
            <Grid  size={{ xs: 12, md: 4 }}>
              <TextInput name="name.lastName" label="Last Name" required />
            </Grid>

            <Grid  size={{ xs: 12, md: 4 }}>
              <TextInput name="email" label="Email" type="email" required />
            </Grid>
            <Grid  size={{ xs: 12, md: 4 }}>
              <TextInput name="phone" label="Phone" type="tel" required />
            </Grid>
            <Grid  size={{ xs: 12, md: 4 }}>
              <TextInput name="nid" label="NID" required />
            </Grid>

            <Grid  size={{ xs: 12, md: 4 }}>
              <DateInput name="dateOfBirth" label="Date of Birth" required />
            </Grid>
            <Grid  size={{ xs: 12, md: 4 }}>
              <DateInput name="dateOfJoining" label="Joining Date" required />
            </Grid>
            <Grid  size={{ xs: 12, md: 4 }}>
              <SelectInputField
                name="gender"
                label="Gender"
                options={["Male", "Female", "Other"]}
                requiredMessage="Gender is required"
              />
            </Grid>

            <Grid  size={{ xs: 12, md: 12 }}>
              <Typography variant="h6" gutterBottom>
                Address Information
              </Typography>
              <Divider/>
            </Grid>

            <Grid  size={{ xs: 12, md: 6 }}>
              <TextInput
                name="address.presentAddress"
                label="Present Address"
                required
                multiline
                row={2}
              />
            </Grid>
            <Grid  size={{ xs: 12, md: 6 }}>
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
                <Grid  size={{ xs: 12, md: 12 }}>
                  <Typography variant="h6" gutterBottom>
                    Banking Information
                  </Typography>
                  <Divider />
                </Grid>

                <Grid  size={{ xs: 12, md: 4 }}>
                  <SelectInputField
                    name="bankAccountInfo.paymentMethod"
                    label="Payment Method"
                    options={["Bank Transfer", "Mobile Banking"]}
                    requiredMessage="Payment method is required"
                  />
                </Grid>
                <Grid  size={{ xs: 12, md: 4 }}>
                  <SelectInputField
                    name="bankAccountInfo.bankName"
                    label="Bank Name"
                    options={["DBBL", "City Bank", "Brac Bank"]}
                    requiredMessage="Bank name is required"
                  />
                </Grid>
                <Grid  size={{ xs: 12, md: 4 }}>
                  <TextInput
                    name="bankAccountInfo.accountNumber"
                    label="Account Number"
                    required
                  />
                </Grid>
              </>
            )}

            <Grid  size={{ xs: 12, md: 12 }}>
              <Typography variant="h6" gutterBottom >
                Security
              </Typography>
              <Divider />
            </Grid>

            <Grid  size={{ xs: 12, md: 12 }}>
              <TextInput
                name="password"
                label="Password"
                type="password"
                defaultValue="12345"
                placeholder="Enter your password"
                required
              />
            </Grid>

            <Grid  size={{ xs: 12, md: 3 }}>
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
