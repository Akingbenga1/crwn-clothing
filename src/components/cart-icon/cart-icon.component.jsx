
import { useContext } from 'react';
import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg'
import { CartContext } from '../../contexts/cart.context';
import  './cart-icon.styles';
import {CartIconContainer, ItemCount} from "./cart-icon.styles";
const CartIcon = ({children , buttonType, ...otherProps}) =>
{
    const {isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);


    const toggleIsCartOpen   =  () => setIsCartOpen(!isCartOpen);

    return (
                <CartIconContainer onClick={toggleIsCartOpen}>
                    <ShoppingIcon className='shopping-icon' />
                    <ItemCount> {cartCount}  </ItemCount>
                </CartIconContainer>
    )
}

export default CartIcon;