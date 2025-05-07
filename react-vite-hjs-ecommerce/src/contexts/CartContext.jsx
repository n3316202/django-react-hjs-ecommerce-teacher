import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { mergeCart } from "@/api/CartApi";

//dev_6_Fruits
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const { user } = useAuth();


  // 비회원일 때 localStorage 저장
  useEffect(() => {
    if (!user) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
      console.log("🛒 savedCart:", localStorage.getItem("cart"));
    }
  }, [cartItems, user]);

  //로그인시 카트를 병합
  //병합 순서

  useEffect(()=>{
    
    const fetchCart = async ()=>{
        //로그인이 되면
        //로컬에 저장된 카트를 서버로 보내어 서버에서 로컬에 저장된 카트를 병합
        if(user){
            const guestCart = JSON.parse(localStorage.getItem("cart") || "{}");
            try {
                
                if(Object.keys(guestCart).length > 0 ){

                    await mergeCart(localStorage.getItem("cart"))
                    localStorage.removeItem("cart");
                }
                
            } catch (error) {
                console.error("장바구니 병합/불러오기 실패", error);
            }
        }    
    }
    fetchCart()
  },[user])
  
  const getTotalItems = ()=>{
      return Object.values(cartItems).reduce((acc, item) => acc + item.quantity, 0);
  }
  
  // 장바구니 추가
  const addToCart = async (product, quantity = 1) => {
    const productId = product.id;
    const price = product.price;

    if (user) {
      try {
        
      } catch (err) {
        console.error("서버 장바구니 추가 실패", err);
      }
    } else {
        setCartItems((prev) => {
        const existing = prev[productId];
        return {
          ...prev,
          [productId]: {
            price,
            quantity: existing ? existing.quantity + quantity : quantity,
          },
        };
        
      });
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
