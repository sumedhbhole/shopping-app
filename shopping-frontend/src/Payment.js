import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    // Cart se Total Price yahan aaya hai
    const { totalPrice } = location.state || { totalPrice: 0 };
    const [paymentMethod, setPaymentMethod] = useState("card");
    const [loading, setLoading] = useState(false);

    const handlePayment = async (e) => {
        e.preventDefault();
        setLoading(true);

        const user = JSON.parse(localStorage.getItem("user"));

        // Fake Delay (Taaki lage asli payment ho raha hai)
        setTimeout(async () => {
            try {
                    //await axios.post("http://localhost:9091/api/orders/place", 
                    await axios.post("https://shopping-backend-n9sz.onrender.com/api/orders/place",{
                    email: user.email,
                    totalPrice: totalPrice
                });

                alert("Payment Successful! Order Placed 🎉");
                localStorage.removeItem("cart"); 
                navigate("/my-orders"); // Order confirm hone ke baad My Orders par bhejo

            } catch (error) {
                console.error(error);
                alert("Payment Failed! Try again.");
            } finally {
                setLoading(false);
            }
        }, 2000); // 2 seconds ka delay
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={{borderBottom: '1px solid #eee', paddingBottom: '15px'}}>Select Payment Method</h2>
                
                <h3 style={{margin: '20px 0'}}>Total to Pay: <span style={{color: '#b12704'}}>₹{totalPrice}</span></h3>

                <form onSubmit={handlePayment}>
                    
                    {/* Payment Options */}
                    <div style={styles.option}>
                        <input 
                            type="radio" 
                            name="payment" 
                            checked={paymentMethod === "card"} 
                            onChange={() => setPaymentMethod("card")} 
                        /> 
                        <label style={{marginLeft: '10px', fontWeight: 'bold'}}>Credit / Debit Card</label>
                    </div>

                    {/* Fake Card Form (Sirf dikhane ke liye) */}
                    {paymentMethod === "card" && (
                        <div style={styles.cardForm}>
                            <input type="text" placeholder="Card Number (0000 0000 0000 0000)" required style={styles.input} maxLength="16" />
                            <div style={{display: 'flex', gap: '10px'}}>
                                <input type="text" placeholder="MM/YY" required style={styles.input} maxLength="5" />
                                <input type="text" placeholder="CVV" required style={styles.input} maxLength="3" />
                            </div>
                            <input type="text" placeholder="Name on Card" required style={styles.input} />
                        </div>
                    )}

                    <div style={styles.option}>
                        <input 
                            type="radio" 
                            name="payment" 
                            checked={paymentMethod === "cod"} 
                            onChange={() => setPaymentMethod("cod")} 
                        /> 
                        <label style={{marginLeft: '10px', fontWeight: 'bold'}}>Cash on Delivery (COD)</label>
                    </div>

                    <button type="submit" style={styles.payBtn} disabled={loading}>
                        {loading ? "Processing..." : `Pay ₹${totalPrice}`}
                    </button>
                </form>
            </div>
        </div>
    );
};

const styles = {
    container: { display: 'flex', justifyContent: 'center', padding: '50px', backgroundColor: '#eaeded', minHeight: '100vh', fontFamily: 'Arial' },
    card: { width: '400px', padding: '30px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' },
    option: { marginBottom: '15px', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', cursor: 'pointer' },
    cardForm: { backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '5px', marginBottom: '15px', display: 'flex', flexDirection: 'column', gap: '10px' },
    input: { padding: '10px', border: '1px solid #ccc', borderRadius: '4px', width: '100%', boxSizing: 'border-box' },
    payBtn: { width: '100%', padding: '12px', backgroundColor: '#ffd814', border: '1px solid #fcd200', borderRadius: '20px', fontWeight: 'bold', cursor: 'pointer', marginTop: '20px' }
};

export default Payment;