import {Link, Outlet} from "react-router-dom";

import {ReactComponent as CrownLogo} from  '../../assets/crown.svg'
import './navigation.styles.scss'
import {UserContext} from "../../contexts/user.context";
import {useContext} from "react";
import {signOutUser} from "../../utils/firebase/firebase.utils";

const Navigation = () => {

    const { currentUser } = useContext(UserContext);

    console.log("currentUser ====>", currentUser);
    return (
        <>
            <div className='navigation'>
                <Link className='logo-container' to='/'>
                    <CrownLogo />
                </Link>

                <div className='links-container'>
                   <Link className='nav-link' to='/shop'>Shop</Link>
                    {
                        currentUser ?
                            ( <span  onClick={signOutUser} className='nav-link'> SIGN OUT </span> )
                            : (  <Link className='nav-link' to='/auth'>Sign In </Link> )
                    }

                </div>
            </div>
            <Outlet />
        </>
    );
}

export default Navigation;