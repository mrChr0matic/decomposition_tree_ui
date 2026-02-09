import './items.scss'
import { useTree } from "../../context/TreeContext";

const Items = () => {
  const { levels } = useTree();

  return (
    <div className="tree-container">
      {console.log(levels)}
      {levels.map((level, idx) => {

        const total = level.items.reduce((s,i)=>s+i.value,0);

        return (
          <div className="level" key={idx}>
            <h4>{level.dim}</h4>

            {level.items.map(item => {
              const pct = (item.value/total)*100;

              return (
                <div className="item" key={item.node_name}>
                  <div className="content">
                    <div>
                      <span>{item.node_name} </span>
                      <span className="percentage">{pct.toFixed(2)}%</span>
                    </div>
                    <div>{Number(item.value,2).toFixed(2)}</div>
                  </div>

                  <div className="bar">
                    <div
                      className="bar-fill"
                      style={{width:`${pct}%`}}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Items;
