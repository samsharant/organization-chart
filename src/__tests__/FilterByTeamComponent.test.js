import { fireEvent, render, screen } from "@testing-library/react";
import FilterByTeam from "../Components/FilterByTeam/FilterByTeam";

test("Filter dropdown has all 5 teams", async () => {
  render(<FilterByTeam team={"all"} handleChange={() => {}} />);
  const selectDropdown = screen.getByRole("combobox");
  fireEvent.mouseDown(selectDropdown);
  const menuItems = screen.getAllByRole("option");
  expect(menuItems).toHaveLength(5);
});

test("check options", async () => {
  render(<FilterByTeam team={"all"} handleChange={() => {}} />);
  const selectDropdown = screen.getByRole("combobox");
  fireEvent.mouseDown(selectDropdown);
  const menuItems = screen.getAllByRole("option");
  const menuItemsText = menuItems.map((item) => item.textContent);
  expect(menuItemsText).toEqual([
    "All",
    "Product",
    "Leadership",
    "Finance",
    "Business",
  ]);
});
