import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FormDeliveryData } from "dh-marvel/components/formDeliveryData/formDeliveryData";
import { FormPaymentData } from "dh-marvel/components/formPaymentData/formPaymentData";
import { StepperNavigationProps } from "dh-marvel/components/stepperNavigator/stepperNavigator";
import {
  OrderProvider,
  OrderState,
} from "dh-marvel/features/formContext/OrderContext";
import useOrder from "dh-marvel/features/formContext/useOrder";

const mockStepperNavigationProps = jest.fn();
jest.mock("dh-marvel/components/stepperNavigator/stepperNavigator", () =>
  jest.fn((props: StepperNavigationProps) => {
    mockStepperNavigationProps(props);
    return (
      <div>
        StepperNavigation: {props.activeStep}
        <div>
          <button onClick={props.onPrevClick}>Previous</button>
          <button onClick={props.onNextClick}>Finish</button>
        </div>
      </div>
    );
  })
);

jest.mock("dh-marvel/features/formContext/useOrder");
const mockUseOrder = useOrder as jest.MockedFunction<typeof useOrder>;
const mockDispatch = jest.fn();
mockUseOrder.mockReturnValue({
  state: {
    order: {
      card: {
        number: "1234567890123456",
        cvc: "123",
        expDate: "01/31",
        nameOnCard: "TEST CREDIT CARD",
      },
    },
  } as unknown as OrderState,
  dispatch: mockDispatch,
});

describe("Payment data form", () => {
  describe("when rendering default form", () => {
    it("should render the validation text", () => {
      const mockHandleNext = jest.fn();
      const mockHandleBack = jest.fn();
      render(
        <OrderProvider>
          <FormPaymentData
            activeStep={0}
            handleNext={mockHandleNext}
            onPrevClick={mockHandleBack}
            idSnackbar={undefined}
          />
        </OrderProvider>
      );
      const validator = screen.queryByText("Validate your payment data");
      expect(validator).toBeInTheDocument();
    });

    it("should render button next", () => {
      const mockHandleNext = jest.fn();
      const mockHandleBack = jest.fn();
      render(
        <OrderProvider>
          <FormPaymentData
            activeStep={0}
            handleNext={mockHandleNext}
            onPrevClick={mockHandleBack}
            idSnackbar={undefined}
          />
        </OrderProvider>
      );
      const buttonN = screen.getByRole("button", { name: "Finish" });
      expect(buttonN).toBeInTheDocument();
      const buttonB = screen.getByRole("button", { name: "Previous" });
      expect(buttonB).toBeInTheDocument();
    });
  });

  describe("when rendering submitting form", () => {
    it("should hit the dispatch", async () => {
      const mockHandleNext = jest.fn();
      const mockHandleBack = jest.fn();
      render(
        <OrderProvider>
          <FormPaymentData
            activeStep={0}
            handleNext={mockHandleNext}
            onPrevClick={mockHandleBack}
            idSnackbar={undefined}
          />
        </OrderProvider>
      );
      userEvent.type(
        screen.getByRole("textbox", { name: "Name On Card" }),
        "TEST CREDIT CARD"
      );
      userEvent.type(
        screen.getByTestId("password"),
        "1234567890123456"
      );
      userEvent.type(
        screen.getByRole("textbox", { name: "Expedition Date" }),
        "01/31"
      );
      userEvent.type(screen.getByRole("textbox", { name: "CVC" }), "123");

      userEvent.click(screen.getByRole("button", { name: "Finish" }));

      await waitFor(() => {
        expect(mockHandleNext).toBeCalled();
      });
      expect(mockDispatch).toBeCalledWith({
        payload: {
          number: "1234567890123456",
          cvc: "123",
          expDate: "01/31",
          nameOnCard: "TEST CREDIT CARD",
        },
        type: "SET_CARD",
      });
    });
  });

  describe("clear the name on card", () => {
    it("should show error messages", async () => {
      const mockHandleNext = jest.fn();
      const mockHandleBack = jest.fn();
      render(
        <OrderProvider>
          <FormPaymentData
            activeStep={0}
            handleNext={mockHandleNext}
            onPrevClick={mockHandleBack}
            idSnackbar={undefined}
          />
        </OrderProvider>
      );

      const nameOnCardInput = screen.getByRole("textbox", { name: "Name On Card" });
      fireEvent.change(nameOnCardInput, { target: {value: ""} } )

      const buttonN = screen.getByRole("button", { name: "Finish" });
      fireEvent.click(buttonN);

      const errorMessage = screen.getByText(/required/i);
      // const errorMessage = document.getElementsByClassName("css-zc7vzp-MuiFormHelperText-root");

      // await waitFor(() => {
      //   expect(mockHandleNext).toBeCalled();
      // });
      // await waitFor(() => {
      //   console.log('errorMessage', errorMessage);
        
      //   expect(errorMessage).toBeInTheDocument();
      // });
      // await waitFor(() => {
      //   expect(mockDispatch).toBeCalledWith({
      //     payload: {
      //       number: "1234567890123456",
      //       cvc: "123",
      //       expDate: "01/31",
      //       nameOnCard: "",
      //     },
      //     type: "SET_CARD",
      //   });
      // })
      
    });

  });


});
