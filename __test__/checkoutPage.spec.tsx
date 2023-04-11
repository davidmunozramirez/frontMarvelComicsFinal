import {render} from "@testing-library/react";
import CheckoutComic from "dh-marvel/pages/checkout/[id].page";

describe('CheckoutComic', () => {
  it('should render correctly', () => {
    const { asFragment } = render(<CheckoutComic />);
    expect(asFragment()).toMatchSnapshot();
  })
})