import { useState } from 'react';
import garbage from '../../../assets/garbage.svg'
import indicator from '../../../assets/indicator.svg';

export function DeleteIcon({ transaction }) {
    const [modalDelete, setModalDelete] = useState(false);

    async function deleteTransaction(transaction) {
        try {
            const response = await fetch(`http://localhost:3333/transactions/${transaction}`, {
                method: 'DELETE'
            });
            setModalDelete(!modalDelete);
        } catch (error) {
            alert(error);
        }
    }
    return (
        <div className="container-delete">
            <button
                className="delete-icon"
                onClick={() => setModalDelete(!modalDelete)}
            >
                <img src={garbage} alt="Delete" />
            </button>
            {modalDelete && <>
                <img className="indicator" src={indicator} alt="indicator" />
                <div className="container-confirm-delete flex-column">
                    <p className="font-rubik">Apagar item?</p>
                    <div className="flex-row">
                        <button
                            className="btn-actions-confirm-delete font-rubik"
                            onClick={() => deleteTransaction(transaction.id)}
                        >
                            Sim
                        </button>
                        <button
                            className="btn-actions-confirm-delete font-rubik"
                            onClick={() => setModalDelete(!modalDelete)}
                        >
                            Não
                        </button>
                    </div>
                </div>
            </>}
        </div>
    )
}