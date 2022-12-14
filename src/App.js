import './App.css';
import Home from "./routes/home/home.component.jsx";
import { Route, Routes} from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import {createUserDocumentFromAuth, getCurrentUser, onAuthStateChangeListener} from "./utils/firebase/firebase.utils";
import {checkUserSession, setCurrentUser} from "./store/user/user.action";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import PaymentForm from "./components/payment-form/payment-form.component";
// const Shop = () => <h1> Hi Gbenga</h1>;

function App() {

    const dispatch = useDispatch();

    // useEffect(() => {
    //     const unsubscribe =    onAuthStateChangeListener((user) => {
    //         console.log(user);
    //         if(user)
    //         {
    //             createUserDocumentFromAuth(user);
    //         }
    //         dispatch( setCurrentUser(user) );
    //     })
    //
    //     return unsubscribe;
    // }, []);
    useEffect(() => {
       dispatch(checkUserSession());
    }, []);


  return (

      <>
          <Routes>
              <Route path='/' element={ <Navigation  />} >
                  <Route index  element={ <Home  />} />
                  <Route path='shop/*' element={ <Shop  />} />
                  <Route path='auth' element={<Authentication  />} />
                  <Route path='checkout' element={<Checkout  />} />
              </Route>

          </Routes>
          <PaymentForm />
      </>

  );
}

export default App;
