import {useEffect, useRef} from "react";

function Header() {
    const titleRef : React.MutableRefObject<HTMLElement | undefined> = useRef();

    const listLinks= [
        {
          name: 'Buscar CPF',
          href: 'http://' + location.hostname + ':' + location.port
        },
        {
            name: 'Órgãos do governo',
            href: 'https://www.gov.br/pt-br/orgaos-do-governo'
        },
        {
            name: 'Acesso à Informação',
            href: 'https://www.gov.br/acessoainformacao/pt-br'
        },
        {
            name: 'Legislação',
            href: 'https://www4.planalto.gov.br/legislacao'
        },
        {
            name: 'Acessibilidade',
            href: 'https://www.gov.br/governodigital/pt-br/acessibilidade-e-usuario/acessibilidade-digital'
        }
    ]

    const listFunctions = [
        {
            icon: 'fas fa-adjust',
            url: '#'
        }
    ]

    useEffect(() => {
        if(titleRef.current !== undefined) {
            titleRef.current.addEventListener('title-link-click', () => location.href = 'http://' + import.meta.env.VITE_IP_MAQUINA_HOME)
        } else {
            console.error('Unable to get reference to Header')
        }
    }, []);

    return (
        <br-header
            title={'Sistema de Regimes Próprios de Previdência'}
            image={'https://upload.wikimedia.org/wikipedia/commons/1/11/Gov.br_logo.svg'}
            signature={'Sistema de gestão de empréstimos'}
            has-title-link
            title-link-url={"http://www.google.com"}
            ref={titleRef}
             >
            <br-header-action
                slot={'headerAction'}
                label-login={'Entrar'}
                title-links={'Acesso Rápido'}
                list-links={JSON.stringify(listLinks)}
                title-functions={'Funcionalidades do sistema'}
                list-functions={JSON.stringify(listFunctions)}
            ></br-header-action>
        </br-header>
    )
}

export default Header;