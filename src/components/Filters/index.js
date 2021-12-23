import { useEffect, useState } from "react";
import filter from "../../assets/filter.svg";
import {
  getOnlySelectedCategories,
  getOnlySelectedWeekDay,
  mergeNewAndOldCategories,
} from "../../utils/utilities";
import weekDayFilter from "../../utils/weekDayFilter";
import Chip from "./Chip";
import "./styles.css";

function Filters({
  transactions,
  handleOrderTransactions,
  refreshScreen,
  setRefreshScreen,
}) {
  const [open, setOpen] = useState(false);
  const [weekDays, setWeekDays] = useState(weekDayFilter);
  const [categories, setCategories] = useState([]);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);
  const [localeTransactionsInFilter, setLocaleTransactionsInFilter] = useState(
    []
  );

  useEffect(() => {
    populateCategoriesInFilters();
    // eslint-disable-next-line
  }, [localeTransactionsInFilter]);

  useEffect(() => {
    loadLocaleTransactionsInFilter();
  }, [transactions]);

  async function loadLocaleTransactionsInFilter() {
    try {
      const response = await fetch("https://dindin-api.herokuapp.com/transactions", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setLocaleTransactionsInFilter(data);
    } catch (error) {
      alert(error.message);
    }
  }

  function populateCategoriesInFilters() {
    const allCategories = mergeNewAndOldCategories(
      localeTransactionsInFilter,
      categories
    );
    setCategories(allCategories);
  }

  function applyAllFilters(
    localTransactions,
    selectedDays,
    selectedCategories
  ) {
    const filteredTransactions = [];

    for (const transaction of localTransactions) {
      if (minValue && Number(transaction.value) < minValue) {
        continue;
      }

      if (maxValue && Number(transaction.value) > maxValue) {
        continue;
      }

      if (selectedDays.length > 0 && selectedCategories.length > 0) {
        if (
          selectedDays.includes(transaction.week_day.toLowerCase()) &&
          selectedCategories.includes(transaction.category.toLowerCase())
        ) {
          filteredTransactions.push(transaction);
        }
        continue;
      }

      if (
        selectedDays.length > 0 &&
        selectedDays.includes(transaction.week_day.toLowerCase())
      ) {
        filteredTransactions.push(transaction);
        continue;
      }

      if (
        selectedCategories.length > 0 &&
        selectedCategories.includes(transaction.category.toLowerCase())
      ) {
        filteredTransactions.push(transaction);
        continue;
      }
    }
    const transactionsIdAux = [];
    const transactionsRemoveDuplicatedItems = [];

    for (const transaction of filteredTransactions) {
      if (transactionsIdAux.indexOf(transaction.id) === -1) {
        transactionsIdAux.push(transaction.id);
        transactionsRemoveDuplicatedItems.push(transaction);
      }
    }
    handleOrderTransactions(transactionsRemoveDuplicatedItems);
  }

  function applyFiltersOnlyMinAndMax(localTransactions) {
    const transactionsFilteredByValue = [];

    for (const transaction of localTransactions) {
      if (minValue && Number(transaction.value) < minValue) {
        continue;
      }

      if (maxValue && Number(transaction.value) > maxValue) {
        continue;
      }

      if (minValue && minValue <= transaction.value) {
        transactionsFilteredByValue.push(transaction);
      }

      if (maxValue && maxValue >= transaction.value) {
        transactionsFilteredByValue.push(transaction);
      }
    }

    const idTransactions = [];
    const transactionsRemovedDuplicateds = [];

    for (const transaction of transactionsFilteredByValue) {
      if (idTransactions.indexOf(transaction.id) === -1) {
        idTransactions.push(transaction.id);
        transactionsRemovedDuplicateds.push(transaction);
      }
    }
    handleOrderTransactions(transactionsRemovedDuplicateds);
  }

  function handleSelectedWeekDayFilter(weekDay) {
    const localWeekDays = [...weekDays];
    const day = localWeekDays.find((day) => day.name === weekDay);
    day.selected = !day.selected;

    setWeekDays(localWeekDays);
  }

  function handleSelectedCategoryFilter(currentCategory) {
    const localCategories = [...categories];
    const category = localCategories.find(
      (category) => category.name === currentCategory
    );
    category.selected = !category.selected;

    setCategories(localCategories);
  }

  function handleClearFilters() {
    const localWeekDays = [...weekDays];
    const localCategories = [...categories];

    for (const weekDay of localWeekDays) {
      weekDay.selected = false;
    }

    for (const category of localCategories) {
      category.selected = false;
    }

    setWeekDays(weekDayFilter);
    setCategories(localCategories);
    setMaxValue(0);
    setMinValue(0);
    setRefreshScreen(!refreshScreen);
  }

  function handleApplyFilters() {
    const selectedDays = getOnlySelectedWeekDay(weekDays);
    const selectedCategories = getOnlySelectedCategories(categories);
    const localTransactions = [...localeTransactionsInFilter];

    if (
      !selectedDays.length &&
      !selectedCategories.length &&
      !minValue &&
      !maxValue
    ) {
      setRefreshScreen(!refreshScreen);
      return;
    }

    if (selectedDays.length === 0 && selectedCategories.length === 0) {
      applyFiltersOnlyMinAndMax(localTransactions);
      return;
    }
    applyAllFilters(localTransactions, selectedDays, selectedCategories);
  }

  return (
    <div>
      <button
        className="open-filters-button flex-row font-lato ai-center"
        onClick={() => setOpen(!open)}
      >
        <>
          <img src={filter} alt="filtro" />
          <span>Filtrar</span>
        </>
      </button>
      {open && (
        <div className="container-filters flex-row ai-center">
          <div className="days-of-week flex-column">
            <h2 className="filters-titles font-rubik">Dia da Semana</h2>
            <div className="days-of-week-filters flex-column">
              {weekDays.map((day) => (
                <Chip
                  key={day.name}
                  title={day.name}
                  selected={day.selected}
                  handleSelectChip={handleSelectedWeekDayFilter}
                />
              ))}
            </div>
          </div>
          <div className="split" />
          <div className="categories flex-column">
            <h2 className="filters-titles font-rubik">Categoria</h2>
            <div className="categories-filters flex-column">
              {categories.map((category) => (
                <Chip
                  key={category.name}
                  title={category.name}
                  selected={category.selected}
                  handleSelectChip={handleSelectedCategoryFilter}
                />
              ))}
            </div>
          </div>
          <div className="split" />
          <div className="values">
            <h2 className="filters-titles font-rubik">Valor</h2>
            <div className="filter-values flex-column">
              <label htmlFor="min-value">Min</label>
              <input
                type="number"
                min="0"
                id="min-value"
                value={minValue}
                onChange={(e) => setMinValue(e.target.valueAsNumber)}
              />
              <label htmlFor="max-value">Max</label>
              <input
                type="number"
                min="0"
                id="max-value"
                value={maxValue}
                onChange={(e) => setMaxValue(e.target.valueAsNumber)}
              />
              <div className="btn-filters flex-row jc-center ai-center">
                <button
                  className="btn-clear-filters flex-row jc-center ai-center"
                  onClick={() => handleClearFilters()}
                >
                  Limpar Filtros
                </button>
                <button
                  className="btn-apply-filters flex-row jc-center ai-center"
                  onClick={() => handleApplyFilters()}
                >
                  Aplicar Filtros
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Filters;
