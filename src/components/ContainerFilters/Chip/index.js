import add from '../../../assets/add.svg';
import close from '../../../assets/close-white.svg';

function Chip({ value, selected }) {
    return (
        <button className="container-chip flex-row" onClick={() => console.log({ selected })}>
            <p>{value}</p>
            <img className="icon-filter" src={selected ? close : add} alt="seletor" />
        </button>
    )
}

export default Chip;