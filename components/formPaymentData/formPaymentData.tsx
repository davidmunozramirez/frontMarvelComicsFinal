import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Box, Grid, Snackbar, Stack, TextField } from "@mui/material";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import PaymentSchema from "dh-marvel/features/checkout/schemas/paymentSchema";
import { FC, useEffect, useState } from "react";
import useOrder from "dh-marvel/features/formContext/useOrder";
import { PaymentDataType } from "dh-marvel/features/checkout/paymentData.type";
import ControlledInput from "../controlledInput/controlledInput";
import StepperNavigation from "../stepperNavigator/stepperNavigator";
import { postForm } from "dh-marvel/features/checkout/postForm";
import { useRouter } from "next/router";

export type RegisterFormProps = {
  activeStep: number;
  handleNext: () => void;
  onPrevClick: () => void;
  idSnackbar: any;
};
export const FormPaymentData: FC<RegisterFormProps> = ({
  activeStep,
  handleNext,
  onPrevClick,
  idSnackbar,
}: RegisterFormProps) => {
  const { dispatch, state } = useOrder();
  const router = useRouter();
  //Snackbar
  const [openSnackbar, setOpenSnackbar] = useState<any>(false);
  const [messageSnackbar, setMessageSnackbar] = useState<any>("");
  const [infoSnackbar, setInfoSnackbar] = useState<any>();
  //
  const methods = useForm<PaymentDataType>({
    resolver: yupResolver(PaymentSchema),
    defaultValues: {
      number: "1234567890123456",
      cvc: "123",
      expDate: "01/31",
      nameOnCard: "TEST CREDIT CARD",
    },
  });
  const { watch, setFocus, handleSubmit, register, formState: { errors } } = methods;
  const number = watch("number");
  const cvc = watch("cvc");
  const expDate = watch("expDate");
  const nameOnCard = watch("nameOnCard");

  const onSubmit = (data: PaymentDataType) => {
    dispatch({
      type: "SET_CARD",
      payload: data,
    });
    postForm({ ...state.order, card: data }).then((data) =>
      setInfoSnackbar(data)
    );
    handleNext();
  };

  useEffect(() => {
    console.log("dentro del use effect", infoSnackbar);

    if (infoSnackbar?.error) {
      console.log("bsatman", infoSnackbar);

      setMessageSnackbar(infoSnackbar?.message);
      setOpenSnackbar(true);
    }
    if (infoSnackbar?.data) {
      console.log("dentro del if del use effect", infoSnackbar);

      const handledData = { inital: infoSnackbar.data, data: idSnackbar };
      router.push(
        {
          pathname: `/confirmation/${idSnackbar}`,
          query: { data: JSON.stringify(handledData) },
        });
    }
  }, [infoSnackbar]);
  console.log("fuera del use effect", infoSnackbar);

  const handleonPrevClick = () => {
    onPrevClick();
  };

  useEffect(() => {
    setFocus("number");
  }, []);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
      if (reason === "clickaway") {
        return;
      }
    setOpenSnackbar(!false);
  };

  return (
    <Box sx={{ m: 2 }}>
      <Stack spacing={2}>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {messageSnackbar}
          </Alert>
        </Snackbar>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ControlledInput
              // name={"nameOnCard"}
              {...register("nameOnCard", {required: true} )}
              label={"Name On Card"}
              inputProps={{"data-testid": "nameOnCard"}} />
            {errors["nameOnCard"]?.type === "required" && <p>This field is required</p> }
            <ControlledInput
              // name={"number"}
              {...register("number", {required: true} )}
              label={"Credit Card"}
              type={"password"}
              inputProps={{"data-testid": "password"}} />
            <Grid container spacing={2}>
              <Grid item>
                <ControlledInput
                  // name={"expDate"}
                  {...register("expDate", {required: true} )}
                  label={"Expedition Date"}
                  inputProps={{"data-testid": "expDate"}}/>
              </Grid>
              <Grid item>
                <ControlledInput
                  // name={"cvc"}
                  {...register("cvc", {required: true} )}
                  label={"CVC"}
                  inputProps={{"data-testid": "cvc"}}/>
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
          <h1>Validate your payment data</h1>
          Name: {nameOnCard}
          <br />
          Number: {number.replace(number[0], "*").replace(number[1], "*").replace(number[2], "*").replace(number[3], "*").replace(number[4], "*").replace(number[5], "*").replace(number[6], "*").replace(number[7], "*").replace(number[8], "*").replace(number[9], "*").replace(number[10], "*").replace(number[11], "*")}
          <br />
          Expiration date: {expDate}
          <br />
          CVC: {cvc}
        </div>
      </Stack>
    </Box>
  );
};

{
  /* <TextField
{...register("ccname")}
required
fullWidth
id="ccname"
label="Name as it appears on your card"
name="ccname"
autoComplete="ccname"
helperText={errors?.ccname ? String(errors?.ccname?.message) : ""}
// onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
//   setInputsccname(event.target.value);
// }}
/> */
}
