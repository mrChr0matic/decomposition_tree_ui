import {
  createContext,
  useContext,
  useState,
  useEffect
} from "react";
import {
  getSplitData,
  getTotalSales
} from "../api/api";

const TreeContext = createContext();

const ALL_DIMS = [
  "year",
  "month",
  "payment_type",
  "vendor_id",
  "time_bucket",
  "day",
  "Region",
  "Country"
];

export const TreeProvider = ({ children }) => {

  const [kpi, setKPI] = useState("");

  const [path, setPath] = useState([]);
  const [availableDims, setAvailableDims] = useState(ALL_DIMS);

  const [levels, setLevels] = useState([]);
  const [currentDim, setCurrentDim] = useState("");

  const [loading, setLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  useEffect(() => {
    if (kpi) fetchRoot();
  }, [kpi]);

  const fetchRoot = async () => {
    const res = await getTotalSales(
      "taxi_gold",
      kpi
    );

    setLevels([
      {
        dim: "Total",
        items: [
          {
            node_name: "Total",
            value: res.total
          }
        ]
      }
    ]);

    setPath([]);
    setAvailableDims(ALL_DIMS);
  };

  // --- BUILD FILTERS ---
  const buildFilters = (p) => {
    const f = {};
    p.forEach(x => {
      f[x.dim] = x.value;
    });
    return f;
  };

  // --- DRILL DOWN ---
  const drillDown = () => {
    if (!selectedValue) return path;

    const newPath = [
      ...path,
      { dim: currentDim, value: selectedValue }
    ];

    setPath(newPath);

    setSelectedValue("");

    return newPath;
  };

  // --- FETCH SPLIT ---
  const fetchSplit = async (
    dim,
    overridePath = null
  ) => {

    if (!kpi || !dim) return;

    const activePath =
      overridePath ?? path;

    setLoading(true);

    const data = await getSplitData({
      table: "taxi_gold",
      kpi_metric: kpi,
      split_col: dim,
      filters: buildFilters(activePath)
    });

    setLevels(prev => [
      ...prev,
      { dim, items: data }
    ]);

    setCurrentDim(dim);

    setAvailableDims(prev =>
      prev.filter(d => d !== dim)
    );

    setLoading(false);
  };


  const resetTree = () => {
    setPath([]);
    setAvailableDims(ALL_DIMS);
    setLevels([]);
    setSelectedValue("");
  };

  return (
    <TreeContext.Provider value={{
      kpi, setKPI,

      levels,
      loading,

      availableDims,

      selectedValue,
      setSelectedValue,

      drillDown,
      fetchSplit,
      resetTree
    }}>
      {children}
    </TreeContext.Provider>
  );
};

export const useTree = () => useContext(TreeContext);
