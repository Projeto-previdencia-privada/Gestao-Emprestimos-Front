import List from "../list/List.tsx";
import {useState} from "react";
import Form from "../form/Form.tsx";
import Instituicoes from "../instituicoes/Instituicoes.tsx";
import {EmprestimosInfo, InstituicoesInfo} from "../user-data/UserData.tsx";

type TabProps = {
    emprestimosInfo : EmprestimosInfo[]
    instituicoesInfo : InstituicoesInfo[]
    onContentChange : () => void
    cpf : string
}

function Tab({emprestimosInfo, instituicoesInfo, onContentChange, cpf} : TabProps) {
    const [refresh, setRefresh] = useState(false);

    const formEmperstimos = [
        {label: 'CPF' , placeholder: 'Digite o CPF do cliente', name:'cpf', readOnly: true, value: cpf},
        {label: 'Valor da parcela', placeholder: 'Digite o valor da parcela do empréstimo', name:'valor-parcela', readOnly: false, value: ''},
        {label: 'Quantidade de parcelas', placeholder: 'Digite a quantidade de parcelas do empréstimo', name: 'qtd-parcelas', readOnly: false, value: ''}
    ]

    const formInstituicoes = [
        {label: 'CNPJ', placeholder: 'Digite o CNPJ da instituição', name:'cnpj'},
        {label: 'Nome da instituição', placeholder: 'Digite o nome da instituição', name:'nome'}
    ]

    if(refresh) {
        onContentChange();
        setRefresh(false);

    }

    return (
        <div className={"pt-5"}>
            <br-tab density={'large'}
            >
                <br-tab-item title={"Empréstimos ativos"} id={'panel-1'} aria-label={"Empréstimos ativos"}>
                    <List elements_list={emprestimosInfo.filter(emprestimo => emprestimo['status'] === 'Ativo')} instituicoes_list={instituicoesInfo} />
                </br-tab-item>
                <br-tab-item title={"Histórico de empréstimos"} id={'panel-2'} aria-label={"Histórico de empréstimos"}>
                    <List elements_list={emprestimosInfo.filter(emprestimo => emprestimo['status'] === 'Concluido')} instituicoes_list={instituicoesInfo}/>
                </br-tab-item>
                <br-tab-item title={"Cadastro de empréstimo"} id={'panel-3'} aria-label={"Cadastro de empréstimo"}>
                    <Form select_elements={instituicoesInfo} form_fields={formEmperstimos} type={'emprestimo'} onFormSubmit={() => setRefresh(true)}/>
                </br-tab-item>

                {/*<br-tab-item title={"Conclusão de empréstimo"} id={'panel-4'} aria-label={"Conclusão de empréstimo"}>*/}
                {/*</br-tab-item>*/}

                <br-tab-item title={"Cadastrar instituição"} id={'panel-5'} aria-label={"Cadastrar instituição"}>
                    <Form form_fields={formInstituicoes} select_elements={[{cnpj: "00000000000000", nome: "instituicao"}]} type={'instituicao'} onFormSubmit={() => setRefresh(true)} />
                </br-tab-item>
                <br-tab-item title={"Instituições cadastradas"} id={'panel-6'} aria-label={"Instituições cadastradas"}>
                    <Instituicoes instituicoes_info={instituicoesInfo} />
                </br-tab-item>
            </br-tab>
        </div>
    )
}

export default Tab;
