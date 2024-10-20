// frontend/src/components/Navigation/Navigation.jsx

import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAirbnb} from '@fortawesome/free-brands-svg-icons';
import './ProfileButton.css'
function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <div>
            <div className='airbnb-icon' onClick={() => window.location.href= '/'}>
        <FontAwesomeIcon icon={faAirbnb} size='2x' color="red"/>
        <span className='airbnb-home-text'>airbnb</span>
      </div>
        <nav>
            <ul>
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                <ul className="header-right">
            {sessionUser && (
                <li>
                    <NavLink to="/spots/new" className='create-spot-button'>
                    Create a New Spot
                    </NavLink>
                </li>
            )}
                {isLoaded && (
                    <li>
                        <ProfileButton user={sessionUser} />
                    </li>
                )}
            </ul>
            </ul>
        </nav>
        </div>
    );
}

export default Navigation;
