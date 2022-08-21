
import {createContext, useEffect, useState} from "react";
import {createUserDocumentFromAuth, onAuthStateChangeListener, signOutUser} from "../utils/firebase/firebase.utils";

export const CartContext = createContext({
isCartOpen: false,
setIsCartOpen: () => {}
});

export const CartProvider = ({children}) =>
{
    const [isCartOpen, setIsCartOpen] = useState(false);
    const value = {isCartOpen, setIsCartOpen};

  return  <CartContext.Provider value={value}> {children} </CartContext.Provider>
}
