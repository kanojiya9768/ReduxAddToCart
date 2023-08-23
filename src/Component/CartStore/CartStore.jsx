import { configureStore } from "@reduxjs/toolkit";
import {Provider} from 'react-redux'
import CartSlice from "./CartSlice/CartSlice";


let CartStore = configureStore({
    reducer : {
        Cart : CartSlice
    }
})


let CartStoreProvider = ({children}) =>{
    return(
        <Provider store={CartStore}>
            {children}
        </Provider>
    )
}


export default CartStoreProvider