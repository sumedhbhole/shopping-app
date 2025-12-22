import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) navigate("/");
        else fetchMyOrders(user.email);
    }, [navigate]);

    const fetchMyOrders = async (email) => {
        try {
            // const response = await axios.get(`http://localhost:9091/api/orders/user/${email}`);
            const response = await axios.get(`https://shopping-backend-n9sz.onrender.com/api/orders/user/${email}`);
            console.log("MyOrders Data:", response.data);
            setOrders(response.data || []);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    // --- 🎨 MASTER STYLING LOGIC ---
    const getStatusBadge = (status) => {
        const safeStatus = (status || "PENDING").toUpperCase();
        let config = { text: status, color: "#856404", bg: "#fff3cd" };

        if (safeStatus === "PLACED") {
            config = { text: "Placed ✅", color: "#856404", bg: "#fff3cd" };
        } else if (safeStatus === "SHIPPED") {
            config = { text: "Shipped 🚚", color: "#004085", bg: "#cce5ff" };
        } else if (safeStatus === "OUT_FOR_DELIVERY") {
            config = { text: "Out for Delivery 🛵", color: "#0c5460", bg: "#d1ecf1" };
        } else if (safeStatus === "DELIVERED") {
            config = { text: "Delivered 🎉", color: "#155724", bg: "#d4edda" };
        } else if (safeStatus === "CANCELLED") {
            config = { text: "Cancelled ❌", color: "#721c24", bg: "#f8d7da" };
        }

        return (
            <div style={{ padding: '8px 16px', borderRadius: '20px', fontWeight: 'bold', backgroundColor: config.bg, color: config.color, border: '1px solid rgba(0,0,0,0.1)', display: 'inline-block' }}>
                {config.text}
            </div>
        );
    };

    if (loading) return <div style={{padding:'20px'}}>Loading...</div>;

    return (
        <div style={{ padding: '30px', fontFamily: 'Arial' }}>
            <button onClick={() => navigate("/dashboard")} style={{ padding: '8px 15px', cursor: 'pointer', marginBottom: '20px', backgroundColor: '#f0c14b', border: 'none', borderRadius: '4px', fontWeight: 'bold' }}>← Back to Shopping</button>
            <h2>🛍️ My Orders</h2>
            {orders.length === 0 ? <h3>You haven't placed any orders yet.</h3> : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {orders.map((order) => (
                        <div key={order.id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', background: 'white', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', maxWidth: '600px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '10px' }}>
                                <span><b>Order ID:</b> #{order.id}</span>
                                <span><b>Product Name:</b> </span>
                                <span style={{ color: '#555' }}>Date: {order.orderDate ? new Date(order.orderDate).toLocaleDateString() : 'N/A'}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h3 style={{ margin: 0 }}>Amount: ₹{order.totalPrice}</h3>
                                {getStatusBadge(order.status)}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyOrders;