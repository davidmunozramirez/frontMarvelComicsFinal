import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Grid, Stack, TextField } from "@mui/material";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import DeliverytSchema from "dh-marvel/features/checkout/schemas/deliverySchema";
import { FC, useEffect } from "react";
import ControlledInput from "../controlledInput/controlledInput";
import { DeliveryDataType } from "dh-marvel/features/checkout/deliveryData.types";
import useOrder from "dh-marvel/features/formContext/useOrder";
import StepperNavigation from "../stepperNavigator/stepperNavigator";

export type RegisterFormProps = {
  activeStep: number;
  handleNext: () => void;
  onPrevClick: () => void;
};
export const FormDeliveryData: FC<RegisterFormProps> = ({
  activeStep,
  handleNext,
  onPrevClick,
}: RegisterFormProps) => {
  const { dispatch } = useOrder();

  const methods = useForm<DeliveryDataType>({
    resolver: yupResolver(DeliverytSchema),
    defaultValues: {
      address1: "Siempre Viva 123",
      address2: "AV 45",
      city: "Buenos Aires",
      state: "BA",
      zipCode: "1417",
    },
  });
  const { watch, setFocus, handleSubmit } = methods;
  const address1 = watch("address1");
  const address2 = watch("address2");
  const city = watch("city");
  const state = watch("state");
  const zipCode = watch("zipCode");

  const onSubmit = (data: DeliveryDataType) => {
    dispatch({
      type: "SET_ADDRESS",
      payload: data,
    });
    handleNext();
  };

  const handleonPrevClick = () => {
    onPrevClick();
  };

  return (
    <Box sx={{ m: 2 }}>
      <Stack spacing={2}>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ControlledInput name={"address1"} label={"Address 1"} />
            <ControlledInput name={"address2"} label={"Address 2"} />
            <ControlledInput name={"city"} label={"City"} />
            <Grid container spacing={2}>
              <Grid item>
                <ControlledInput name={"state"} label={"State"} />
              </Grid>
              <Grid item>
                <ControlledInput name={"zipCode"} label={"Zip Code"} />
              </Grid>
            </Grid>
          </form>
        </FormProvider>
        <StepperNavigation
          activeStep={activeStep}
          onPrevClick={handleSubmit(handleonPrevClick)}
          onNextClick={handleSubmit(onSubmit)}
        />
        <div>
          <h1>Validate your delivery data</h1>
          Address 1: {address1}
          <br />
          Address 2: {address2}
          <br />
          City: {city}
          <br />
          State: {state}
          <br />
          Zip Code: {zipCode}
        </div>
      </Stack>
    </Box>
  );
};
