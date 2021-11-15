import indicator from "../../../assets/indicator.svg";
import "./styles.css";

function ConfirmDelete({ show, setShow, message, handleConfirm }) {
  return (
    <div className="container-delete">
      {show && (
        <div>
          <img className="indicator" src={indicator} alt="indicator" />
          <div className="container-confirm-delete flex-column jc-center ai-center">
            <span className="font-rubik">{message}</span>
            <div className="flex-row">
              <button
                className="btn-actions-confirm-delete font-rubik"
                onClick={() => handleConfirm()}
              >
                Sim
              </button>
              <button
                className="btn-actions-confirm-delete font-rubik"
                onClick={() => setShow()}
              >
                Não
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ConfirmDelete;
