import {useState} from "react";

type ClientSearchProps = {
    setClientInfo: () => void
    setCPF: (cpf: string) => void
}

function ClientSearch( {setClientInfo, setCPF}: ClientSearchProps) {
    const [checkInput, setCheckInput] = useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const data = formData.get('cpf')
        if(validateInputs(String(data))) {
            setClientInfo();
            setCPF(String(data));
        }
    }

    const validateInputs = (cpf: string) => {

        if (cpf.length != 11 || isNaN(Number(cpf))) {
            setCheckInput(true);
            return false;
        }
        return true
    }

    return (
        <div className={'client-wrapper'}>
            <div className={'client-container'}>
                {checkInput ? <br-message state={'danger'} closable inline title={'Erro. '} show-icon onClick={() => setCheckInput(false)}>Campo 'CPF'possui valor inválido</br-message> : <></>}
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