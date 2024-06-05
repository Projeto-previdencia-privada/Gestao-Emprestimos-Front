import './App.css'
import '@govbr-ds/webcomponents/dist/webcomponents.umd.min.js'
import Header from "./components/header/Header.tsx";
import Footer from "./components/footer/Footer.tsx";
import UserData from "./components/user-data/UserData.tsx";
import {useState} from "react";
import ClientSearch from "./components/client-search/ClientSearch.tsx";

function App() {
    const [clientInfo, setClientInfo] = useState(false)
    const [cpf, setCPF] = useState("")

    return (
    <>
        <Header />
        {clientInfo ? <UserData cpf={cpf} /> : <ClientSearch setClientInfo={() => setClientInfo(true)} setCPF={(cpf: string) => setCPF(cpf)} />}
        <Footer />
    </>
  )
}

export default App
