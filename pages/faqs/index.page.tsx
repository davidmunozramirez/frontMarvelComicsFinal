import { Box } from "@mui/material";
import { faqsData } from "dh-marvel/components/faqs/faqsData";
import Faqs from "dh-marvel/components/faqs/faqs";
import LayoutGeneral from "dh-marvel/components/layouts/layout-general";

const FaqsPage = () => {
  return (
    <LayoutGeneral>
      <Box>
        {faqsData.map((faq) => (
          <Faqs key={faq.id} questions={faq.question} answers={faq.answer} />
        ))}
      </Box>
    </LayoutGeneral>
  );
};
export default FaqsPage;
