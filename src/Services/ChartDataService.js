import axios from "axios";

export const fetchChartData = async () => {
  const response = await axios.get("/api/chartData").then((response) => {
    return response.data;
  });
  return response;
};
