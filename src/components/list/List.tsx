import dateFormatter from "../../utils/DateFormatter.ts";

interface Instituicao {
    cnpj: string;
    nome: string;
}

function List({elements_list, instituicoes_list}) {

    return (
        <div className={'list-container'}>
            <div className={'list-elements'}>
                <ul>
                    {elements_list.map(valor => (
                        <li>
                            <div className={'li-header'}>
                                <p>Id-emprestimo: <span>{valor['id-emprestimo']}</span></p>
                                <p>Data: <span>{dateFormatter(valor['data-empresitmo'])}</span></p>
                            </div>
                            <div className={'li-container'}>
                                <div className={'info-user'}>
                                    <p>CPF: <span>{valor['cpf']}</span></p>
                                    <p>Valor do
                                        empréstimo: <span>R$ {Number(valor['qtd-parcelas'] * valor['valor-parcela']).toFixed(2)}</span>
                                    </p>
                                    <p>Quantidade de parcelas: <span>{valor['qtd-parcelas']}</span></p>
                                </div>
                                <div className={'info-instituicao'}>
                                    <p>Nome da instituição: <span>{valor['instituicao']}</span></p>
                                    <p>Status: <span>{valor['status'] === 'Ativo' ? 'Em pagamento' : 'Quitado'}</span>
                                        <br />
                                    <img src={'http://' + import.meta.env.VITE_IP_MAQUINA_BACKEND + '/api/v1/instituicoes/' + instituicoes_list.find((instituicao : Instituicao) => instituicao['nome'] === valor['instituicao'])['cnpj'] + '/imagem'} alt={'imagem'}/>
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