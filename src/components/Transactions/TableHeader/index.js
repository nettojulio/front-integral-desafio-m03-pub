import { useEffect, useState } from "react";
import ArrowDown from "../../../assets/arrow-down.svg";
import ArrowUp from "../../../assets/arrow-up.svg";
import { orderColumnAsc, orderColumnDesc } from "../../../utils/utilities";
import "./styles.css";

function TableHeader({ transactions, handleOrderTransactions }) {
  const [filter, setFilter] = useState("date");
  const [order, setOrder] = useState("asc");

  useEffect(() => {
    if (order === "desc") {
      orderAllTransactionsByDesc();
      return;
    }
    orderAllTransactionsByAsc();
    // eslint-disable-next-line
  }, [filter, order]);

  function handleChangeFilter(type) {
    if (filter === type) {
      setOrder(order === "asc" ? "desc" : "asc");
      return;
    }
    setFilter(type);
  }

  function orderAllTransactionsByAsc() {
    const localTransactions = [...transactions];
    localTransactions.sort((a, b) => orderColumnAsc(a, b, filter));
    handleOrderTransactions(localTransactions);
  }

  function orderAllTransactionsByDesc() {
    const localTransactions = [...transactions];
    localTransactions.sort((a, b) => orderColumnDesc(a, b, filter));
    handleOrderTransactions(localTransactions);
  }

  return (
    <div className={"table-head flex-row jc-space-between ai-center"}>
      <div
        id="date"
        className="column-title jc-center ai-center flex-row cursor-pointer"
        onClick={() => handleChangeFilter("date")}
      >
        <span>Data</span>
        {filter === "date" && (
          <img src={order === "asc" ? ArrowUp : ArrowDown} alt="apply filter" />
        )}
      </div>
      <div
        id="week-day"
        className="column-title jc-center ai-center flex-row cursor-pointer"
        onClick={() => handleChangeFilter("weekDay")}
      >
        <span>Dia da semana</span>
        {filter === "weekDay" && (
          <img src={order === "asc" ? ArrowUp : ArrowDown} alt="apply filter" />
        )}
      </div>
      <div className="column-title jc-center ai-center flex-row">
        <span>Descrição</span>
      </div>
      <div className="column-title jc-center ai-center flex-row">
        <span>Categoria</span>
      </div>
      <div
        id="value"
        className="column-title jc-center ai-center flex-row cursor-pointer"
        onClick={() => handleChangeFilter("value")}
      >
        <span>Valor</span>
        {filter === "value" && (
          <img src={order === "asc" ? ArrowUp : ArrowDown} alt="apply filter" />
        )}
      </div>
      <div className="column-title jc-center ai-center flex-row"></div>
    </div>
  );
}

export default TableHeader;
