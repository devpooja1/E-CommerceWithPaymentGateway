import Header from "./components/Header";
import TopMenu from "./components/TopMenu";
import Footer from "./components/Footer";
import {Outlet} from "react-router-dom";
const Layout=()=>{
    return(
        <>
        {/* <Header/> */}
     
      
       <TopMenu/>
      
        <Outlet/>
        <Footer/>
        </>
    )
}
export default Layout;