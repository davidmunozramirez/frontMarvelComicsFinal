import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  OrderProvider,
  OrderState,
} from "dh-marvel/features/formContext/OrderContext";
import useOrder from "dh-marvel/features/formContext/useOrder";
import { FormDeliveryData } from "dh-marvel/components/formDeliveryData/formDeliveryData";
import { FormPaymentData } from "dh-marvel/components/formPaymentData/formPaymentData";
import { StepperNavigationProps } from "dh-marvel/components/stepperNavigator/stepperNavigator";
import { FormPersonalData } from "../components/formPersonalData/formPersonalData";
import { CheckoutView } from '../components/checkoutView/checkoutView';

describe('CheckoutView', () => {
  it('should render correctly', () => {
    const { asFragment } = render(<CheckoutView
        title={"Test Title"}
        image={"Test Image"}
        price={70}
        id={9876543210}
        idSnackbar={123456789}
    />);
    expect(asFragment()).toMatchSnapshot();
  })
})

describe("when rendering checkoutView with props", () => {
    it("should render some checkoutView texts", () => {
      const mockHandleNext = jest.fn();
      render(
        <>
          <CheckoutView
            title={"Test Title"}
            image={"Test Image"}
            price={70}
            id={9876543210}
            idSnackbar={123456789}
          />
        </>
      );
      const text1 = screen.queryByText(/Test Title/i);
      const text2 = screen.queryByText(/70/i);
      // const buttonBuyNow = screen.getByRole('button', {name: "Buy Now"})
      // const collapsibleDescription = screen.getByRole('button', {name: "Description"})
      // userEvent.click(screen.getByRole("button", { name: "Description" }));
      
      expect(text1).toBeInTheDocument();
      expect(text2).toBeInTheDocument();
      // expect(buttonBuyNow).toBeInTheDocument();
      // expect(collapsibleDescription).toBeInTheDocument();
    });

    it("should render checkoutView with formPersonalData", async () => {
        const mockHandleNext = jest.fn();
        const mockHandleBack = jest.fn();
        render(
          <>
            <CheckoutView
              title={"Test Title"}
              image={"Test Image"}
              price={70}
              id={9876543210}
              idSnackbar={123456789}
            >
                <FormPersonalData
                    activeStep={0}
                    handleNext={mockHandleNext}>
                </FormPersonalData>
            </CheckoutView>
          </>
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

    it("should render checkoutView with formDeliveryData", async () => {
        const mockHandleNext = jest.fn();
        const mockHandleBack = jest.fn();
        render(
          <>
            <CheckoutView
              title={"Test Title"}
              image={"Test Image"}
              price={70}
              id={9876543210}
              idSnackbar={123456789}
            >
                <FormPersonalData
                    activeStep={0}
                    handleNext={mockHandleNext}>
                </FormPersonalData>
                
                <FormDeliveryData>
                    activeStep={0}
                    handleNext={mockHandleNext}
                    onPrevClick={mockHandleBack}    
                </FormDeliveryData>
            </CheckoutView>
          </>
        );
        
        userEvent.type(
            screen.getByRole("textbox", { name: "Address 1" }),
            "Test Main Address"
          );
          userEvent.type(
            screen.getByRole("textbox", { name: "Address 2" }),
            "Test address complement"
          );
          userEvent.type(
            screen.getByRole("textbox", { name: "City" }),
            "Test City"
          );
          userEvent.type(screen.getByRole("textbox", { name: "State" }), "Test State");
          userEvent.type(screen.getByRole("textbox", { name: "Zip Code" }), "1234");
    
          userEvent.click(screen.getByRole("button", { name: "Previous" }));
    
          await waitFor(() => {
            expect(mockHandleBack).toBeCalled();
          });
    });

    it("should render checkoutView with formPaymentData", async () => {
        const mockHandleNext = jest.fn();
        const mockHandleBack = jest.fn();
        render(
          <>
            <CheckoutView
              title={"Test Title"}
              image={"Test Image"}
              price={70}
              id={9876543210}
              idSnackbar={123456789}
            >
                <FormPaymentData>
                    activeStep={2}
                    handleNext={mockHandleNext}
                    onPrevClick={mockHandleBack}
                    idSnackbar={undefined}
                </FormPaymentData>
            </CheckoutView>
          </>
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
            screen.getByRole("textbox", { name: "Expiration Date (MM/YY)" }),
            "01/31"
          );
          userEvent.type(screen.getByRole("textbox", { name: "CVC" }), "123");
    
          userEvent.click(screen.getByRole("button", { name: "Previous" }));
    
          await waitFor(() => {
            expect(mockHandleBack).toBeCalled();
          });
        //   expect(mockDispatch).toBeCalledWith({
        //     payload: {
        //       number: "1234567890123456",
        //       cvc: "123",
        //       expDate: "01/31",
        //       nameOnCard: "TEST CREDIT CARD",
        //     },
        //     type: "SET_CARD",
        //   });
    });
})


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
          nameOnCard: "TEST CREDIT CARD",
          number: "1234567890123456",
          expDate: "01/31",
          cvc: "123",
        },
    },
  } as unknown as OrderState,
  dispatch: mockDispatch,
});

