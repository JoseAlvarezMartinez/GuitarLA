import { useState, useEffect } from "react";
import { db } from "../data/db"
export default function useCart() {
    const [data] = useState(db);
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) ?? [])

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart))
    }, [cart])
    function addToCart(newItem) {

        const itemExists = cart.findIndex(cartItem => cartItem.id === newItem.id)

        if (itemExists >= 0) {
            const newCart = [...cart]
            newCart[itemExists].quantity += 1
            setCart(newCart)
        } else {
            newItem.quantity = 1
            setCart([...cart, newItem])
        }
    }

    function deleteItem(itemId) {
        const newCart = cart.filter(cartItem => cartItem.id !== itemId)
        setCart(newCart)
    }

    function increaseQuantity(itemId) {
        const newCart = cart.map(cartItem => {
            if (cartItem.id === itemId && cartItem.quantity < 5) {
                return {
                    ...cartItem,
                    quantity: cartItem.quantity += 1
                }
            }
            return cartItem
        })
        setCart(newCart)
    }

    function decreaseQuantity(itemId) {
        const newCart = cart.map(cartItem => {
            if (cartItem.id === itemId && cartItem.quantity > 1) {
                return {
                    ...cartItem,
                    quantity: cartItem.quantity -= 1
                }
            }
            return cartItem
        })
        setCart(newCart)
    }

    return {
        data,
        cart,
        setCart,
        addToCart,
        deleteItem,
        increaseQuantity,
        decreaseQuantity,
        
    }
}