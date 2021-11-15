import { useEffect, useState } from "react";
import { formatToMoney } from "../../utils/formatter";
import "./styles.css";

function Resume({ setModal, transactions }) {
  const [resume, setResume] = useState({ credit: 0, debit: 0, balance: 0 });

  useEffect(() => {
    const sumCredit = transactions.reduce((acc, cur) => {
      return cur.type === "credit" ? acc + Number(cur.value) : acc + 0;
    }, 0);

    const sumDebit = transactions.reduce((acc, cur) => {
      return cur.type === "debit" ? acc + Number(cur.value) : acc + 0;
    }, 0);

    setResume({
      credit: sumCredit,
      debit: sumDebit,
      balance: sumCredit - sumDebit,
    });
  }, [transactions]);

  return (
    <div>
      <div className="container-resume flex-column">
        <h2 className="resume-title font-rubik">Resumo</h2>
        <div className="resume-line flex-row jc-space-between ai-center">
          <span className="resume-title-in font-rubik">Entradas</span>
          <strong className="in flex-row font-rubik ai-center">
            {formatToMoney(resume.credit)}
          </strong>
        </div>
        <div className="resume-line flex-row jc-space-between ai-center">
          <span className="resume-title-out font-rubik">Saídas</span>
          <strong className="out flex-row font-rubik ai-center">
            {formatToMoney(resume.debit)}
          </strong>
        </div>
        <div className="horizontal-line"></div>
        <div className="resume-line flex-row jc-space-between ai-center">
          <span className="resume-title-balance font-rubik">Saldo</span>
          <strong className="balance flex-row font-rubik ai-center">
            {formatToMoney(resume.balance)}
          </strong>
        </div>
      </div>
      <button
        className="btn-add flex-row font-rubik jc-center ai-center"
        onClick={() => setModal(true)}
      >
        Adicionar Registro
      </button>
    </div>
  );
}

export default Resume;
