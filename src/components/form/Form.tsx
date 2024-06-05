import React, {useState} from "react";
import Upload from "./Upload.tsx";
import {InstituicoesInfo} from "../user-data/UserData.tsx";

type FormFields = {
    label: string
    placeholder: string
    name: string
}

type Message = {
    state: string
    title: string
    message: string
}

type FormProps = {
    select_elements: InstituicoesInfo[]
    form_fields: FormFields[]
    type: string
    onFormSubmit: () => void
}

function Form( {select_elements, form_fields, type, onFormSubmit}: FormProps ) {
    const [submit, setSubmit] = useState(false);
    const [message, setMessage]: [Message, React.Dispatch<React.SetStateAction<Message>>] = useState({state: 'info', title: 'title', message: 'message'});

    const validadeInputs = (data: {[p: string]: FormDataEntryValue}) => {
        const cpf = String(data['cpf'])
        const qtdParcelas = Number(data['qtd-parcelas'])
        const valorParcela = Number(data['valor-parcela'])

        if (cpf.length != 11 || isNaN(Number(cpf))) {
            setMessage({state: 'danger', title:'Erro. ', message: "Campo 'CPF' contém um valor inválido"})
            return;
        }

        if (isNaN(valorParcela) || valorParcela < 1) {
            setMessage({state: 'danger', title:'Erro. ', message: "Campo 'Valor da parcela' contém um valor inválido"})
            return;
        }

        if (isNaN(qtdParcelas) || !Number.isInteger(Number(qtdParcelas))) {
            setMessage({state: 'danger', title:'Erro. ', message: "Campo 'Quantidade de parcelas' contém um valor inválido"})
            return;
        }

        return setMessage({state: 'success', title:'Sucesso. ', message: 'Empréstimo cadastrado com sucesso'})
    }

    const validadeInstituicaoInputs = (data: {[p: string]: FormDataEntryValue}) => {
        const cnpj = String(data['cnpj'])

        if(cnpj.length != 14 || isNaN(Number(cnpj))) {
            setMessage({state: 'danger', title:"Erro. ", message: "Campo 'CNPJ' contém um valor inválido"})
            return false;
        }
        return true;
    }

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData);
        validadeInputs(data)
        async function sendRequest() {
            const request = await fetch('http://' + import.meta.env.VITE_IP_MAQUINA_BACKEND + '/api/v1/emprestimos', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            })

            return request.json();
        }
        sendRequest().then( () => {
            onFormSubmit();
        });
        event.currentTarget.reset();
        setSubmit(true);
    };

    const onSubmitInstituicao = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData);

        async function sendRequest() {
            const request = await fetch('http://' + import.meta.env.VITE_IP_MAQUINA_BACKEND + '/api/v1/instituicoes', {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://' + import.meta.env.VITE_IP_MAQUINA_BACKEND},
                body: JSON.stringify(data)
            })
            return request.json();
        }

        if(validadeInstituicaoInputs(data)) {
            sendRequest().then( () => {
                const file = new FileReader;
                file.onload = () => {
                    async function sendRequestImage() {
                        await fetch('http://' + import.meta.env.VITE_IP_MAQUINA_BACKEND + '/api/v1/instituicoes/' + data['cnpj'] + '/imagem', {
                            method: 'PATCH',
                            headers: {'Access-Control-Allow-Origin': 'http://' + import.meta.env.VITE_IP_MAQUINA_BACKEND},
                            body: file.result
                        })
                    }

                    sendRequestImage()
                }
                // PODE CAUSAR ERROS (É necessário uma análise mais aprofundada)
                file.readAsDataURL(new Blob([data['image']]))
                //
                setMessage({state: 'success', title: 'Sucesso. ', message: 'Instituição cadastrada'})
                onFormSubmit();
            })
            event.currentTarget.reset();
        }
        setSubmit(true);
    }

    if(type === "emprestimo") {
        return (
            <div className={'form-wrapper'}>
                <div className={'form-container'}>
                    {submit ? <br-message
                        state={message['state']}
                        closable={true}
                        inline={true}
                        title={message['title']}
                        show-icon={true}
                        onClick={() => setSubmit(false)}
                    >{message['message']}</br-message> : <></>}
                    <form action={'http://' + import.meta.env.VITE_IP_MAQUINA_BACKEND + '/api/v1/emprestimos'} method={'POST'} onSubmit={onSubmit}>
                        <div className="col-sm-8 col-lg-5">
                            {form_fields.map((field) => (
                                <div className="br-input">
                                    <label htmlFor="input-default">{field['label']}</label>
                                    <input id="input-default" type="text" placeholder={field['placeholder']}
                                           name={field['name']}/>
                                </div>
                            ))}

                            <div className={'form-select'}>
                                <label className={'form-label'}>Instituição</label>
                                <select className={'form-options'} name={'cnpj'}>
                                    <option value={''} selected hidden>Selecione uma instituição</option>
                                    {select_elements.map((element) => (
                                        <option value={element['cnpj']}>{element['nome']}</option>
                                    ))}
                                </select>
                            </div>

                        </div>
                        <div className="form-button">
                            <button className="br-button primary mr-3">Cadastrar</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    if (type === 'instituicao') {
        return (
            <div className={'form-wrapper'}>
                <div className={'form-container'}>
                    {submit ? <br-message
                        state={message['state']}
                        closable={true}
                        inline={true}
                        title={message['title']}
                        show-icon={true}
                        onClick={() => setSubmit(false)}
                    >{message['message']}</br-message> : <></>}
                    <form action={'http://' + import.meta.env.VITE_IP_MAQUINA_BACKEND + '/api/v1/instituicoes'} method={'POST'} onSubmit={onSubmitInstituicao}>
                        <div className="col-sm-8 col-lg-5">
                            {form_fields.map((field) => (
                                <div className="br-input">
                                    <label htmlFor="input-default">{field['label']}</label>
                                    <input id="input-default" type="text" placeholder={field['placeholder']}
                                           name={field['name']}/>
                                </div>
                            ))}
                            <Upload />
                        </div>
                        <div className="form-button">
                            <button className="br-button primary mr-3">Cadastrar</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Form;