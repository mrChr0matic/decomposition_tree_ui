import { useState } from "react";
import "./controls.scss";

const Controls = () => {
  const dimensions = [
    "year",
    "month",
    "payment_type",
    "vendor_id",
    "time bucket",
    "day"
  ];

  const [selected, setSelected] = useState("");

  const handleSelect = (e) => {
    const value = e.target.value;
    setSelected(value);
  };

  return (
    <div className="controls">
      <div className="box">
        <div className="reset-button">Reset Tree</div>

        <div className="dimension-picker">
          <select
            value={selected}
            className="dim-dropdown"
            onChange={handleSelect}
          >
            <option value="">Select Dimension</option>
            {dimensions.map((dimension) => (
              <option key={dimension} value={dimension}>
                {dimension}
              </option>
            ))}
          </select>
        </div>

        <div className="query-button">Next</div>
      </div>
    </div>
  );
};

export default Controls;