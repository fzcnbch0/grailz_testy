import { useEffect } from "react";
import ItemDetail from "../../components/ItemDetails";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import Heading from "../../components/heading";
import './index.css';

function ItemPage(){
    return(
        <>
        <Navbar/>
        <Heading/>
        <ItemDetail/>
        <Footer/>
        </>
    )
}

export default ItemPage;