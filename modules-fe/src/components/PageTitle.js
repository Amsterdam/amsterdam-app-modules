import { useLocation } from 'react-router-dom';

const PageTitle = ({ pageTitle }) => {
    const location = useLocation()
    const mainPage = location.pathname === '/' || location.pathname === '/login'

    return (
        <div className={mainPage ? 'mainpage_title' : 'page_title'}>
            <h1-small>
                {pageTitle}
            </h1-small>
        </div>
    )
}

export default PageTitle
