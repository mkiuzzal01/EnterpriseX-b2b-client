import { Box, Typography } from "@mui/material";

type SectionHeaderProps = {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
};

const SectionHeader = ({ icon, title, subtitle }: SectionHeaderProps) => (
  <Box className="flex items-center gap-3 my-2 p-2 bg-amber-50">
    <Box>{icon}</Box>
    <Box>
      <Typography variant="h6" fontWeight="bold">
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>
      )}
    </Box>
  </Box>
);

export default SectionHeader;
