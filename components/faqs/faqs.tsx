import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FC } from "react";

interface Props {
  questions: string;
  answers: string;
}
const Faqs: FC<Props> = ({ questions, answers }) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>{questions}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{answers}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};
export default Faqs;
