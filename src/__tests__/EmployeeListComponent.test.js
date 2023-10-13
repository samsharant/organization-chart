import { render, screen, within } from "@testing-library/react";
import ListItems from "../Components/ListItems";
import mockData from "../MockData.json";

test("employee tile with valid name", () => {
  render(<ListItems data={mockData} />);
  const customTileElement = screen.getAllByTestId(/custom-tile/)[0];
  const view = within(customTileElement).getByTestId("name-container");
  expect(view).toBeInTheDocument();
  expect(view).toHaveTextContent(/.+/);
});

test("employee tile with valid additional-data", () => {
  render(<ListItems data={mockData} />);
  const customTileElement = screen.getAllByTestId(/custom-tile/)[0];
  const view = within(customTileElement).getByTestId(
    "additional-data-container",
  );
  expect(view).toBeInTheDocument();
  expect(view).toHaveTextContent(/.+/);
});

test("All the employee tile are rendered", () => {
  render(<ListItems data={mockData} />);
  const customTileElements = screen.getAllByTestId(/custom-tile/);
  expect(customTileElements.length).toBe(mockData.length);
});
