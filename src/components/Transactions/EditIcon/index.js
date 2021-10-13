import pencil from '../../../assets/pencil.svg'

export function EditIcon({ setTypeBackdrop, modal, setModal, setEditTransaction, transaction }) {
    return (
        <button
            className="edit-icon"
            onClick={() => {
                setModal(!modal);
                setTypeBackdrop(true);
                setEditTransaction(transaction);
            }}>
            <img src={pencil} alt="Edit" />
        </button>
    )
}