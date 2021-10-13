import { useState, useEffect } from 'react';

import Header from './components/Header';
import OpenFiltersButton from './components/OpenFiltersButton';
import ContainerFilters from './components/ContainerFilters';
import Transactions from './components/Transactions';
import Resume from './components/Resume';
import Backdrop from './components/Backdrop';

import urlTest from './test';


function App() {
  const [transactions, setTransactions] = useState([]);
  const [refreshScreen, setRefreshScreen] = useState(false);
  const [editTransaction, setEditTransaction] = useState();
  const [closeFilter, setCloseFilter] = useState(false);
  const [modal, setModal] = useState(false);

  const [typeBackdrop, setTypeBackdrop] = useState(false);
  const order = true;

  useEffect(() => {
    loadTransactions();
  }, [refreshScreen]);

  async function loadTransactions() {
    try {
      const response = await fetch(`${urlTest}`, {
        method: 'GET'
      });
      const data = await response.json();

      setTransactions(data);
    } catch (error) {
      alert(error);
    }
  }

  function handleCloseModal() {
    setModal(false);
    setEditTransaction(null);
  }

  return (
    <div className="App">
      <Header />
      <main className="flex-row">
        <div className="left">
          <OpenFiltersButton
            setCloseFilter={setCloseFilter}
            closeFilter={closeFilter}
          />
          {closeFilter && <ContainerFilters
            transactions={transactions}
          />}
          <Transactions
            transactions={transactions}
            setTypeBackdrop={setTypeBackdrop}
            setModal={setModal}
            modal={modal}
            setEditTransaction={setEditTransaction}
            editTransaction={editTransaction}
            order={order}
          />
        </div>
        <div className="right">
          <Resume
            modal={modal}
            setModal={setModal}
            setTypeBackdrop={setTypeBackdrop}
            transactions={transactions}
            setRefreshScreen={setRefreshScreen}
            refreshScreen={refreshScreen}
          />
        </div>
      </main>
      {modal && <Backdrop
        typeBackdrop={typeBackdrop}
        setModal={setModal}
        modal={modal}
        refreshScreen={refreshScreen}
        setRefreshScreen={setRefreshScreen}
        handleCloseModal={handleCloseModal}
        editTransaction={editTransaction}
      />}
    </div>
  );
}

export default App;
