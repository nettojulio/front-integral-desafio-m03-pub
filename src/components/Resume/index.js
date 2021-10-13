import { useState, useEffect, useRef } from 'react';
import RegisterButton from './RegisterButton';


function Resume({ modal, setModal, setTypeBackdrop, transactions, setRefreshScreen, refreshScreen }) {
    const [credits, setCredits] = useState(0);
    const [debits, setDebits] = useState(0);
    const [balance, setBalance] = useState(0);
    const creditsRef = useRef([]);
    const debitsRef = useRef([]);

    useEffect(() => {
        async function processData() {
            let creditsSum = 0;
            let debitsSum = 0;

            transactions.map((transaction) => {
                if (transaction.type === 'credit') {
                    creditsRef.current = transaction.value;
                    creditsSum = creditsSum + creditsRef.current;
                } else {
                    debitsRef.current = transaction.value;
                    debitsSum = debitsSum + debitsRef.current;
                }
            })
            setCredits(creditsSum);
            setDebits(debitsSum);
            setBalance(creditsSum - debitsSum);
        }
        processData()
        setRefreshScreen(!refreshScreen);
    }, []);

    return (
        <div>
            <div className="container-resume flex-column">
                <h2 className="resume-title font-rubik">Resumo</h2>
                <div className="resume-line flex-row">
                    <h3 className="resume-title-in font-rubik">Entradas</h3>
                    <p className="in flex-row font-rubik">{(credits).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
                </div>
                <div className="resume-line flex-row">
                    <h3 className="resume-title-out font-rubik">Saídas</h3>
                    <p className="out flex-row font-rubik">{(debits).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
                </div>
                <div className="resume-line flex-row">
                    <h3 className="resume-title-balance font-rubik">Saldo</h3>
                    <p className="balance flex-row font-rubik">{(balance).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
                </div>
            </div>
            <RegisterButton
                modal={modal}
                setModal={setModal}
                setTypeBackdrop={setTypeBackdrop}
            />
        </div>
    )
}

export default Resume;