import {useState} from "react";

type ClientSearchProps = {
    setClientInfo: () => void
    setCPF: (cpf: string) => void
    setError: () => void
    isError: boolean
}

function ClientSearch( {setClientInfo, setCPF, isError, setError}: ClientSearchProps) {
    const [checkInput, setCheckInput] = useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const data = formData.get('cpf')
        if(validateInputs(String(data))) {
            setClientInfo();
            setCPF(String(data));
        }
        setError()
        message.message = "Campo 'CPF'possui valor inválido"
    }

    const validateInputs = (cpf: string) => {

        if (cpf.length != 11 || isNaN(Number(cpf))) {
            setCheckInput(true);
            return false;
        }
        return true
    }

    const message = {state:'danger', title:'Erro. ', message:"Campo 'CPF'possui valor inválido"}
    if(isError) {
        message.message = "CPF não encontrado"
    }
    return (
        <div className={'client-wrapper'}>
            <div className={'client-container'}>
                {checkInput || isError ? <br-message state={message.state} closable inline title={message.title} show-icon onClick={() => setCheckInput(false)}>{message.message}</br-message> : <></>}
                <div className={'client-form'}>
                    <form onSubmit={handleSubmit}>
                        <div className="br-input">
                            <label htmlFor="input-default">{'CPF'}</label>
                            <input id="input-default" type="text" placeholder={'Digite o CPF do cliente'} name={'cpf'}/>
                        </div>
                        <div className="form-button">
                            <button className="br-button primary mr-3">Cadastrar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ClientSearch;