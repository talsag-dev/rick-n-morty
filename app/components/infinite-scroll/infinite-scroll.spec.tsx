import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { InfiniteScroll } from "./infinite-scroll";
import { useSearchParams } from "next/navigation";

// Mock useSearchParams
jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(),
}));

jest
  .spyOn(URLSearchParams.prototype, "get")
  .mockImplementation((key) => `${key}`);

describe("InfiniteScroll", () => {
  it("should render empty list", () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn((key) => (key === "name" ? "" : null)),
    });

    render(<InfiniteScroll initialData={[]} initialSearchName="" />);

    expect(screen.queryByText(/Loading more.../)).not.toBeInTheDocument();
    expect(screen.getByText(/No more data to load./)).toBeInTheDocument();
  });
});
