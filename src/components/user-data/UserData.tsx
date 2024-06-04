import Card from "../card/Card.tsx";
import Tab from "../tab/Tab.tsx";
import {useEffect, useState} from "react";

function UserData( {cpf} ) {
    const [refresh, setRefresh] = useState(false);
    const [clientInfo, setClientInfo] = useState([])
    const [emprestimos, setEmprestimos] = useState([])
    const [instituicoes, setInstituicoes] = useState([])
    const [dataFetched, setDataFetched] = useState(false)

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