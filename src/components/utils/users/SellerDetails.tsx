/* SellerDetails.tsx */
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";


const InfoLine = ({
  label,
  value,
}: {
  label: string;
  value?: React.ReactNode;
}) => (
  <Grid item xs={12} md={6}>
    <Typography sx={{ fontWeight: 500 }} component="span">
      {label}:{" "}
    </Typography>
    <Typography component="span">{value ?? "-"}</Typography>
  </Grid>
);

const SellerDetails = ({ seller }) => {
  if (!seller) return null;

  const bank = seller.bankAccountInfo || {};

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        {/* Header */}
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <Avatar
            src={seller.profileImage?.url}
            alt={seller.fullName}
            sx={{ width: 72, height: 72 }}
          />
          <Box>
            <Typography variant="h5" fontWeight={600}>
              {seller.fullName}
            </Typography>
            <Typography color="text.secondary">{seller.email}</Typography>
          </Box>
        </Box>

        {/* Basic Info */}
        <Typography variant="h6" gutterBottom>
          Personal Info
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          <InfoLine label="Phone" value={seller.phone} />
          <InfoLine label="Gender" value={seller.gender} />
          <InfoLine
            label="Date of Birth"
            value={new Date(seller.dateOfBirth).toLocaleDateString()}
          />
          <InfoLine
            label="Joined"
            value={new Date(seller.dateOfJoining).toLocaleDateString()}
          />
          <InfoLine label="NID" value={seller.nid} />
        </Grid>

        {/* Address */}
        <Typography variant="h6" sx={{ mt: 4 }} gutterBottom>
          Addresses
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          <InfoLine label="Present" value={seller.address?.presentAddress} />
          <InfoLine
            label="Permanent"
            value={seller.address?.permanentAddress}
          />
        </Grid>

        {/* Bank */}
        <Typography variant="h6" sx={{ mt: 4 }} gutterBottom>
          Bank Account
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          <InfoLine label="Account #" value={bank.accountNumber} />
          <InfoLine label="Bank Name" value={bank.bankName} />
          <InfoLine label="Payment Method" value={bank.paymentMethod} />
          <InfoLine label="Balance" value={`$${bank.balance ?? 0}`} />
          <InfoLine
            label="Status"
            value={bank.status?.charAt(0).toUpperCase() + bank.status?.slice(1)}
          />
        </Grid>
      </CardContent>
    </Card>
  );
};

export default SellerDetails;
