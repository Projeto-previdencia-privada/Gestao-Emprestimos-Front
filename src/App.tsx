import './App.css'
import '@govbr-ds/webcomponents/dist/webcomponents.umd.min.js'
import Header from "./components/header/Header.tsx";
import Footer from "./components/footer/Footer.tsx";
import UserData from "./components/user-data/UserData.tsx";
import {useState} from "react";
import ClientSearch from "./components/client-search/ClientSearch.tsx";
import Breadcrumb from "./components/breadcrumb/Breadcrumb.tsx";

function App() {
    const [clientInfo, setClientInfo] = useState(false)
    const [cpf, setCPF] = useState("")
    const [error, setError] = useState(false)


    const linksInitial = [
        {label: 'Página inicial', url: '', home: true},
    ]

    const linksLogged = [
        {label: 'Página inicial', url: '', home: true},
        {label: 'Gerenciamento de empréstimos', url: '#', home: false}
    ]

    return (
    <>
        <Header />
        {clientInfo && !error  ? <Breadcrumb breadCrumbLinks={linksLogged} /> : <Breadcrumb breadCrumbLinks={linksInitial}/> }
        {clientInfo && !error ? <UserData cpf={cpf} setError={() => {setError(true); setClientInfo(false)}} /> : <ClientSearch setClientInfo={() => setClientInfo(true)} setCPF={(cpf: string) => setCPF(cpf)} isError={error} setError={() => setError(false)} />}
        <Footer />
    </>
  )
}

export default App
