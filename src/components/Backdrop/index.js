import CloseIcon from '../../assets/close.svg';
import { useEffect, useState } from 'react';
import { dayOfWeek } from '../../utils/dias/dia'
import urlTeste from '../../test/index';

const defaultInput = {
  value: '',
  category: '',
  date: '',
  description: ''
}

function Backdrop({ typeBackdrop, setModal, modal, refreshScreen, setRefreshScreen, handleCloseModal, editTransaction }) {

  const [selectedTransaction, setSelectedTransaction] = useState('debit');
  const [currentInput, setCurrentInput] = useState(defaultInput);

  useEffect(() => {
    return () => {
      setCurrentInput(defaultInput);
    }
  }, [modal])

  useEffect(() => {
    if (editTransaction) {
      const formatEditItem = {
        value: editTransaction.value,
        category: editTransaction.category,
        description: editTransaction.description,
        type: editTransaction.type,
        date: +new Date(editTransaction.date)
      };

      setSelectedTransaction(formatEditItem.type);
      setCurrentInput({ ...formatEditItem });
    }

  }, [editTransaction]);

  function handleOnChange({ target }) {
    setCurrentInput({ ...currentInput, [target.name]: target.value });
  }

  async function handleOnSubmit(event) {
    event.preventDefault();

    try {
      if (!currentInput.description || !currentInput.value || !currentInput.category || !selectedTransaction) {
        return;
      }

      const data = {
        date: currentInput.date,
        week_day: dayOfWeek(currentInput.date),
        description: currentInput.description,
        value: parseFloat(currentInput.value),
        category: currentInput.category,
        type: selectedTransaction
      }

      const methodType = editTransaction ? 'PUT' : 'POST';
      const url = editTransaction ? `${urlTeste}/${editTransaction.id}` : `${urlTeste}`;

      const response = await fetch(url, {
        method: methodType,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      await response.json();
      setModal(false);
      setRefreshScreen(!refreshScreen);
    } catch (error) {
    }
  }

  function clearAll() {
    handleCloseModal();
    setModal(!modal);
    setCurrentInput(defaultInput);
  }

  return (
    <div className="backdrop flex-column">
      <div className="modal-container flex-column">
        <h2 className="font-rubik">{typeBackdrop ? 'Editar Registro' : 'Adicionar Registro'}</h2>
        <img
          className="close-icon"
          src={CloseIcon}
          alt="Close icon"
          onClick={() => clearAll()}
        />
        <div className="container-buttons flex-row">
          <button
            id="credit-button"
            className={`btn-new-transaction font-rubik flex-row ${selectedTransaction === 'credit' && 'credit'}`}
            onClick={() => setSelectedTransaction('credit')}
          >
            Entrada
          </button>
          <button
            id="debit-button"
            className={`btn-new-transaction font-rubik flex-row ${selectedTransaction === 'debit' && 'debit'}`}
            onClick={() => setSelectedTransaction('debit')}
          >
            Saída
          </button>
        </div>

        <form
          className="flex-column"
          onSubmit={handleOnSubmit}
        >
          <div className="labels flex-column">
            <label className="font-rubik">Valor</label>
            <input
              onChange={(event) => handleOnChange(event)}
              value={currentInput.value}
              name="value"
              type="number"
              min="0"
              required
            />
          </div>
          <div className="labels flex-column">
            <label className="font-rubik">Categoria</label>
            <input
              onChange={(event) => handleOnChange(event)}
              value={currentInput.category}
              name="category"
              required
            />
          </div>
          <div className="labels flex-column">
            <label className="font-rubik">Data</label>
            <input
              onChange={(event) => handleOnChange(event)}
              value={currentInput.date}
              type="datetime-local"
              name="date"
              required
            />
          </div>
          <div className="labels flex-column">
            <label className="font-rubik">Descrição</label>
            <input
              onChange={(event) => handleOnChange(event)}
              name="description"
              required
              value={currentInput.description}
            />
          </div>
          <div className="container-btn-insert flex-row">
            <button type="submit" className='btn-insert font-rubik'>Confirmar</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Backdrop;