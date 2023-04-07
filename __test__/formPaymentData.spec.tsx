import { render, screen, waitFor } from "@testing-library/react";
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
        number: "42424242 4242 4242",
        cvc: "123",
        expDate: "02/28",
        nameOnCard: "TEST USER",
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
        "TEST USER"
      );
      userEvent.type(
        screen.getByRole("textbox", { name: "Number" }),
        "42424242 4242 4242"
      );
      userEvent.type(
        screen.getByRole("textbox", { name: "Expedition Date" }),
        "02/28"
      );
      userEvent.type(screen.getByRole("textbox", { name: "CVC" }), "123");

      userEvent.click(screen.getByRole("button", { name: "Finish" }));

      await waitFor(() => {
        expect(mockHandleNext).toBeCalled();
      });
      expect(mockDispatch).toBeCalledWith({
        payload: {
          number: "4242424242424242",
          cvc: "123",
          expDate: "02/28",
          nameOnCard: "TEST USER",
        },
        type: "SET_CARD",
      });
    });
  });
});
