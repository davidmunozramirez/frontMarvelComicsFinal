import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
      customer: { firstname: "111" },
    },
  } as unknown as OrderState,
  dispatch: mockDispatch,
});

describe("Personal data form", () => {
  describe("when rendering default form", () => {
    it("should render the validation text", () => {
      const mockHandleNext = jest.fn();
      render(
        <OrderProvider>
          <FormPersonalData activeStep={0} handleNext={mockHandleNext} />
        </OrderProvider>
      );
      const validator = screen.queryByText("Validate your personal data");
      expect(validator).toBeInTheDocument();
    });
    
    it("should render button next", () => {
      const mockHandleNext = jest.fn();
      render(
        <OrderProvider>
          <FormPersonalData activeStep={0} handleNext={mockHandleNext} />
        </OrderProvider>
      );
      const button = screen.getByRole('button', {name: "Next"})
      expect(button).toBeInTheDocument()
    });
  });

  describe("when rendering submitting form", () => {
    it("should hit the dispatch", async () => {
      const mockHandleNext = jest.fn();
      render(
        <OrderProvider>
          <FormPersonalData activeStep={0} handleNext={mockHandleNext} />
        </OrderProvider>
      );
      userEvent.type(screen.getByRole("textbox", { name: "Name" }), "Test Name");
      userEvent.type(
        screen.getByRole("textbox", { name: "Last Name" }),
        "Test Last Name"
      );
      userEvent.type(
        screen.getByRole("textbox", { name: "Email" }),
        "testemail@email.com"
      );
      userEvent.click(screen.getByRole("button", { name: "Next" }));

      await waitFor(() => {
        expect(mockHandleNext).toBeCalled();
      });
      expect(mockDispatch).toBeCalledWith({
        payload: {
          name: "Test Name",
          lastname: "Test Last Name",
          email: "testemail@email.com",
        },
        type: "SET_CUSTOMER",
      });
    });
  });

  describe("checking some texts", () => {
    it("shpuld show texts at the buttom", async () => {
      const mockHandleNext = jest.fn();
      render(
        <OrderProvider>
          <FormPersonalData activeStep={0} handleNext={mockHandleNext} />
        </OrderProvider>
      );
      userEvent.type(screen.getByRole("textbox", { name: "Name" }), "Test Name");
      userEvent.type(
        screen.getByRole("textbox", { name: "Last Name" }),
        "Test Last Name"
      );
      userEvent.type(
        screen.getByRole("textbox", { name: "Email" }),
        "testemail@email.com"
      );
      // userEvent.click(screen.getByRole("button", { name: "Next" }));

      await waitFor(() => {
        expect(screen.queryByText("Name: Test Name")).toBeInTheDocument();
        expect(screen.queryByText(/Last Name: Test Last Name/i)).toBeInTheDocument();
        expect(screen.queryByText("Email: testemail@email.com")).toBeInTheDocument();
      });
    });
  });

});
