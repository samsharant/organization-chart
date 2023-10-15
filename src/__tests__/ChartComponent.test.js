import React from "react";
import { render, screen } from "@testing-library/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Chart from "../Components/Chart/Chart";
import { teams } from "../constants";

test("Check the presence of chart layout", () => {
  render(
    <DndProvider backend={HTML5Backend}>
      <Chart teamToFilter={teams.all} />
    </DndProvider>,
  );

  // Select the chart wrapper element
  const chartWrapper = screen.getByTestId("chart-wrapper");
  expect(chartWrapper).toBeInTheDocument();
});

test("Check the presence of all three level containers", () => {
  render(
    <DndProvider backend={HTML5Backend}>
      <Chart teamToFilter={teams.all} />
    </DndProvider>,
  );

  // Select the first-level container within the chart wrapper
  const firstLevelContainer = screen.getByTestId("first-level-container");

  // Select the second-level container within the chart wrapper
  const secondLevelContainer = screen.getByTestId("second-level-container");

  // Select the third-level container within the chart wrapper
  const thirdLevelContainer = screen.getByTestId("third-level-container");

  // Assert that all three containers are in the document
  expect(firstLevelContainer).toBeInTheDocument();
  expect(secondLevelContainer).toBeInTheDocument();
  expect(thirdLevelContainer).toBeInTheDocument();
});
