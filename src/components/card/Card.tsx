

function Card({clientInfo}) {

    return (
        <div className={'card'}>
            <div className={'card-content'}>
                <div className={'card-header'}>
                    <h1>Crédito disponível</h1>
                    <h2>R$ { parseFloat(clientInfo['credito-disponivel']).toFixed(2) }</h2>
                </div>
                <div className={'card-renda'}>
                    <h3>Renda total</h3>
                    <p>R$ { parseFloat(clientInfo["renda-total"]).toFixed(2)}</p>
                </div>
                <div className={'card-total'}>
                    <h3>Total de crédito</h3>
                    <p>R$ { parseFloat(clientInfo["credito-total"]).toFixed(2) }</p>
                </div>
            </div>
        </div>
    )
}

export default Card;