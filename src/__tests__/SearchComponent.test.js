import { render, screen } from "@testing-library/react";
import Search from "../Components/Search/Search";

test("Render Search input field with a placeholder", () => {
  render(<Search filterOptions={{}} setFilterOptions={() => {}} />);
  const inputElement = screen.getByPlaceholderText("Search keyword");
  expect(inputElement).toBeInTheDocument();
});
