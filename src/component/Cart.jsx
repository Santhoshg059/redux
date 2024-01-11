import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../styles/cart.css";
import { increaseQuantity, decreaseQuantity, removeProduct } from "./cartSlice";

const Cart = () => {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  const handleIncrease = (productId) => {
    console.log("...increase");
    dispatch(increaseQuantity(productId));
  };

  const handleDecrease = (productId) => {
    console.log("...decrease");
    dispatch(decreaseQuantity(productId));
  };

  const handleRemove = (productId) => {
    console.log("...remove");
    dispatch(removeProduct(productId));
  };

  //  const getTotalPrice=()=>{
  //   let totalPrice=0;
  //   cart.forEach((item)=>{
  //     totalPrice+=item.price * item.quantity;
  //   });
  //   return totalPrice;
  //  };

  const [price, setPrice] = useState(0);
  const handlePrice = () => {
    let ans = 0;
    cart.map((item) => (ans += item.quantity * item.price));
    setPrice(ans);
  };

  useEffect(() => {
    handlePrice();
  });

  return (<article>
  <div className="container">
    <h1 style={{color: "Black !important"}}>Redux Cart</h1>
    {/* <h6>Created using Redux</h6> */}
    <div className="cart_rows">
    {cart.map((item) => (
      <div className="cart_box" key={item.id}>
        <div className="cart_img">
          <img src={item.thumbnail} alt="" />
        </div>
        <div className="cart_info">
          <h4>{item.title}</h4>
          <p>{item.brand}</p>
          <p>{item.description}</p>
          <p>{item.category}</p>
        </div>
        <div className="cart_actions">
          <button className = "plus"onClick={() => handleIncrease(item.id)}> + </button>
          <button className="quantity">{item.quantity}</button>
          <button className="minus"onClick={() => handleDecrease(item.id)}> - </button>
          <span className="price" > $ {item.quantity * item.price}</span>
        </div>
        <div className="cart_remove">
          <button className ="remove"onClick={() => handleRemove(item.id)}>Remove</button>
        </div>
      </div>
    ))}
    </div>
    <div className="total">
      <span>Shipping:</span>
      <span>FREE</span>
    </div>
    <div className="total">
      <span className="tot-text"> Total Price</span>
      <span className="tot-price">$ {price}</span>
  
    </div>
  </div>
</article>
  )
};

export default Cart;