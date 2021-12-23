import { useEffect, useState } from "react";
import Backdrop from "../../components/Backdrop";
import Filters from "../../components/Filters/index";
import Header from "../../components/Header";
import Resume from "../../components/Resume";
import Transactions from "../../components/Transactions";
import "./styles.css";

function Main() {
  const [modal, setModal] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [currentTransaction, setCurrentTransaction] = useState(false);
  const [refreshScreen, setRefreshScreen] = useState(false);

  useEffect(() => {
    loadTransactions();
  }, [refreshScreen]);

  useEffect(() => {
    if (currentTransaction) {
      return setModal(true);
    }
  }, [currentTransaction]);

  useEffect(() => {
    if (!modal) {
      loadTransactions();
    }

    if (!modal && currentTransaction) {
      setCurrentTransaction(false);
    }
    // eslint-disable-next-line
  }, [modal]);

  async function loadTransactions() {
    try {
      const response = await fetch("https://dindin-api.herokuapp.com/transactions", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      alert(error.message);
    }
  }

  function handleOrderTransactions(newTransactions) {
    setTransactions(newTransactions);
  }

  return (
    <div>
      <Header />
      <main className="flex-row jc-center">
        <div className="left">
          <Filters
            transactions={transactions}
            handleOrderTransactions={handleOrderTransactions}
            refreshScreen={refreshScreen}
            setRefreshScreen={setRefreshScreen}
          />
          <Transactions
            transactions={transactions}
            setCurrentTransaction={setCurrentTransaction}
            refreshScreen={refreshScreen}
            setRefreshScreen={setRefreshScreen}
            handleOrderTransactions={handleOrderTransactions}
          />
        </div>
        <div className="right">
          <Resume setModal={setModal} transactions={transactions} />
        </div>
      </main>
      {modal && (
        <Backdrop
          setModal={setModal}
          modal={modal}
          currentTransaction={currentTransaction}
        />
      )}
    </div>
  );
}

export default Main;
