type BreadcrumbProps = {
    breadCrumbLinks: {label: string, url: string, home: boolean}[];
}

function Breadcrumb( {breadCrumbLinks}: BreadcrumbProps ) {

    return (
        <div className={'breadcrumb-wrapper'}>
            <div className={'breadcrumb-container'}>
                <br-breadcrumb
                    label={'Breadcrumb'}
                    links={JSON.stringify(breadCrumbLinks)}
                ></br-breadcrumb>
            </div>
        </div>
    )
}
export default Breadcrumb;