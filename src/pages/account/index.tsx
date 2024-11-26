import Navbar from "../../components/navbar";
import AccountDetail from "../../components/accountinfo";
import Heading from "../../components/heading";
import Footer from "../../components/footer";
import './index.css'
import { useUser } from "../../contexts/UserContext";
import LoginPage from "../../components/login/login";
function AccountPage(){
    const { user } = useUser();
    console.log(user);
    if(user){
    return(
        
        <>
            <Navbar/>
            <Heading/>
            <AccountDetail/>
            <Footer/>
        </>
    )
}
else{
    return(
        <>
            <Navbar/>
            <Heading/>
            <LoginPage/>
            <Footer/>
        </>
    )
}
}

export default AccountPage;
