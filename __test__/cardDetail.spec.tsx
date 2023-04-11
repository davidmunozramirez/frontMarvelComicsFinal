import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  OrderProvider,
  OrderState,
} from "dh-marvel/features/formContext/OrderContext";
import useOrder from "dh-marvel/features/formContext/useOrder";
import { CardDetail } from "../components/carDetail/cardDetail";

describe("when rendering cardDetail", () => {
    it("should render some cardDetail texts", () => {
      const mockHandleNext = jest.fn();
      render(
        <>
          <CardDetail
            title={"Test Title"}
            image={"Test Image"}
            description={"Test Description"}
            price={4444}
            oldPrice={333}
            characters={["Test character 1 one", "Test character 2 two"]}
            stock={22}
            available={1}
            id={987654321}
          />
        </>
      );
      const text1 = screen.queryByText(/Current/i);
      const text2 = screen.queryByText(/Buy now/i);
      const buttonBuyNow = screen.getByRole('button', {name: "Buy Now"})
      const collapsibleDescription = screen.getByRole('button', {name: "Description"})
      // userEvent.click(screen.getByRole("button", { name: "Description" }));
      
      expect(text1).toBeInTheDocument();
      expect(text2).toBeInTheDocument();
      expect(buttonBuyNow).toBeInTheDocument();
      expect(collapsibleDescription).toBeInTheDocument();
    });

    it("without stock", () => {
        const mockHandleNext = jest.fn();
        render(
          <>
            <CardDetail
              title={"Test Title"}
              image={"Test Image"}
              description={"Test Description"}
              price={4444}
              oldPrice={333}
              characters={["Test character 1 one", "Test character 2 two"]}
              stock={0}
              available={1}
              id={987654321}
            />
          </>
        );
        const text1 = screen.queryByText(/Current/i);
        const text2 = screen.queryByText(/not stock available/i);
        // const buttonBuyNow = screen.getByRole('button', {name: "Buy Now"})
        // const collapsibleDescription = screen.getByRole('button', {name: "Description"})
        // userEvent.click(screen.getByRole("button", { name: "Description" }));
        
        expect(text1).toBeInTheDocument();
        expect(text2).toBeInTheDocument();
        // expect(buttonBuyNow).toBeInTheDocument();
        // expect(collapsibleDescription).toBeInTheDocument();
      });

})