describe("should render checkoutView with formDelivery", () => {
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
        "Test Main Address"
      );
      userEvent.type(
        screen.getByRole("textbox", { name: "Address 2" }),
        "Test address complement"
      );
      userEvent.type(
        screen.getByRole("textbox", { name: "City" }),
        "Test City"
      );
      userEvent.type(screen.getByRole("textbox", { name: "State" }), "Test State");
      userEvent.type(screen.getByRole("textbox", { name: "Zip Code" }), "1234");

      expect(screen.queryByText("Address 1: Test main address")).toBeInTheDocument();
      expect(screen.queryByText(/Address 2: Test address complement/i)).toBeInTheDocument();

      userEvent.click(screen.getByRole("button", { name: "Next" }));

      await waitFor(() => {
        expect(mockHandleNext).toBeCalled();
      });
      expect(mockDispatch).toBeCalledWith({
        payload: {
          address1: "Test main address",
          address2: "Test address complement",
          city: "Test City",
          state: "Test State",
          zipCode: "1234",
        },
        type: "SET_ADDRESS",
      });
    });

    it("click on previous", async () => {
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
        "Test Main Address"
      );
      userEvent.type(
        screen.getByRole("textbox", { name: "Address 2" }),
        "Test address complement"
      );
      userEvent.type(
        screen.getByRole("textbox", { name: "City" }),
        "Test City"
      );
      userEvent.type(screen.getByRole("textbox", { name: "State" }), "Test State");
      userEvent.type(screen.getByRole("textbox", { name: "Zip Code" }), "1234");

      // expect(screen.queryByText("Address 1: Test main address")).toBeInTheDocument();
      // expect(screen.queryByText(/Address 2: Test address complement/i)).toBeInTheDocument();

      userEvent.click(screen.getByRole("button", { name: "Previous" }));

      await waitFor(() => {
        expect(mockHandleBack).toBeCalled();
      });
     
    });

    it("click on previous", async () => {
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
        "Test Main Address"
      );
      userEvent.type(
        screen.getByRole("textbox", { name: "Address 2" }),
        "Test address complement"
      );
      userEvent.type(
        screen.getByRole("textbox", { name: "City" }),
        "Test City"
      );
      userEvent.type(screen.getByRole("textbox", { name: "State" }), "Test State");
      userEvent.type(screen.getByRole("textbox", { name: "Zip Code" }), "1234");

      // userEvent.click(screen.getByRole("button", { name: "Previous" }));

      await waitFor(() => {
        expect(screen.queryByText("Address 1: Test main address")).toBeInTheDocument();
        expect(screen.queryByText(/Address 2: Test address complement/i)).toBeInTheDocument();
        expect(screen.queryByText("City: Test City")).toBeInTheDocument();
        expect(screen.queryByText(/State: Test State/i)).toBeInTheDocument();
        expect(screen.queryByText("Zip Code: 1234")).toBeInTheDocument();
      });
     
    });


  });
});


