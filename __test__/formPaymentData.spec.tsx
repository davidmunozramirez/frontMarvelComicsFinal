import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { rest, server } from "dh-marvel/test/server";
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

    beforeAll(() => {
      server.use(
        rest.post('/api/checkout', (req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json({
              success: true,
              message: 'Your response message.',
            })
          );
        })
      );
    });

    it("should hit the dispatch", async () => {
      const mockHandleNext = jest.fn();
      const mockHandleBack = jest.fn();
      render(
        <OrderProvider>
          <FormPaymentData
            activeStep={2}
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
        screen.getByRole("textbox", { name: "Expiration Date (MM/YY)" }),
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

  describe("check some texts", () => {
    it("should show texts at the buttom", async () => {
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

      // const getByTextContent = (text: any) => {
      //   // Passing function to `getByText`
      //   return screen.getByText((content, element) => {
      //       const hasText = (element: any) => element.textContent === text
      //       const elementHasText = hasText(element)
      //       const childrenDontHaveText = Array.from(element?.children || []).every(child => !hasText(child))
      //       return elementHasText && childrenDontHaveText
      //   })
      // }

      // const nameOnCardInput = screen.getByRole("textbox", { name: "Name On Card" });
      // fireEvent.change(nameOnCardInput, { target: {value: "t"} } )

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

      userEvent.click(screen.getByRole("button", { name: "Finish" }));

      // const buttonN = screen.getByRole("button", { name: "Finish" });
      // fireEvent.click(buttonN);

      const text1 = screen.queryByText("Validate your payment data");
      // const text2 = screen.queryByText("Name: t");
      // const errorMessage = screen.getByText(/required/i);
      // const errorMessage = screen.getByTestId("requiredNameOnCard");
      // const errorMessage = getByTextContent("This field is required");
      // const errorMessage = document.getElementsByClassName("css-zc7vzp-MuiFormHelperText-root");

      // await waitFor(() => {
      //   expect(mockHandleNext).toBeCalled();
      // });
      await waitFor(() => {
        // console.log('errorMessage', errorMessage);
        
        expect(text1).toBeInTheDocument();
        // expect(screen.queryByText("Name:t")).toBeInTheDocument();
      });
      await waitFor(() => {  
        expect(screen.queryByText("Name: TEST CREDIT CARD")).toBeInTheDocument();
        expect(screen.queryByText(/Number:/i)).toBeInTheDocument();
        expect(screen.queryByText(/3456/i)).toBeInTheDocument();
        expect(screen.queryByText(/Expiration date:/i)).toBeInTheDocument();
        expect(screen.queryByText(/01/i)).toBeInTheDocument();
        expect(screen.queryByText(/31/i)).toBeInTheDocument();
        expect(screen.queryByText("CVC: 123")).toBeInTheDocument();
        expect(screen.queryByText(/The card data is not valid/i)).toBeInTheDocument();
      });
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

    it("should show required word", async () => {
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

      // const getByTextContent = (text: any) => {
      //   // Passing function to `getByText`
      //   return screen.getByText((content, element) => {
      //       const hasText = (element: any) => element.textContent === text
      //       const elementHasText = hasText(element)
      //       const childrenDontHaveText = Array.from(element?.children || []).every(child => !hasText(child))
      //       return elementHasText && childrenDontHaveText
      //   })
      // }

      const nameOnCardInput = screen.getByRole("textbox", { name: "Name On Card" });
      fireEvent.change(nameOnCardInput, { target: {value: ""} } )

      // userEvent.type(
      //   screen.getByRole("textbox", { name: "Name On Card" }),
      //     "TEST CREDIT CARD"
      // );
      userEvent.type(
        screen.getByTestId("password"),
        "1234567890123456"
      );
      userEvent.type(
        screen.getByRole("textbox", { name: "Expiration Date (MM/YY)" }),
        "01/31"
      );
      userEvent.type(screen.getByRole("textbox", { name: "CVC" }), "123");

      userEvent.click(screen.getByRole("button", { name: "Finish" }));

      // const buttonN = screen.getByRole("button", { name: "Finish" });
      // fireEvent.click(buttonN);

      const text1 = screen.queryByText("Validate your payment data");
      // const text2 = screen.queryByText("Name: t");
      // const errorMessage = screen.getByText(/required/i);
      // const errorMessage = screen.getByTestId("requiredNameOnCard");
      // const errorMessage = getByTextContent("This field is required");
      // const errorMessage = document.getElementsByClassName("css-zc7vzp-MuiFormHelperText-root");

      // await waitFor(() => {
      //   expect(mockHandleNext).toBeCalled();
      // });
      await waitFor(() => {
        expect(text1).toBeInTheDocument();
        expect(screen.queryByText(/required/i)).toBeInTheDocument();
      });
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

  describe("click on Back Button", () => {
    it("should go back", async () => {
      const mockHandleNext = jest.fn();
      const mockHandleBack = jest.fn();
      render(
        <OrderProvider>
          <FormPaymentData
            activeStep={2}
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
        screen.getByRole("textbox", { name: "Expiration Date (MM/YY)" }),
        "01/31"
      );
      userEvent.type(screen.getByRole("textbox", { name: "CVC" }), "123");

      userEvent.click(screen.getByRole("button", { name: "Previous" }));

      await waitFor(() => {
        expect(mockHandleBack).toBeCalled();
      });
      // await waitFor(() => {
      //   expect(screen.queryByText(/Validate your delivery data/i)).toBeInTheDocument();
      // });
      // expect(mockDispatch).toBeCalledWith({
      //   payload: {
      //     number: "1234567890123456",
      //     cvc: "123",
      //     expDate: "01/31",
      //     nameOnCard: "TEST CREDIT CARD",
      //   },
      //   type: "SET_CARD",
      // });
    });
  });


});
