import Tab from "../tab/Tab.tsx";
import React, {useEffect, useState} from "react";
import Card from "../card/Card.tsx";

export type ClientInfo = {
    "credito-disponivel": number
    "renda-total": number
    "credito-total": number
}

export type EmprestimosInfo = {
    "id-emprestimo": string
    "cpf": string
    "valor-parcela": number
    "qtd-parcelas": number
    "status": string
    "instituicao": string
    "data-emprestimo": string
}

export type InstituicoesInfo = {
    "nome": string
    "cnpj": string
}

type UserDataProps = {
    cpf: string
}

function UserData( {cpf} : UserDataProps ) {
    const [refresh, setRefresh] = useState(false);
    const [dataFetched, setDataFetched] = useState(false)
    const [clientInfo, setClientInfo] : [ClientInfo, React.Dispatch<React.SetStateAction<ClientInfo>>] = useState({"credito-disponivel": 0, "renda-total": 0, "credito-total": 0})
    const [emprestimos, setEmprestimos] : [[EmprestimosInfo], React.Dispatch<React.SetStateAction<[EmprestimosInfo]>>] = useState([{"id-emprestimo": "0", "cpf": "00000000000000", "valor-parcela": 0, "qtd-parcelas": 0, "status": "Ativo", "instituicao": "instituicao", "data-emprestimo": "00/00/0000"}])
    const [instituicoes, setInstituicoes] : [[InstituicoesInfo], React.Dispatch<React.SetStateAction<[InstituicoesInfo]>>] = useState([{nome: "nome", cnpj: "00000000000"}])

    async function fetchData() {
        let response = await fetch("http://" + import.meta.env.VITE_IP_MAQUINA_BACKEND + "/api/v1/emprestimos/" + cpf + "/info", {headers: {'Access-Control-Allow-Origin': 'http://' + import.meta.env.VITE_IP_MAQUINA_BACKEND}} )
        let data = await response.json()
        setClientInfo(data)

        response = await fetch('http://' + import.meta.env.VITE_IP_MAQUINA_BACKEND + '/api/v1/emprestimos/' + cpf + '?modo=pessoa', {headers: {'Authorization': 'a', 'Access-Control-Allow-Origin': 'http://' + import.meta.env.VITE_IP_MAQUINA_BACKEND}});
        data = await response.json();
        setEmprestimos(data)

        response = await fetch('http://' + import.meta.env.VITE_IP_MAQUINA_BACKEND + '/api/v1/instituicoes', {headers: {'Access-Control-Allow-Origin': 'http://' + import.meta.env.VITE_IP_MAQUINA_BACKEND}})
        data = await response.json()
        setInstituicoes(data)
    }

     useEffect(() => {
        fetchData().then(() => setDataFetched(true));
    }, []);

    if(refresh) {
        fetchData();
        setRefresh(false);
    }

    return (
        <>
            { dataFetched ? <Card clientInfo={clientInfo} /> : <p>loading</p>}
            { dataFetched ? <Tab  emprestimosInfo={emprestimos} instituicoesInfo={instituicoes} onContentChange={() => setRefresh(true)} /> : <p>loading</p> }
        </>
    )
}
export default UserData;