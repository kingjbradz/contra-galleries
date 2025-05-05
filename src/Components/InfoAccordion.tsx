import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

interface InfoAccordionProps {
  title?: string | null;
  content: React.ReactNode | null;
}

const InfoAccordion: React.FC<InfoAccordionProps> = ({ title, content }) => {
  return (
    <Accordion
      disableGutters
      elevation={0}
      sx={{
        border: "1px solid black",
        borderRadius: "4px",
        "&::before": {
          opacity: "0 !important",
        },
      }}
    >
      <AccordionSummary
        expandIcon={<ArrowDropDownIcon sx={{ color: "black" }} />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Typography component="span">{title}</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ textAlign: "left" }}>
        <Typography>{content}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default InfoAccordion;
