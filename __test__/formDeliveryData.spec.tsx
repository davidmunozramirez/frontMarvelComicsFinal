import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FormDeliveryData } from "dh-marvel/components/formDeliveryData/formDeliveryData";
import { StepperNavigationProps } from "dh-marvel/components/stepperNavigator/stepperNavigator";
import {
  OrderProvider,
  OrderState,
} from "dh-marvel/features/formContext/OrderContext";
import useOrder from "dh-marvel/features/formContext/useOrder";
import { FormPersonalData } from "../components/formPersonalData/formPersonalData";

const mockStepperNavigationProps = jest.fn();
jest.mock("dh-marvel/components/stepperNavigator/stepperNavigator", () =>
  jest.fn((props: StepperNavigationProps) => {
    mockStepperNavigationProps(props);
    return (
      <div>
        StepperNavigation: {props.activeStep}
        <div>
          <button onClick={props.onPrevClick}>Previous</button>
          <button onClick={props.onNextClick}>Next</button>
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
        address: {
          number: "42424242 4242 4242",
          cvc: "123",
          expDate: "02/28",
          nameOnCard: "TEST USER",
        },
    },
  } as unknown as OrderState,
  dispatch: mockDispatch,
});

describe("Delivery data form", () => {
  describe("when rendering default form", () => {
    it("should render the validation text", () => {
      const mockHandleNext = jest.fn();
      const mockHandleBack = jest.fn();
      render(
        <OrderProvider>
          <FormDeliveryData
            activeStep={0}
            handleNext={mockHandleNext}
            onPrevClick={mockHandleBack}
          />
        </OrderProvider>
      );
      const validator = screen.queryByText("Validate your delivery data");
      expect(validator).toBeInTheDocument();
    });

    it("should render button next", () => {
      const mockHandleNext = jest.fn();
      const mockHandleBack = jest.fn();
      render(
        <OrderProvider>
          <FormDeliveryData
            activeStep={0}
            handleNext={mockHandleNext}
            onPrevClick={mockHandleBack}
          />
        </OrderProvider>
      );
      const buttonN = screen.getByRole("button", { name: "Next" });
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
          <FormDeliveryData
            activeStep={0}
            handleNext={mockHandleNext}
            onPrevClick={mockHandleBack}
          />
        </OrderProvider>
      );
      userEvent.type(
        screen.getByRole("textbox", { name: "Address 1" }),
        "Siempre Viva 123"
      );
      userEvent.type(
        screen.getByRole("textbox", { name: "Address 2" }),
        "AV 45"
      );
      userEvent.type(
        screen.getByRole("textbox", { name: "City" }),
        "Buenos Aires"
      );
      userEvent.type(screen.getByRole("textbox", { name: "State" }), "BA");
      userEvent.type(screen.getByRole("textbox", { name: "Zip Code" }), "1417");

      userEvent.click(screen.getByRole("button", { name: "Next" }));

      await waitFor(() => {
        expect(mockHandleNext).toBeCalled();
      });
      expect(mockDispatch).toBeCalledWith({
        payload: {
          address1: "Siempre Viva 123",
          address2: "AV 45",
          city: "Buenos Aires",
          state: "BA",
          zipCode: "1417",
        },
        type: "SET_ADDRESS",
      });
    });
  });
});
