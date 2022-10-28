
import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg'
import  './cart-icon.styles';
import {CartIconContainer, ItemCount} from "./cart-icon.styles";
import {useDispatch, useSelector} from "react-redux";
import {selectCartCount} from "../../store/cart/cart.selector";
import {setIsCartOpen} from "../../store/cart/cart.action";
const CartIcon = ({children , buttonType, ...otherProps}) =>
{
    const dispatch = useDispatch();
    const cartCount= useSelector(selectCartCount);
    const isCartOpen= useSelector(selectCartCount);
    const certCount= useSelector(selectCartCount);

    const toggleIsCartOpen   =  () => dispatch(setIsCartOpen(!isCartOpen));

    return (
                <CartIconContainer onClick={toggleIsCartOpen}>
                    <ShoppingIcon className='shopping-icon' />
                    <ItemCount> {cartCount}  </ItemCount>
                </CartIconContainer>
    )
}

export default CartIcon;