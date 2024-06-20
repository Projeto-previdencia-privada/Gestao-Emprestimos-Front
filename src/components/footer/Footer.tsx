function Footer() {
    const logo = {url: './assets/govbr-negativa.svg', description: 'Logo do governo federal'}

    const categorias = [
        {
            title: 'NAVEGAÇÃO',
            items: [
                {
                    title: 'Home',
                    href: 'http://' + import.meta.env.VITE_IP_MAQUINA_HOME
                }
            ]
        },
        {
            title: 'SERVIÇOS',
            items: [
                {
                    title: 'Gestão de Benefícios',
                    href: 'http://' + import.meta.env.VITE_IP_MAQUINA_BENEFICIOS
                },
                {
                    title: 'Gestão de Contribuição',
                    href: 'http://' + import.meta.env.VITE_IP_MAQUINA_CONTRIBUICOES
                },
                {
                    title: 'Gestão de Contribuíntes',
                    href: 'http://' + import.meta.env.VITE_IP_MAQUINA_CONTRIBUINTES
                }
            ]
        },
    ]

    const social = {
        label: 'Redes Sociais',
        networks: [
            {
                icon: 'facebook-f',
                iconFamily: 'fab',
                description: 'Facebook',
                href: 'https://www.facebook.com/governodobrasil'
            },
            {
                icon: 'twitter',
                iconFamily: 'fab',
                description: 'Twitter',
                href: 'https://x.com/govbr'
            },
            {
                icon: 'linkedin-in',
                iconFamily: 'fab',
                description: 'Linkedin',
                href: 'https://www.linkedin.com/company/governo-do-brasil'
            },
            {
                icon: 'whatsapp',
                iconFamily: 'fab',
                description: 'Whatsapp',
                href: 'https://www.whatsapp.com/channel/0029Va2zbqm7dmeR3lddrp38'
            }
        ]
    }

    return (
            <br-footer
                text={"Texto destinado a exibição de informações relacionadas à licença de uso"}
                logo={JSON.stringify(logo)}
                categories={JSON.stringify(categorias)}
                social={JSON.stringify(social)}
            >

            </br-footer>

    )
}
export default Footer;