
import {createContext, useEffect, useState} from "react";
import {createUserDocumentFromAuth, onAuthStateChangeListener, signOutUser} from "../utils/firebase/firebase.utils";


const addCartItem =  (cartItems, productToAdd) => 
{
    
}


export const CartContext = createContext({
isCartOpen: false,
setIsCartOpen: () => {},
cartItems: [],
addItemToCart: () => {}
});

export const CartProvider = ({children}) =>
{
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    const value = {isCartOpen, setIsCartOpen};

    const addItemToCart = (productToAdd) => {
       
      
    }

  return  <CartContext.Provider value={value}> {children} </CartContext.Provider>
}
