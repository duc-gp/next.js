import DummyA from "./DummyA";
import { render } from "@testing-library/react";

describe("Test DummyA", () => {
  it("this should render without error", () => {
    render(<DummyA />);
  });
});
