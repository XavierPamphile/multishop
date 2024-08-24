import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPowerOff} from '@fortawesome/free-solid-svg-icons'

import { useUser } from '../../../hooks/useUser'

function Header() {
    // Destructure the logout function from the useUser hook.
    const  {logout} = useUser();
    
    return (
    <header>
        <div>
        <nav>
            <Link to="/">Accueil</Link>

        </nav>

        </div>
        <h1>Dashboard panel</h1>
        <button onClick={logout}><FontAwesomeIcon icon={faPowerOff} /></button>
    </header>
  )
}

export default Header