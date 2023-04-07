import { render, screen, waitFor } from "@testing-library/react";
import IndexPage from "dh-marvel/pages/index.page";
import Index from "dh-marvel/pages/index.page";

describe("IndexPage", () => {
  describe("when rendering default", () => {
    it("should render the title", () => {
      render(<Index comics={[]} pages={0} />);
      const title = screen.getByRole("heading", { Name: "All Comics" });

      expect(title).toBeInTheDocument();
    });
  });
});
