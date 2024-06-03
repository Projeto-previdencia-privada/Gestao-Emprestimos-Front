function Header() {
    return (
        <br-header
            title={'Empréstimos'}
            image={'https://upload.wikimedia.org/wikipedia/commons/1/11/Gov.br_logo.svg'}
            signature={'Sistema de gestão de empréstimos'}
        >
            <br-header-action
                slot={'headerAction'}
                label-login={'Entrar'}
            >
                <div slot={'avatar'}>
                    <br-avatar image="https://picsum.photos/id/823/400"></br-avatar

                    >
                </div>
            </br-header-action>
        </br-header>
    )
}

export default Header;