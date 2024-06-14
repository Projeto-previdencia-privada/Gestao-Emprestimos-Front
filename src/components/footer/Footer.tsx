function Footer() {
    const logo = {url: 'https://upload.wikimedia.org/wikipedia/commons/1/11/Gov.br_logo.svg'}

    const categorias = [
        {
            title: 'Outros serviços',
            items: [
                {
                    title: 'Gestão de Benefícios',
                    href: '192.168.37.8:5300'
                },
                {
                    title: 'Gestão de Contribuições',
                    href: '192.168.37.8:3000'
                },
                {
                    title: 'Gestão de Contribuíntes',
                    href: '192.168.37.8:8090'
                }
            ]
        }
    ]

    return (
            <br-footer
                text={<a href={'#'}>t</a>}
                logo={JSON.stringify(logo)}
                categories={JSON.stringify(categorias)}
            >

            </br-footer>

    )
}
export default Footer;