import './items.scss'

const Items = () => {
  const items = { key1: 150, key2: 100, key3: 50 };

  const total = Object.values(items).reduce((sum, v) => sum + v, 0);

  return (
    <div className="items">
      <div className="aligner">
        {Object.entries(items).map(([key, value]) => {
          const percentage = (value / total) * 100;
          return (
            <div className="item" key={key}>
                <div className="details">
                    <div className="label">{key}</div>
                    <div className="value">{value}</div>
                </div>
                
                <div className="bar">
                    <div
                    className="bar-fill"
                    style={{ width: `${percentage}%` }}
                    />
                </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Items;
