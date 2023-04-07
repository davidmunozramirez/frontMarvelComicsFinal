import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React, { useEffect } from "react";
import { FC, useState } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import UserSchema from "dh-marvel/features/checkout/schemas/userSchema";
import { FormDeliveryData } from "../formDeliveryData/formDeliveryData";
import { FormPaymentData } from "../formPaymentData/formPaymentData";
import { FormPersonalData } from "../formPersonalData/formPersonalData";
import BodySingle from "../layouts/body/single/body-single";
import { CheckoutInput } from "dh-marvel/features/checkout/checkout.types";
import { useRouter } from "next/router";

export type props = {
  title: string | any;
  image: string | any;
  price: number | any;
  id: number | any;
  idSnackbar: any;
};

const steps = ["Personal Data", "Delivery Adress", "Payment Infomation"];

export const CheckoutView: FC<props> = ({
  title,
  image,
  price,
  id,
  idSnackbar,
}) => {
  const [activeStep, setActiveStep] = useState(0);

  //methods to configurate the route to a succesful purchase or the api erros
  const router = useRouter();
  // methods to configurate the forms
  const methods = useForm();
  // methods to configurate the stepper

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handlefinal = (id: any) => {
    // router.push(`/confirmation/${id}`);
    console.log("a la ruta");
  };

  return (
    <BodySingle title={`Checkout: ${title}`}>
      <Box sx={{ width: "100%", display:"flex", justifyContent:"center" }}>
        <Box>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps: { completed?: boolean } = {};

            return (
              <Step key={label} {...stepProps}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        <React.Fragment>
          {activeStep === 0 && (
            <FormPersonalData handleNext={handleNext} activeStep={activeStep} />
          )}
          {activeStep === 1 && (
            <FormDeliveryData
              activeStep={activeStep}
              handleNext={handleNext}
              onPrevClick={handleBack}
            />
          )}
          {activeStep === 2 && (
            <FormPaymentData
              activeStep={activeStep}
              handleNext={() => {
                handlefinal(id);
              }}
              onPrevClick={handleBack}
              idSnackbar={idSnackbar}
            />
          )}
        </React.Fragment>
        </Box>
      <Card sx={{ maxWidth: 345, alignSelf: "center" }}>
        <CardMedia
          component="img"
          height="300"
          image={image}
          alt={title}
          sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
        />
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            {title}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {price}$
          </Typography>
        </CardContent>
      </Card>
      </Box>
    </BodySingle>
  );
};
