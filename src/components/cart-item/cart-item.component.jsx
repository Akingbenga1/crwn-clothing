
import { useContext } from 'react';
import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg'
import { CartContext } from '../../contexts/cart.context';
import  './cart-icon.styles.scss';
const CartItem = ({cartItem}) =>
{
    const {name, quantity } =  cartItem;

    return (
                <div >
                    <h2> {name}</h2>
                </div>
    )
}

export default CartItem;