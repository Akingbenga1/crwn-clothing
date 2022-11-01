import {CART_ACTION_TYPES} from "./cart.types";
import {createAction} from "../../utils/reducer/reducer.util";

export const setIsCartOpen  = (boolean) => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean );


export const addItemToCart = (cartItems, productToAdd) =>
{
    const newCartItems = addCartItem(cartItems, productToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export  const removeItemToCart = (cartItems, cartItemToRemove) =>
{
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);

    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const clearItemFromCart = (cartItems, cartItemToClear) =>
{
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}


export const addCartItem =  (cartItems, productToAdd) =>
{
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

    if(existingCartItem)
    {
        return  cartItems.map((cartItem) => cartItem.id === productToAdd.id ? {...cartItem, quantity: cartItem.quantity + 1 } :  cartItem );

    }

    return [ ...cartItems,  { ...productToAdd, quantity: 1}];
}

export const removeCartItem = (cartItems, cartItemToRemove) =>
{
    // find the cart item to remove

    const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id);

    //  check if quantity id equal to 1, if it is,  remove that item from the cart

    if(existingCartItem.quantity === 1)
    {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id );
    }

    // return back cartitems with matching cart item with reduced quantity

    return  cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id ? {...cartItem, quantity: cartItem.quantity - 1 } :  cartItem );

}

export const clearCartItem = (cartItems, cartItemToClear) =>
{
    return  cartItems.find((cartItem) => cartItem.id !== cartItemToClear.id);
}