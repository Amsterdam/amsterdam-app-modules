import { FaChevronLeft } from 'react-icons/fa'
import { Link } from "react-router-dom"

const Navigation = ({ location, text }) => {
    return (
        <div className='navigation'>
            <Link
                to={location}>
                <FaChevronLeft />
                <span style={{ verticalAlign: '3px' }}>{text}</span>
            </Link>
        </div >
    )
}

export default Navigation