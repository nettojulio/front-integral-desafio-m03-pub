// import '../../index.css';
import filter from '../../assets/filter.svg';

function OpenFiltersButton({ closeFilter, setCloseFilter }) {
    return (
        <button className="open-filters-button flex-row font-lato" onClick={() => setCloseFilter(!closeFilter)}>
            <>
                <img src={filter} alt="filtro" />
                <p>Filtrar</p>
            </>
        </button>
    )
}

export default OpenFiltersButton;