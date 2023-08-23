import React, { useEffect, useState } from 'react'
import './css/Home.css'
import { useSelector ,useDispatch } from 'react-redux'
import { addToCart,removeFromCart , IncreaseQuantity , DecreaseQuantity, CountSubTotal} from '../CartStore/CartSlice/CartSlice';
import { toast } from 'react-hot-toast';
import axios from 'axios';



function Home() {

  let dispatch = useDispatch();
  let CartItem = useSelector((state)=>state.Cart)



  dispatch(CountSubTotal())

  let [showCart,setShowCart] = useState(false);



 let [AllProducts,setAllProducts] = useState([]);


  useEffect(()=>{
    fetchAllProduct('https://boppotech.github.io/react-task-json.github.io/reactjob.json');
  },[])


  const fetchAllProduct = async(url)=>{
    try{
      let response = await axios.get(url);
      if(response.status===200){

        let products = response.data?.map((data,ind)=>{
          return {id : ind,title : data?.title , description : data.description , image : data?.images?.nodes[0]?.originalSrc , price : data?.price?.amount , tags : data?.tags}
        })

        setAllProducts(products)
      }
    }catch(error){
      toast.error("Failed To Fetch Products.!")
    }
  }



  return (
    <>

    {/* //navbar */}
    <div className="nav_Container">
      <nav className='nav'>
        <ul>
          <li onClick={()=>setShowCart(false)}>Products</li>
          <li onClick={()=>setShowCart(true)}>Cart <span>{CartItem?.CartItem?.length}</span></li>
        </ul>
      </nav>
    </div>







{/* //all products and Cart lisiting  */}  
     {
      !showCart
         ?
         <div className="All_Products">
              {
                AllProducts && AllProducts?.map((data,ind)=>{
                  let {id,title,description,price,image} = data;
                  return(
                    <div className="Card" key={id}>
                      <div className="inner-Card">
                      <img src={image} alt="" />
                      <p className='Product_Title'>{title?.slice(0,20)}</p>
                      <p className='Product_Description'>{description?.slice(0,50)}..</p>
                      <div className="price_and_BTN">
                        <p className="Product_Price">{new Intl.NumberFormat('en-us', { style: 'currency', currency: 'INR' }).format(price)}</p>
                        <button className='Add_To_Cart_Btn' onClick={()=>dispatch(addToCart(data))}>ADD TO CART</button>
                      </div>
                      </div>
                  </div>
                  )
                })
              }
          </div>
          :
          <div className="Cart_products">
                  {
                    CartItem?.CartItem  && CartItem?.CartItem?.map((data,ind)=>{
                      let {id,title,description,price,image,quantity} = data;
                      return(
                       <div className="cartCard">
                        <img src={image} alt="" />
                        <p className="title">{title.slice(0,20)}...</p>
                        <div className="btn">
                          <button onClick={()=>dispatch(DecreaseQuantity(id))}>-</button>
                          <p>{quantity}</p>
                          <button onClick={()=>dispatch(IncreaseQuantity(id))}>+</button>
                        </div>
                        <a onClick={()=>dispatch(removeFromCart(id))}>Remove</a>
                       </div>
                      )
                    })
                  }


                  <div className="subtotal">
                    <p>SubTotal : {new Intl.NumberFormat('en-us', { style: 'currency', currency: 'INR' }).format(CartItem.subTotal)}</p>
                    <button>CheckOut</button>
                  </div>
          </div> 
     }
      


    </>
  )
}

export default Home