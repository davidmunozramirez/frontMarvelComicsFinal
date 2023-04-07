import { Box, Stack, TextField, useFormControl } from "@mui/material";
import {
  FormProvider,
  useController,
  useForm,
  useFormContext,
  useWatch,
} from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import UserSchema from "dh-marvel/features/checkout/schemas/userSchema";
import { FC, useEffect, useState } from "react";
import ControlledInput from "../controlledInput/controlledInput";
import useOrder from "dh-marvel/features/formContext/useOrder";
import { PersonalDataType } from "dh-marvel/features/checkout/personalData.type";
import StepperNavigation from "../stepperNavigator/stepperNavigator";

export type RegisterFormProps = {
  activeStep: number,
  handleNext: () => void;
}
export const FormPersonalData: FC<RegisterFormProps> = ({ activeStep, handleNext}: RegisterFormProps) => {
  const { dispatch } = useOrder();

  const methods = useForm<PersonalDataType>({
    resolver: yupResolver(UserSchema),
    defaultValues: {
      name: "Test",
      lastname: "User",
      email: "test@user.com",
    },
  });
  const { watch, setFocus, handleSubmit } = methods;
  const email = watch("email");
  const name = watch("name");
  const lastname = watch("lastname");

  const onSubmit = (data: PersonalDataType) => {
    console.log("entro al onsubmit del primer form");
    
    dispatch({
      type: "SET_CUSTOMER",
      payload: data,
    });
    handleNext();
  };

  useEffect(() => {
    setFocus("email");
  }, []);

  return (
    <Box sx={{ m: 2 }}>
    <Stack spacing={2}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ControlledInput name={"name"} label={"Name"} />
          <ControlledInput name={"lastname"} label={"Last Name"} />
          <ControlledInput name={"email"} label={"Email"} type={"email"} />
        </form>
      </FormProvider>
      <StepperNavigation 
        activeStep={activeStep} 
        onPrevClick={() => console.log('do nothing') } 
        onNextClick={handleSubmit(onSubmit) }/>
      <div>
          <h1>Validate your personal data</h1>
          Name: {name}
          <br/>
          Last Name: {lastname}
          <br/>
          Email: {email}
        </div> 
    </Stack>
    </Box>
  );
};
