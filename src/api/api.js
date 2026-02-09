import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getTotalSales = async (table, kpi_metric) => {
  const res = await api.get("/total-sales", {
    params: { table, kpi_metric },
  });
  return res.data;
};


export const getSplitData = async ({
  table,
  kpi_metric,
  split_col,
  filters = {},
}) => {
  const res = await api.post("/split-data", {
    table,
    kpi_metric,
    split_col,
    filters,
  });
  return res.data;
};

export default api;
