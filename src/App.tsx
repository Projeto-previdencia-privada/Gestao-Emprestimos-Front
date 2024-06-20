import './App.css'
import '@govbr-ds/webcomponents/dist/webcomponents.umd.min.js'
import Header from "./components/header/Header.tsx";
import UserData from "./components/user-data/UserData.tsx";
import {useState} from "react";
import ClientSearch from "./components/client-search/ClientSearch.tsx";
import Footer from "./components/footer/Footer.tsx";



function App() {
    const [clientInfo, setClientInfo] = useState(false)
    const [cpf, setCPF] = useState("")
    const [error, setError] = useState(false)


    return (
    <>
        <Header />
        {clientInfo && !error ? <UserData cpf={cpf} setError={() => {setError(true); setClientInfo(false)}} /> : <ClientSearch setClientInfo={() => setClientInfo(true)} setCPF={(cpf: string) => setCPF(cpf)} isError={error} setError={() => setError(false)} />}
        <Footer />
    </>
  )
}

export default App
