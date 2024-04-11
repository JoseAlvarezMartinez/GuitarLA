import { useState, useEffect } from "react"
import { db } from "./data/db"
import Header from "./components/Header"
import Guitar from "./components/Guitar"
function App() {
    const [data, setData] = useState(db)
    const [cart, setCart] = useState([])

    function addToCart(item) {

        const itemExists = cart.findIndex(cartItem => cartItem.id === item.id)

        if (itemExists >= 0) {
            const cartUpdate = [...cart]
            cartUpdate[itemExists].quantity++
            setCart(cartUpdate)
        } else {
            item.quantity = 1;
            setCart([...cart, item])
        }
    }


    return (
        <>
            <Header cart={cart} />
            <main className="container-xl mt-5">
                <h2 className="text-center">Nuestra Colección</h2>

                <div className="row mt-5">

                    {data.map(guitarra => (<Guitar
                        addToCart={addToCart}
                        key={guitarra.id}
                        guitarraData={guitarra} />))}

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
