import {ClientInfo} from "../user-data/UserData.tsx";

type CardProps = {
    clientInfo: ClientInfo
}

function Card({clientInfo} : CardProps) {

    return (
        <div className={'card'}>
            <div className={'card-content'}>
                <div className={'card-header'}>
                    <h1>Crédito mensal disponível</h1>
                    <h2>R$ { Number(clientInfo["credito-disponivel"].toFixed(2)) }</h2>
                </div>
                <div className={'card-renda'}>
                    <h3>Renda mensal</h3>
                    <p>R$ { Number(clientInfo["renda-total"].toFixed(2)) }</p>
                </div>
                <div className={'card-total'}>
                    <h3>Total de crédito mensal</h3>
                    <p>R$ { Number(clientInfo["credito-total"].toFixed(2)) }</p>
                </div>
            </div>
        </div>
    )
}

export default Card;