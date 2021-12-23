import { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import CloseIcon from "../../assets/close.svg";
import { formatDate, formatWeekDay } from "../../utils/formatter";
import "./styles.css";

const defaultInput = {
  value: "",
  category: "",
  date: "",
  description: "",
};

function Backdrop({ setModal, modal, currentTransaction }) {
  const [selectedTransaction, setSelectedTransaction] = useState("debit");
  const [currentInput, setCurrentInput] = useState(defaultInput);

  useEffect(() => {
    if (modal && !currentTransaction) {
      setCurrentInput(defaultInput);
      return;
    }

    if (currentTransaction) {
      setSelectedTransaction(currentTransaction.type);

      setCurrentInput({
        date: formatDate(currentTransaction.date),
        category: currentTransaction.category,
        value: currentTransaction.value,
        description: currentTransaction.description,
      });
    }
  }, [currentTransaction, modal]);

  function handleOnChange({ target }) {
    setCurrentInput({ ...currentInput, [target.name]: target.value });
  }

  async function handleOnSubmit(event) {
    event.preventDefault();

    try {
      if (
        !currentInput.description ||
        !currentInput.value ||
        !currentInput.category ||
        !selectedTransaction
      ) {
        return;
      }

      const [day, month, year] = currentInput.date.split("/");
      const selectDate = new Date(`${month}/${day}/${year}`);

      const bodyForm = {
        date: selectDate,
        week_day: formatWeekDay(selectDate),
        description: currentInput.description,
        value: currentInput.value,
        category: currentInput.category,
        type: selectedTransaction,
      };

      const methodType = currentTransaction ? "PUT" : "POST";
      const url = currentTransaction
        ? `https://dindin-api.herokuapp.com/transactions/${currentTransaction.id}`
        : "https://dindin-api.herokuapp.com/transactions";

      const response = await fetch(url, {
        method: methodType,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyForm),
      });

      await response.json();
      setModal(false);
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="backdrop flex-column jc-center">
      <div className="modal-container flex-column ai-center">
        <h2 className="font-rubik">
          {currentTransaction ? "Editar Registro" : "Adicionar Registro"}
        </h2>
        <img
          className="close-icon cursor-pointer"
          src={CloseIcon}
          alt="Close icon"
          onClick={() => setModal(false)}
        />
        <div className="container-buttons flex-row">
          <button
            id="credit-button"
            className={`btn-new-transaction font-rubik flex-row jc-center ai-center ${
              selectedTransaction === "credit" && "credit"
            }`}
            onClick={() => setSelectedTransaction("credit")}
          >
            Entrada
          </button>
          <button
            id="debit-button"
            className={`btn-new-transaction font-rubik flex-row jc-center ai-center ${
              selectedTransaction === "debit" && "debit"
            }`}
            onClick={() => setSelectedTransaction("debit")}
          >
            Saída
          </button>
        </div>

        <form className="flex-column" onSubmit={handleOnSubmit}>
          <div className="labels flex-column">
            <label className="font-rubik">Valor</label>
            <input
              onChange={(event) => handleOnChange(event)}
              value={currentInput.value}
              type="number"
              name="value"
              required
              min="0"
            />
          </div>
          <div className="labels flex-column">
            <label className="font-rubik">Categoria</label>
            <input
              onChange={(event) => handleOnChange(event)}
              value={currentInput.category}
              type="text"
              name="category"
              required
            />
          </div>
          <div className="labels flex-column">
            <label className="font-rubik">Data</label>
            <InputMask
              mask="99/99/9999"
              maskPlaceholder="dd/mm/yy"
              onChange={(event) => handleOnChange(event)}
              value={currentInput.date}
              name="date"
              required
            />
          </div>
          <div className="labels flex-column">
            <label className="font-rubik">Descrição</label>
            <input
              onChange={(event) => handleOnChange(event)}
              value={currentInput.description}
              type="text"
              name="description"
              required
            />
          </div>
          <div className="container-btn-insert flex-row">
            <button type="submit" className="btn-insert font-rubik">
              Confirmar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Backdrop;
