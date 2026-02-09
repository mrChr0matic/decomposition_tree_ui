import { useState } from "react";
import "./controls.scss";
import { useTree } from "../../context/TreeContext";

const Controls = () => {

  const {
    availableDims,
    fetchSplit,
    resetTree,
    levels,
    drillDown,
    selectedValue,
    setSelectedValue
  } = useTree();

  const [selectedDim, setSelectedDim] =
    useState("");

  const latestItems =
    levels.length > 0
      ? levels[levels.length - 1].items
      : [];

  const handleNext = async () => {

    if (!selectedDim) return;

    let newPath = null;

    // Drill FIRST if needed
    if (
      levels.length > 1 &&
      selectedValue
    ) {
      newPath = drillDown();
    }

    // Then fetch
    await fetchSplit(
      selectedDim,
      newPath
    );

    setSelectedDim("");
  };

  return (
    <div className="controls">
      <div className="box">

        <div
          className="reset-button"
          onClick={resetTree}
        >
          Reset Tree
        </div>

        {/* VALUE PICKER (not at root) */}
        {levels.length > 1 && (
          <select
            value={selectedValue}
            className="dim-dropdown"
            onChange={(e) =>
              setSelectedValue(
                e.target.value
              )
            }
          >
            <option value="">
              Select Value
            </option>

            {latestItems.map(item => (
              <option
                key={item.node_name}
                value={item.node_name}
              >
                {item.node_name}
                {" ("}
                {item.value.toLocaleString()}
                {")"}
              </option>
            ))}
          </select>
        )}

        {/* DIMENSION PICKER */}
        <select
          value={selectedDim}
          className="dim-dropdown"
          onChange={(e) =>
            setSelectedDim(
              e.target.value
            )
          }
        >
          <option value="">
            Select Dimension
          </option>

          {availableDims.map(d => (
            <option
              key={d}
              value={d}
            >
              {d}
            </option>
          ))}
        </select>

        <div
          className="query-button"
          onClick={handleNext}
        >
          Next
        </div>

      </div>
    </div>
  );
};

export default Controls;
