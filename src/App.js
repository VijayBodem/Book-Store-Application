import React, { useState, useEffect, createContext }  from "react";
import {Routes, Route} from "react-router-dom";
import app from "./firebase/Firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import HomePage from "./pages/homepage/HomePage";
import BooksPage from "./pages/bookspage/BookPage";
import CartPage from "./pages/CartPage/cartPage";
import BookDetails from "./pages/bookdetailpage/BookDetails";
import Login from "./pages/loginPage/loginPage";
import SignUp from "./pages/signupPage/signupPage";
import ScrollToTop from "./components/util/scrollToTop";
import SearchPage from "./pages/searchPage/searchPage";

export const userContext = createContext({});
export const CartContext = createContext([]);

const App = () =>{
    const auth = getAuth(app);

    const [authenticatedUser, setAutheticatedUser] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [totalAmout, setTotalAmout] = useState(0)

    useEffect(() => {
        onAuthStateChanged( auth, (user) => {
            if(user){
             
                setAutheticatedUser(user);
            }else{
                setAutheticatedUser(null);
            }
        })

    },[])

    useEffect(() =>{
        let total = 0;
        cartItems.forEach((item) => {
            total = total + parseInt(item.price); 
        })
        setTotalAmout(total);
    },[cartItems])

    return (
        <ScrollToTop>
             <userContext.Provider value={authenticatedUser}>
            <CartContext.Provider value={{cartItems, totalAmout, setCartItems}}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/books" element={<BooksPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/book-details/:id" element={<BookDetails/>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                </Routes>

            </CartContext.Provider>
            
           
        </userContext.Provider>

        </ScrollToTop>
       
    )
}

export default App;