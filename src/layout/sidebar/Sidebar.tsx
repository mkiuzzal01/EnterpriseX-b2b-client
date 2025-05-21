import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";
import { NavLinks } from "./NavLinks";
import MenuItems from "../../components/utils/MenuItems";

type SidebarProps = {
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar = ({ setSidebarOpen }: SidebarProps) => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Box>
      {NavLinks.map((item, index) => (
        <Accordion
          key={index}
          expanded={expanded === `panel-${index}`}
          onChange={handleChange(`panel-${index}`)}
          sx={{
            backgroundColor: "transparent",
            color: "white",
            boxShadow: "none",
            "&::before": { display: "none" },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
            aria-controls={`panel-${index}-content`}
            id={`panel-${index}-header`}
          >
            <Box className="flex items-center space-x-2">
              <span className="text-lg">{item.icon}</span>
              <Typography className="text-base font-semibold">
                {item.name}
              </Typography>
            </Box>
          </AccordionSummary>

          {item.children.map((child, idx) => (
            <AccordionDetails
              onClick={(prev) => setSidebarOpen(!prev)}
              key={idx}
              sx={{ pl: 4 }}
            >
              <MenuItems
                route={child.route}
                icon={child.icon}
                name={child.name}
              />
            </AccordionDetails>
          ))}
        </Accordion>
      ))}
    </Box>
  );
};

export default Sidebar;
