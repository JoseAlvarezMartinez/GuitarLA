import Header from "./components/Header"
import Guitar from "./components/Guitar"
import { useState, useEffect } from "react";
import { db } from "./data/db";
const App = () => {

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
    return (
        <>
            <Header cart={cart} deleteItem={deleteItem} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} setCart={setCart} />

            <main className="container-xl mt-5">
                <h2 className="text-center">Nuestra Colección</h2>

                <div className="row mt-5">
                    {data.map(guitar => <Guitar key={guitar.id} guitar={guitar} addToCart={addToCart} />)}
                </div>
            </main>

            <footer className="bg-dark mt-5 py-5">
                <div className="container-xl">
                    <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
                </div>
            </footer>
        </>
    )
}

export default App