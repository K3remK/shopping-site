'use client';
import { createContext, useEffect, useState } from "react";
import { cart } from "./data";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartList, setCartList] = useState([]);

    // Fetch cart items from db.json on load
    useEffect(() => {
        fetch('http://localhost:5000/shoppingCart')
        .then((res) => res.json())
        .then((data) => setCartList(data))
        .catch((err) => console.error("Failed to fetch cart:", err));
    }, []);

    // Add to cart (POST)
    const addToCartHandler = async (product) => {
        const alreadyInCart = cartList.find((item) => item.id === product.id);
        if (alreadyInCart) return;

        try {
            const response = await fetch('http://localhost:5000/shoppingCart', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({...product, amount: 1}),
            });

            if (response.ok) {
                const newItem = await response.json();
                setCartList([...cartList, newItem]);
            }
        } catch (error) {
            console.error("Add to cart failed:", error);
        }
    };


    const removeFromCartHandler = async (productId) => {
        try {
            await fetch(`http://localhost:5000/shoppingCart/${productId}`, {
                method: 'DELETE',
            });

            setCartList(cartList.filter((item) => item.id !== productId));
        } catch (error) {
            console.error("Remove from cart failed: ", error);
        };
    };

    // increase the amount
    const increaseAmountHandler = async (productId) => {
        const item = cartList.find((i) => i.id === productId);
        if (!item) return;
        const updated = { ...item, amount: item.amount + 1 };
        await fetch(`http://localhost:5000/shoppingCart/${productId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updated),
        });
        setCartList(cartList.map((i) => (i.id === productId) ? updated : i));
    }

    // decrease the amount
    const decreaseAmountHandler = async (productId) => {
        const item = cartList.find((i) => i.id === productId);
        if (!item) return;

        if (item.amount === 1) {
            // remove the item completely
            await fetch(`http://localhost:5000/shoppingCart/${productId}`, {
                method: 'DELETE',
            });
            setCartList(cartList.filter((i) => i.id !== productId));
        } else {
            const updated = { ...item, amount: item.amount - 1 };
            await fetch(`http://localhost:5000/shoppingCart/${productId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updated),
            });
            setCartList(cartList.map((i) => (i.id === productId) ? updated : i));
        };
    }

    const clearCart = async () => {
        try {
            for (const item of cartList) {
                await fetch (`http://localhost:5000/shoppingCart/${item.id}`, {
                    method : 'DELETE',
                });
            }
            setCartList([]);
        } catch (error) {
            console.error("Failed to clear cart:", error);
        }
    };

    const inCart = (productId) => {
        return cartList.find((i) => i.id === productId);
    }

    const cartAmount = (productId) => {
        return cartList.find((item) => item.id === productId).amount;
    }

    return (
        <CartContext.Provider value={{ cartList, addToCartHandler, removeFromCartHandler, increaseAmountHandler, decreaseAmountHandler, inCart, clearCart, cartAmount }}>
            {children}
        </CartContext.Provider>
    )
}