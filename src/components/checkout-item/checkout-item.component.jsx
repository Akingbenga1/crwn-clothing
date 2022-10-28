
import  './checkout-item.styles.scss';
import {CartContext} from "../../contexts/cart.context";
import {useContext} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectCartItems} from "../../store/cart/cart.selector";
const CheckoutItem = ({cartItem}) =>
{
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);

    const {name, imageUrl , quantity,  price} =  cartItem;

    const {clearItemFromCart, addItemToCart, removeItemToCart} = useContext(CartContext);

    const clearItemHandler =  () => dispatch(clearItemFromCart(cartItems, cartItem));
    const addItemHandler =  () => dispatch(addItemToCart(cartItems, cartItem));
    const removeItemHandler =  () => dispatch(removeItemToCart(cartItems,cartItem));


    return (
                <div className='checkout-item-container' >
                    <div className='image-container'>
                        <img src={imageUrl} alt={`${name}`} className='' />
                    </div>
                    <span className='name'>{name}</span>
                    <span className='quantity'>
                         <div className='arrow' onClick={removeItemHandler}>
                            &#10094;
                        </div>
                        <span className='value'>
                            {quantity}
                        </span>
                        <div className='arrow' onClick={addItemHandler}>
                            &#10095;
                        </div>
                    </span>
                    <span className='price'> {price}</span>
                    <div className='remove-button' onClick={clearItemHandler}>
                    &#10005;
                    </div>
                </div>
    )
}

export default CheckoutItem;