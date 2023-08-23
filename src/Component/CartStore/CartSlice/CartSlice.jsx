import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

let CartSlice = createSlice({
    name : "CartSlice",
    initialState : {
        CartItem : [],
        subTotal : 0
    },
    reducers : {
        addToCart : (state,action) =>{
            let findExistItemIndex = state.CartItem.findIndex((data,index)=>data.id===action.payload.id);

            if(findExistItemIndex>=0){
                if(state.CartItem[findExistItemIndex].quantity<10){
                    state.CartItem[findExistItemIndex].quantity = state.CartItem[findExistItemIndex].quantity + 1
                    toast.success(`Quantity Increased To ${state.CartItem[findExistItemIndex].quantity} for ${action.payload.title}`)
                }else{
                    toast.error('Cannot Add More Than 10 Quantity.!')
                }
            }else{
                state.CartItem.push({...action.payload,quantity : 1})
                toast.success(`${action.payload.title} is Added To Cart.!`)
            }
        },
        removeFromCart : (state,action) => {
             let res = state.CartItem.filter((data,ind)=>{
                return data.id!==action.payload
             })

             state.CartItem = res;
        },
        IncreaseQuantity : (state,action)=>{
            if(state.CartItem[action.payload]?.quantity<10){
                state.CartItem[action.payload].quantity = state.CartItem[action.payload].quantity+1;
            }else{
                toast.error('Cannot Add More Than 10 Quantity.!')
            }
        },
        DecreaseQuantity : (state,action)=>{
            if(state.CartItem[action.payload]?.quantity>1){
                state.CartItem[action.payload].quantity = state.CartItem[action.payload].quantity-1;
            }
        },
        CountSubTotal : (state,action) =>{
            let Count = state.CartItem.reduce((accum,item,ind)=>{
                let {price,quantity} = item;
                return accum = accum + (+price*quantity)
            },0)

            state.subTotal = Count
        }
    }
})



export default CartSlice.reducer;
export const {addToCart,removeFromCart,IncreaseQuantity,DecreaseQuantity,CountSubTotal} = CartSlice.actions;