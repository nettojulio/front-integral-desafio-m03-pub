import { useState, useEffect } from 'react';
import { semana } from '../../utils/dias/semana';
import { categories } from '../../utils/filtros';
import Chip from './Chip';
import SplitBar from './SplitBar';
import ClearFiltersButton from './ClearFiltersButton';
import ApplyFiltersButton from './ApplyFiltersButton';

import urlTest from '../../test/index';

function ContainerFilters(transactions) {

  const [transactionsLocal, setTransactionsLocal] = useState([]);
  useEffect(() => {
    loadTransactions();
  }, [transactions]);

  async function loadTransactions() {
    try {
      const response = await fetch(`${urlTest}`, {
        method: 'GET'
      });
      const data = await response.json();
      categories(data);
      setTransactionsLocal(data);
    } catch (error) {
      alert(error);
    }
  }
  return (
    <div className="container-filters flex-row">
      <div className="days-of-week flex-column">
        <h2 className="filters-titles font-rubik">Dia da Semana</h2>
        <div className="days-of-week-filters flex-column">
          {semana.map((unit) => <Chip key={Math.random()} value={unit.dia} selected={unit.selected} />)}
        </div>
      </div>
      <SplitBar />
      <div className="categories flex-column">
        <h2 className="filters-titles font-rubik">Categoria</h2>
        <div className="categories-filters flex-column">
          {transactionsLocal.map((unit) => <Chip key={Math.random()} value={unit.category} selected={unit.selected} />)}
        </div>
      </div>
      <SplitBar />
      <div className="values">
        <h2 className="filters-titles font-rubik">Valor</h2>
        <div className="filter-values flex-column">
          <label htmlFor="min-value">Min</label>
          <input type="number" min="0" id="min-value" />
          <label htmlFor="max-value">Max</label>
          <input type="number" min="0" id="max-value" />
          <div className="btn-filters flex-row">
            <ClearFiltersButton />
            <ApplyFiltersButton />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContainerFilters;