import { Box, Button, Stack } from "@mui/material";
import { FC } from "react";

export type StepperNavigationProps = {
  activeStep: number;
  onPrevClick: () => void;
  onNextClick: () => void;
};

const StepperNavigation: FC<StepperNavigationProps> = ({
  activeStep,
  onPrevClick,
  onNextClick,
}: StepperNavigationProps) => {
  return (
    <Stack direction="row" mt={2}>
      {/* {activeStep !== 0 && <Button onClick={onPrevClick}>Back!</Button>}
      <Box sx={{ flex: "1 1 auto" }} />
      <Button onClick={onNextClick}>
        {activeStep === 1 ? "End" : "Next!"}
      </Button> */}
      <Button
        color="inherit"
        disabled={activeStep === 0}
        onClick={onPrevClick}
        sx={{ mr: 1 }}
      >
        Back
      </Button>

      <Button onClick={onNextClick} type="submit">
        {activeStep === 2 ? "Finish" : "Next"}
      </Button>
    </Stack>
  );
};

export default StepperNavigation;
