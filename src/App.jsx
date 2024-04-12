import Header from "./components/Header"
import Guitar from "./components/Guitar"
import { db } from "./data/db"
import { useState } from "react"

const App = () => {

    const [data, setData] = useState(db);
    const [cart, setCart] = useState([])

    function handleClick(guitarDescription) {


        const itemExists = cart.findIndex(cartItem => cartItem.id === guitarDescription.id)

        if (itemExists >= 0) {
            const newCart = [...cart]
            newCart[itemExists].quantity++
            setCart(newCart)
        } else {
            guitarDescription.quantity = 1;
            setCart([...cart, guitarDescription])
        }
    } function deleteFromCart(item) {
        const { id } = item
        setCart(cart.filter(cartItem => cartItem.id !== id))
    }

    function increaseQuantity(id) {
        const updateCart = cart.map(itemCart => {
            if (itemCart.id === id) {
                return {
                    ...itemCart,
                    quantity: itemCart.quantity + 1
                }
            }
            return itemCart
        })
        setCart(updateCart)
    }

    function decreaseQuantity(id) {
        const updateCart = cart.map(cartItem => {
            if (cartItem.id === id) {
                if (cartItem.quantity > 1) {
                    return {
                        ...cartItem,
                        quantity: cartItem.quantity - 1
                    }
                }
            }
            return cartItem
        })
        setCart(updateCart)
    }
    return (
        <>
            <Header cart={cart} deleteFromCart={deleteFromCart} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} />
            <main className="container-xl mt-5">
                <h2 className="text-center">Nuestra Colección</h2>

                <div className="row mt-5">

                    {data.map(guitar => (<Guitar key={guitar.id} guitar={guitar} handleClick={handleClick} />))}

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