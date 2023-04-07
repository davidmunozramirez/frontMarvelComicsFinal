import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CheckoutView } from "dh-marvel/components/checkoutView/checkoutView";
import { RegisterFormProps } from "dh-marvel/components/formPaymentData/formPaymentData";
import { DeliveryDataType } from "dh-marvel/features/checkout/deliveryData.types";
import { PaymentDataType } from "dh-marvel/features/checkout/paymentData.type";
import { PersonalDataType } from "dh-marvel/features/checkout/personalData.type";
import { Comic } from "dh-marvel/features/types";
import CheckoutComic, {
  getServerSideProps,
} from "dh-marvel/pages/checkout/[id].page";
import { getComic } from "dh-marvel/services/marvel/marvel.service";
import { GetServerSidePropsContext, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import {props} from "dh-marvel/components/checkoutView/checkoutView"
// Setting the mock for personal data form
const submittedData: PersonalDataType = {
  email: "test@a.com",
  lastname: "test",
  name: "test",
};
const mockPersonalDataFormProps = jest.fn();
jest.mock("dh-marvel/components/formPersonalData/formPersonalData", () =>
  jest.fn((props: RegisterFormProps) => {
    mockPersonalDataFormProps(props);
    return <div onClick={() => props.handleNext()}>formPersonalData</div>;
  })
);

// Setting the mock for delivery data form
const deliverySubmittedData: DeliveryDataType = {
  address1: "Siempre Viva 123",
  address2: "AV 45",
  city: "Buenos Aires",
  state: "BA",
  zipCode: "1417",
};
const mockDeliveryDataFormProps = jest.fn();
jest.mock("dh-marvel/components/formDeliveryData/formDeliveryData", () =>
  jest.fn((props: RegisterFormProps) => {
    mockDeliveryDataFormProps(props);
    return <div onClick={() => props.handleNext()}>formDeliveryData</div>;
  })
);

// Setting the mock for payment data form
const creditCardSubmittedData: PaymentDataType = {
  number: "42424242 4242 4242",
  cvc: "123",
  expDate: "02/28",
  nameOnCard: "TEST USER",
};
const mockCardDataFormProps = jest.fn();
jest.mock("dh-marvel/components/formPaymentData/formPaymentData", () =>
  jest.fn((props: RegisterFormProps) => {
    mockCardDataFormProps(props);
    return <div onClick={() => props.handleNext()}>formPaymentData</div>;
  })
);
////////////
// const getdata = require("dh-marvel/pages/checkout/[id].page");
// const mocka = require("getServerSideProps");
// jest.mock("getServerSideProps");


const stepperCoso = jest.fn();
let coso: JSX.Element;
jest.mock("dh-marvel/components/checkoutView/checkoutView", () =>
  jest.fn((props: props) => {
    stepperCoso(props);
    return coso = <div >checkoutView</div>;
  })
);

describe("Verifying the functionality of the stepper with its forms", () => {
  describe("When rendering the component", () => {

    it("blabla", async () => {
      await waitFor(()=>{
        render(coso)
      })
      const heading = screen.queryByText("Personal Data")
    expect(heading).not.toBeInTheDocument()
    });
  });
});




      // mocka.get.mockResolvedValue({
      //   data:[{title: "any", image: "any", price: "any",id: "any", idSnackbar: "any"}]
      // })
      // const title = await getdata();
      // const image = await getdata();
      // const price = await getdata();
      // const id = await getdata();
      // const idSnackbar = await getdata();

      //   render(
      //     <CheckoutView
      //       title={title}
      //       image={image}
      //       price={price}
      //       id={id}
      //       idSnackbar={idSnackbar}
      //     />
      //   );
      // const coso = screen.queryByText("Personal Data");
      // expect(coso).toBeInTheDocument();
   
  //  });