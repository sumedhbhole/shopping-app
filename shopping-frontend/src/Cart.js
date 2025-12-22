import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(storedCart);
    }, []);

    const removeFromCart = (indexToRemove) => {
        const newCart = cart.filter((_, index) => index !== indexToRemove);
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
    };

    const totalPrice = cart.reduce((total, item) => total + item.price, 0);

    // --- ✅ UPDATED: Redirect to Payment Page ---
    const handleCheckout = () => {
        const user = JSON.parse(localStorage.getItem("user"));
        
        if (!user) {
            alert("Please login first!");
            navigate("/");
            return;
        }

        // 🟢 Cart se ab order place nahi hoga, bas Payment Page par bhejenge
        // Total price saath me bhej rahe hain
        navigate("/payment", { state: { totalPrice: totalPrice } });
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial' }}>
            
            <button 
                onClick={() => navigate("/dashboard")} 
                style={{ 
                    padding: '8px 15px', 
                    cursor: 'pointer', 
                    marginBottom: '20px', 
                    backgroundColor: '#f0c14b', 
                    border: 'none', 
                    borderRadius: '4px', 
                    fontWeight: 'bold' 
                }}>
                ← Back to Shopping
            </button>

            <h2>Your Shopping Cart 🛒</h2>
            
            {cart.length === 0 ? (
                <h3>Your Amazon Cart is empty.</h3>
            ) : (
                <div style={{ display: 'flex', gap: '20px' }}>
                    {/* Left Side: Product List */}
                    <div style={{ flex: '3' }}>
                        {cart.map((item, index) => (
                            <div key={index} style={cartItemStyle}>
                                <img src={item.imageUrl} alt={item.name} style={{ width: '100px', height: '100px', objectFit: 'contain' }} />
                                <div style={{ marginLeft: '20px' }}>
                                    <h3>{item.name}</h3>
                                    <p style={{ color: 'green' }}>In Stock</p>
                                    <p><b>Price:</b> ₹{item.price}</p>
                                    <button onClick={() => removeFromCart(index)} style={removeBtnStyle}>Remove from Cart</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Side: Total & Checkout */}
                    <div style={checkoutCardStyle}>
                        <h3>Subtotal ({cart.length} items):</h3>
                        <h2>₹{totalPrice}</h2>
                        
                        <button style={checkoutBtnStyle} onClick={handleCheckout}>
                            Proceed to Buy
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

// --- CSS Styles ---
const cartItemStyle = { display: 'flex', borderBottom: '1px solid #ddd', padding: '15px', background: 'white' };
const removeBtnStyle = { backgroundColor: '#d9534f', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer', marginTop: '10px', borderRadius: '4px' };
const checkoutCardStyle = { flex: '1', padding: '20px', background: '#f3f3f3', height: 'fit-content', borderRadius: '8px' };
const checkoutBtnStyle = { width: '100%', padding: '10px', backgroundColor: '#ffd814', border: '1px solid #fcd200', borderRadius: '8px', cursor: 'pointer', marginTop: '10px', fontWeight: 'bold' };

export default Cart;