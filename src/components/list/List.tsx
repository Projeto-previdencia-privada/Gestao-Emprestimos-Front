import dateFormatter from "../../utils/DateFormatter.ts";
import {EmprestimosInfo, InstituicoesInfo} from "../user-data/UserData.tsx";

type ListProps = {
    elements_list: EmprestimosInfo[]
    instituicoes_list: InstituicoesInfo[]
}

function List({elements_list, instituicoes_list} : ListProps) {
    function getCNPJ(list: InstituicoesInfo[], nome: string) {
        const instituicao = list.find( (instituicao) => instituicao.nome === nome)
        if(instituicao === undefined) {
            return "99999999999999"
        }
        return instituicao.cnpj;
    }

    return (
        <div className={'list-container'}>
            <div className={'list-elements'}>
                <ul>
                    {elements_list.map(valor => (
                        <li>
                            <div className={'li-header'}>
                                <p>Id-emprestimo: <span>{valor['id-emprestimo']}</span></p>
                                <p>Data: <span>{dateFormatter(valor["data-emprestimo"])}</span></p>
                            </div>
                            <div className={'li-container'}>
                                <div className={'info-user'}>
                                    <p>CPF: <span>{valor['cpf']}</span></p>
                                    <p>Valor da parcela: <span>R$ {Number(valor['valor-parcela']).toFixed(2)}</span>
                                    </p>
                                    <p>Quantidade de parcelas: <span>{valor['qtd-parcelas']}</span></p>
                                </div>
                                <div className={'info-instituicao'}>
                                    <p>Nome da instituição: <span>{valor['instituicao']}</span></p>
                                    <p>Status: <span>{valor['status'] === 'Ativo' ? 'Em pagamento' : 'Quitado'}</span>
                                        <br />
                                    <img src={'http://' + import.meta.env.VITE_IP_MAQUINA_BACKEND + '/api/v1/instituicoes/' + getCNPJ(instituicoes_list, valor.instituicao) + '/imagem'} alt={'imagem'}/>
                                    </p>
                                </div>
                            </div>
                            <br-divider size={'medium'}></br-divider>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default List;