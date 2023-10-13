import { useCallback, useContext, useEffect, useState } from "react";
import Search from "../Components/Search";
import Chart from "../Components/Chart";

//utility
import { fetchChartData } from "../Services/ChartDataService";

//style
import "./OrgChart.css";

//dnd library
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

//context
import chartDataContext from "../Context/ChartDataContext";
import FilterByTeam from "../Components/FilterByTeam";
import ListItems from "../Components/ListItems";

function OrgChart() {
  const { chartDataContextValue } = useContext(chartDataContext);

  const [chartData, setChartData] = useState(chartDataContextValue);
  const [filterOptions, setFilterOptions] = useState({
    searchInput: "",
    filterByTeam: "all",
  });

  const getChartData = async () => {
    const data = await fetchChartData();
    setChartData(data);
  };

  useEffect(() => {
    getChartData();
  }, []);

  const isMatching = useCallback(
    (user) => {
      const regex = new RegExp(filterOptions.searchInput, "i");
      return (
        regex.test(user.name) ||
        regex.test(user.designation) ||
        regex.test(user.team) ||
        regex.test(user.id)
      );
    },
    [filterOptions.searchInput],
  );

  const handleDropdownChange = (e) => {
    const filterOptionsCopy = { ...filterOptions };
    filterOptionsCopy.filterByTeam = e.target.value;
    setFilterOptions(filterOptionsCopy);
  };

  useEffect(() => {
    if (filterOptions.filterByTeam !== "all") {
      let fileteredItems = chartDataContextValue.filter(
        (user) => user.team === filterOptions.filterByTeam,
      );

      //apply search filter (if any) in filtered teams
      if (filterOptions.searchInput.length > 2) {
        fileteredItems = fileteredItems.filter((user) => isMatching(user));
      }

      setChartData(fileteredItems);
      return;
    }

    //apply search in all items
    if (filterOptions.searchInput.length > 2) {
      const searchedItems = chartDataContextValue.filter((user) =>
        isMatching(user),
      );
      setChartData(searchedItems);
    } else {
      setChartData(chartDataContextValue);
    }
  }, [filterOptions, chartDataContextValue, isMatching]);

  return chartDataContextValue?.length ? (
    <div className="page-wrapper">
      <div className="left-pane">
        {/* search option*/}
        <Search
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
        />

        {/* dropdown to filter employees by team */}
        <FilterByTeam
          team={filterOptions.filterByTeam}
          handleChange={handleDropdownChange}
        />

        {/* renders the list of employees */}
        <ListItems data={chartData} />
      </div>

      <div className="right-pane">
        <DndProvider backend={HTML5Backend}>
          <Chart teamToFilter={filterOptions.filterByTeam} />
        </DndProvider>
      </div>
    </div>
  ) : (
    <div>fetching api...</div>
  );
}

export default OrgChart;
