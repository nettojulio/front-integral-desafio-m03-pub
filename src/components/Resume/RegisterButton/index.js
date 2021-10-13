function RegisterButton({ modal, setModal, setTypeBackdrop }) {
    return (
        <button
            className="btn-add flex-row"
            onClick={() => {
                setModal(!modal);
                setTypeBackdrop(false)
            }}
        >
            Adicionar Registro
        </button>
    )
}

export default RegisterButton;