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
    <Typography component="span">{value ?? "-"} </Typography>
  </Grid>
);

const StakeHolderDetails = ({ stakeHolder }) => {
  if (!stakeHolder) return null;

  const fullName = [
    stakeHolder.name.firstName,
    stakeHolder.name.middleName,
    stakeHolder.name.lastName,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        {/* Header */}
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <Avatar
            src={stakeHolder.profileImage?.url}
            alt={fullName}
            sx={{ width: 72, height: 72 }}
          />
          <Box>
            <Typography variant="h5" fontWeight={600}>
              {fullName}
            </Typography>
            <Typography color="text.secondary">{stakeHolder.email}</Typography>
          </Box>
        </Box>

        {/* Basic Info */}
        <Typography variant="h6" gutterBottom>
          Personal Info
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          <InfoLine label="Phone" value={stakeHolder.phone} />
          <InfoLine label="Gender" value={stakeHolder.gender} />
          <InfoLine
            label="Date of Birth"
            value={new Date(stakeHolder.dateOfBirth).toLocaleDateString()}
          />
          <InfoLine
            label="Joined"
            value={new Date(stakeHolder.dateOfJoining).toLocaleDateString()}
          />
          <InfoLine label="NID" value={stakeHolder.nid} />
        </Grid>

        {/* Address */}
        <Typography variant="h6" sx={{ mt: 4 }} gutterBottom>
          Addresses
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          <InfoLine
            label="Present Address"
            value={stakeHolder.address.presentAddress}
          />
          <InfoLine
            label="Permanent Address"
            value={stakeHolder.address.permanentAddress}
          />
        </Grid>
      </CardContent>
    </Card>
  );
};

export default StakeHolderDetails;
