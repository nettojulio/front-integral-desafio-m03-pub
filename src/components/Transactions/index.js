import TriangleUp from '../../assets/arrow-up.svg';
import TriangleDown from '../../assets/arrow-down.svg';
import { DeleteIcon } from './DeleteIcon';
import { EditIcon } from './EditIcon';
import { format } from 'date-fns';
import { useState, useEffect } from 'react';
import urlTest from '../../test';

function Transactions({ order, setModal, modal, setTypeBackdrop, editTransaction, setEditTransaction }) {

  const [transactionsLocal, setTransactionsLocal] = useState([]);
  useEffect(() => {
    loadTransactions();
  }, []);

  async function loadTransactions() {
    try {
      const response = await fetch(`${urlTest}`, {
        method: 'GET'
      });
      const data = await response.json();

      setTransactionsLocal(data);
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className="table">
      <div className={"table-head flex-row"}>
        <div
          id="date"
          className="column-title flex-row cursor-pointer"
        >
          <p>Data</p>
          <img src={order ? TriangleUp : TriangleDown} alt="triangle" />
        </div>
        <div
          id="week-day"
          className="column-title flex-row cursor-pointer"
        >
          <p>Dia da semana</p>
          <img src={order ? TriangleUp : TriangleDown} alt="triangle" />
        </div>
        <div className="column-title flex-row">
          <p>Descrição</p>
        </div>
        <div className="column-title flex-row">
          <p>Categoria</p>
        </div>
        <div
          id="value"
          className="column-title flex-row cursor-pointer"
        >
          <p>Valor</p>
          <img src={order ? TriangleUp : TriangleDown} alt="triangle" />
        </div>
        <div className="column-title flex-row"></div>
      </div>
      <div className="table-body flex-column">
        {transactionsLocal.map((transaction) => (
          <div className="table-line flex-row" key={transaction.id}>
            <p className="line-items flex-row">{format(new Date(transaction.date), 'dd/MM/yyyy')}</p>
            <p className="line-items flex-row">{transaction.week_day}</p>
            <p className="line-items flex-row">{transaction.description}</p>
            <p className="line-items flex-row">{transaction.category}</p>
            <p className={`line-items flex-row ${transaction.type}-type`}>{`${(transaction.value).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}`}</p>
            <div className="line-items flex-row">
              <EditIcon
                transaction={transaction}
                setModal={setModal}
                modal={modal}
                setTypeBackdrop={setTypeBackdrop}
                editTransaction={editTransaction}
                setEditTransaction={setEditTransaction}
              />
              <DeleteIcon
                transaction={transaction}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Transactions;