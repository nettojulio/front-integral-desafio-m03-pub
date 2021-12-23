import { useState } from "react";
import garbage from "../../assets/garbage.svg";
import pencil from "../../assets/pencil.svg";
import {
  formatDate,
  formatDateWord,
  formatToMoney,
} from "../../utils/formatter";
import ConfirmDelete from "./ConfirmDelete";
import "./styles.css";
import TableHeader from "./TableHeader";

function Transactions({
  transactions,
  setCurrentTransaction,
  refreshScreen,
  setRefreshScreen,
  handleOrderTransactions,
}) {
  const [idItemDelete, setIdItemDelete] = useState(null);

  async function handleDeleteTransaction() {
    try {
      await fetch(`https://dindin-api.herokuapp.com/transactions/${idItemDelete}`, {
        method: "DELETE",
      });
      setIdItemDelete(null);
      setRefreshScreen(!refreshScreen);
    } catch (error) {
      alert(error.message);
    }
  }
  return (
    <div className="table">
      <TableHeader
        transactions={transactions}
        handleOrderTransactions={handleOrderTransactions}
      />
      <div className="table-body flex-column">
        {transactions.map((transaction) => (
          <div className="table-line flex-row jc-space-between ai-center" key={transaction.id}>
            <div className="line-items flex-row jc-center ai-center">
              {formatDate(transaction.date)}
            </div>
            <div className="line-items flex-row jc-center ai-center">
              {formatDateWord(transaction.week_day)}
            </div>
            <div className="line-items flex-row jc-center ai-center">{transaction.description}</div>
            <div className="line-items flex-row jc-center ai-center">{transaction.category}</div>
            <div
              className={`line-items flex-row jc-center ai-center ${
                transaction.type === "credit" ? "credit" : "debit"
              }-type`}
            >
              {formatToMoney(transaction.value)}
            </div>
            <div className="line-items flex-row jc-center ai-center">
              <img
                className="cursor-pointer"
                src={pencil}
                alt=""
                onClick={() => setCurrentTransaction(transaction)}
              />
              <img
                className="cursor-pointer"
                src={garbage}
                alt=""
                onClick={() => setIdItemDelete(transaction.id)}
              />
              <ConfirmDelete
                show={transaction.id === idItemDelete}
                setShow={() => setIdItemDelete(null)}
                message="Apagar Item?"
                handleConfirm={() => handleDeleteTransaction()}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Transactions;
