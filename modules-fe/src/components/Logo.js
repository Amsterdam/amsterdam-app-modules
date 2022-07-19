import { useLocation } from 'react-router-dom';

const Logo = () => {
    const location = useLocation()

    return (
        <div className="logo">
            {(location.pathname !== '/login') && (
                <img
                    className="aangemeld"
                    src='/Shape.svg'
                    alt='Aangemeld' />
            )}
        </div>
    )
}

export default Logo