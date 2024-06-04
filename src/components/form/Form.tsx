import {useState} from "react";
import Upload from "./Upload.tsx";

function Form( {select_elements, form_fields, type, onFormSubmit} ) {
    const [submit, setSubmit] = useState(false);
    const [message, setMessage] = useState({});

    const validadeInputs = (data) => {
        const cpf : string = data['cpf']
        const qtdParcelas = data['qtd-parcelas']
        const valorParcela = data['valor-parcela']

        if (cpf.length != 11 || isNaN(cpf)) {
            setMessage({state: 'danger', title:'Erro. ', message: "Campo 'CPF' contém um valor inválido", isError: true})
            return;
        }

        if (isNaN(valorParcela) || valorParcela < 1) {
            setMessage({state: 'danger', title:'Erro. ', message: "Campo 'Valor da parcela' contém um valor inválido", isError: true})
            return;
        }

        if (isNaN(qtdParcelas) || !Number.isInteger(Number(qtdParcelas))) {
            setMessage({state: 'danger', title:'Erro. ', message: "Campo 'Quantidade de parcelas' contém um valor inválido", isError: true})
            return;
        }

        return setMessage({state: 'success', title:'Sucesso. ', message: 'Empréstimo cadastrado com sucesso', isError: false})
    }

    const validadeInstituicaoInputs = (data) => {
        const cnpj = data['cnpj']
        console.log(cnpj)

        if(cnpj.length != 14 || isNaN(cnpj)) {
            console.log('ENTEREED')
            setMessage({state: 'danger', title:"Erro. ", message: "Campo 'CNPJ' contém um valor inválido"})
            return false;
        }
        return true;
    }

    const onSubmit = (event) => {
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
        sendRequest().then( (data) => {
            onFormSubmit();
            console.log(data);
        });
        event.currentTarget.reset();
        setSubmit(true);
    };

    const onSubmitInstituicao = (event) => {
        event.preventDefault()

        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData);

        console.log(data['image'])
        console.log()
        async function sendRequest() {
            const request = await fetch('http://' + import.meta.env.VITE_IP_MAQUINA_BACKEND + '/api/v1/instituicoes', {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://' + import.meta.env.VITE_IP_MAQUINA_BACKEND},
                body: JSON.stringify(data)
            })
            return request.json();
        }

        if(validadeInstituicaoInputs(data)) {
            sendRequest().then( (value) => {
                console.log(value);
                const file = new FileReader;
                file.onload = () => {
                    console.log('START REQUEST IMAGE')
                    console.log(file.result)
                    async function sendRequestImage() {
                        const request = await fetch('http://' + import.meta.env.VITE_IP_MAQUINA_BACKEND + '/api/v1/instituicoes/'+data['cnpj']+'/imagem', {
                            method: 'PATCH',
                            headers: {'Access-Control-Allow-Origin': 'http://' + import.meta.env.VITE_IP_MAQUINA_BACKEND},
                            body: file.result
                        })
                    }
                    sendRequestImage()
                }
                file.readAsDataURL(data['image'])
                setMessage({state: 'success', title: 'Sucesso. ', message: 'Instituição cadastrada', isError: false})
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
                        closable
                        inline
                        title={message['title']}
                        show-icon
                        onClick={(event) => setSubmit(false)}
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
                        closable
                        inline
                        title={message['title']}
                        show-icon
                        onClick={(event) => setSubmit(false)}
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