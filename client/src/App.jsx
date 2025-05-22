import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./Layout";
import Home from "./pages/Home";
import AdminDashBoard from "./admin/AdminDashBoard";
import Insert from "./admin/Insert";
import Update from "./admin/Update";
import ProductDetails from "./pages/ProductDetails";

import CheckOut from "./pages/CheckOut";
import UserLogin from "./auth/UserLogin";
import UserRegistration from "./auth/UserRegistration";
import Mobile from "./pages/Mobile";
import Tablet from "./pages/Tablet";
import Audio from "./pages/Audio";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
// import Contact from "./pages/Contact";
import Search from "./pages/Search";
import Cart from "./pages/CartProduct";
import PaymentDone from "./pages/paymentDone";
import Display from "./admin/Display";

const App=()=>{
 
  return(
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>} >
        <Route index element={<Home/>} />
        <Route path="home" element={<Home/>} /> 
        <Route path="mobile" element={<Mobile/>} />
        <Route path="tablet" element={<Tablet/>} />
        <Route path="audio" element={<Audio/>} />
       <Route path="cart" element={<Cart/>} />
        <Route path="productdetails/:id" element={<ProductDetails/>} />
        <Route path="checkout" element={<CheckOut/>} />
        <Route path="userlogin" element={<UserLogin />} />
        <Route path="usersignup" element={<UserRegistration />} />
        {/* <Route path="contact" element={<Contact/>} /> */}
        <Route path="search" element={<Search/>} />
        <Route path="paymentdone" element={<PaymentDone/>} />
        </Route>



        {/* Admin Routes */}
        <Route path="admin" element={<AdminDashBoard/>} >
        <Route path="insert" element={<Insert/>} />
        <Route path="display" element={<Display/>} />
        <Route path="update" element={<Update/>}/>
        </Route>
       
      </Routes>
      <ToastContainer/>
      </BrowserRouter>
    </>
  )
}
export default App;