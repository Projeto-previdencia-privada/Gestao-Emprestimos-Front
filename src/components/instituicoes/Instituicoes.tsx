interface Instituicao {
    'cnpj': string
    'nome': string
}

interface InstituicoesProps {
    instituicoes_info: Instituicao[]
}

function Instituicoes( {instituicoes_info} : InstituicoesProps ) {
    return (
        <div className={'instituicoes-wrapper'}>
            <div className={'instituicoes-container'}>
                {instituicoes_info.map( (instituicao) => (
                    <div>
                        <div className={'intituicoes-img-container'}>
                            <img src={'http://' + import.meta.env.VITE_IP_MAQUINA_BACKEND + '/api/v1/instituicoes/'+instituicao.cnpj+'/imagem'} alt={'Imagem não encontrada'}/>
                        </div>
                        <p>CNPJ: <span>{instituicao.cnpj}</span></p>
                        <p>Nome: <span>{instituicao.nome}</span></p>
                    </div>
                ))}
            </div>
        </div>

    )
}
export default Instituicoes;