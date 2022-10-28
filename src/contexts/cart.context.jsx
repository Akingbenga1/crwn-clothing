
import {createContext, useEffect, useReducer, useState} from "react";
import {createUserDocumentFromAuth, onAuthStateChangeListener, signOutUser} from "../utils/firebase/firebase.utils";
import {createAction} from "../utils/reducer/reducer.util";


const addCartItem =  (cartItems, productToAdd) => 
{
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

    if(existingCartItem)
    {
          return  cartItems.map((cartItem) => cartItem.id === productToAdd.id ? {...cartItem, quantity: cartItem.quantity + 1 } :  cartItem );

    }

    return [ ...cartItems,  { ...productToAdd, quantity: 1}];
}

const removeCartItem = (cartItems, cartItemToRemove) =>
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

const clearCartItem = (cartItems, cartItemToClear) =>
{
    return  cartItems.find((cartItem) => cartItem.id !== cartItemToClear.id);
}


export const CartContext = createContext({
                isCartOpen: true,
                setIsCartOpen: () => {},
                cartItems: [],
                addItemToCart: () => {},
                removeItemToCart: () => {},
                clearItemFromCart: () => {},
                cartCount :  0,
                cartTotal :  0,
});

const INITIAL_STATE = {
    isCartOpen: true,
    cartItems: [],
    cartCount :  0,
    cartTotal :  0,
}


const CART_ACTION_TYPES = {
    SET_CART_ITEMS: "SET_CART_ITEMS",
    SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
}

const cartReducer = (state, action) => {

    const { type, payload } = action;

    switch(type){

        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            };
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                ...payload
            }
        default:
            throw new Error(`Unhandled type of ${type} in cartReducer` )
    }
}

export const CartProvider = ({children}) =>
{
    const [{cartItems, cartCount, cartTotal, isCartOpen, setCartItems}, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    // const [isCartOpen, setIsCartOpen] = useState(false);
    // const [cartItems, setCartItems] = useState([]);
    // const [cartCount, setCartCount] = useState(0);
    // const [cartTotal, setCartTotal] = useState(0);
    //
    // useEffect(() =>
    // {
    //    const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
    //
    //    setCartCount(newCartCount);
    // }, [cartItems]);
    //
    // useEffect(() =>
    // {
    //     const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
    //
    //     setCartTotal(newCartTotal);
    // }, [cartItems]);

    const updateCartItemReducer = (newCartItems) =>
    {
        const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);

        const newCartTotal = newCartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);

        dispatch(
            createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
                cartItems: newCartItems,
                cartCount: newCartCount,
               cartTotal: newCartTotal}
            )
        );

    }


    const addItemToCart = (productToAdd) =>
    {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const removeItemToCart = (cartItemToRemove) =>
    {
        setCartItems(removeCartItem(cartItems, cartItemToRemove));

    }

    const clearItemFromCart = (cartItemToClear) =>
    {
        setCartItems(clearCartItem(cartItems, cartItemToClear));

    }

    const setIsCartOpen = (bool) =>
    {

        dispatch(
            createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool
            )
        );
    }

    const value = {
                        isCartOpen,
                        setIsCartOpen,
                        addItemToCart,
                        cartItems,
                        cartCount,
                        removeItemToCart,
                        clearItemFromCart,
                        cartTotal
                 }

  return  <CartContext.Provider value={value}> {children} </CartContext.Provider>
}
