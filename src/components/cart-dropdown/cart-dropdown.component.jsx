
import  './cart-dropdown.styles';
import Button from "../button/button.component";
import CartItem from '../cart-item/cart-item.component';
import {useContext} from "react";
import {CartContext} from "../../contexts/cart.context";
import {useNavigate} from "react-router-dom";
import {CartDropdownContainer, CartItems, EmptyMessage} from "./cart-dropdown.styles";
import {useSelector} from "react-redux";
import {selectCartItems} from "../../store/cart/cart.selector";

const CartDropdown = () =>
{
    const cartItems   = useSelector(selectCartItems);
    const navigate   = useNavigate();

    const goToCheckOutHandler =  () =>
    {
        navigate('/checkout');
    }
    return (
                <CartDropdownContainer >
                    <CartItems>
                    {
                        cartItems &&   cartItems.length ?
                            ( cartItems.map(item => <CartItem cartItem={item}  key={item.id}/>) )
                            : ( <EmptyMessage>Your Cart is empty</EmptyMessage>)

                    }
                    </CartItems>
                    <Button onClick={goToCheckOutHandler}> GO TO CHECKOUT </Button>
                </CartDropdownContainer>
            )
}

export default CartDropdown;