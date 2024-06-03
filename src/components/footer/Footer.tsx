function Footer() {
    const logo = {url: 'https://upload.wikimedia.org/wikipedia/commons/1/11/Gov.br_logo.svg'}

    const categorias = [
        {
            title: 'Outros serviços',
            items: [
                {
                    title: 'Gestão de Benefícios',
                    href: '#'
                },
                {
                    title: 'Gestão de Contribuições',
                    href: '#'
                },
                {
                    title: 'Gestão de Contribuíntes',
                    href: '#'
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