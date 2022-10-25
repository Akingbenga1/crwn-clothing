import {Link, Outlet} from "react-router-dom";

import {ReactComponent as CrownLogo} from  '../../assets/crown.svg'
import {LogoContainer, NavigationContainer, NavLink, NavLinks} from './navigation.styles'

import CartIcon from '../../components/cart-icon/cart-icon.component'
import {UserContext} from "../../contexts/user.context";
import {useContext} from "react";
import {signOutUser} from "../../utils/firebase/firebase.utils";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../contexts/cart.context";

const Navigation = () => {

    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);

    console.log("currentUser ====>", currentUser);
    return (
        <>
            <NavigationContainer>
                <LogoContainer to='/'>
                    <CrownLogo />
                </LogoContainer>

                <NavLinks>
                   <NavLink to='/shop'>Shop</NavLink>
                    {
                        currentUser ?
                            ( <NavLink as='span'  onClick={signOutUser} > SIGN OUT </NavLink> )
                            : (  <NavLink to='/auth'>Sign In </NavLink> )
                    }
                    <CartIcon />
                </NavLinks>
              { isCartOpen &&  <CartDropdown /> }
            </NavigationContainer>
            <Outlet />
        </>
    );
}

export default Navigation;