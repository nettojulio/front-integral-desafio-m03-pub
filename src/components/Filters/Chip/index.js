import add from "../../../assets/add.svg";
import close from "../../../assets/close-white.svg";
import "./styles.css";

function Chip({ title, selected, handleSelectChip }) {
  return (
    <div
      className={`container-chip cursor-pointer flex-row jc-space-between ai-center ${
        selected && "active"
      }`}
      onClick={() => handleSelectChip(title)}
    >
      <span className="font-rubik">{title}</span>
      <img
        className="icon-filter"
        src={selected ? close : add}
        alt="selector"
      />
    </div>
  );
}

export default Chip;
