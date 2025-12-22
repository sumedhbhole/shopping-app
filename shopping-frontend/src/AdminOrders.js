import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            // const response = await axios.get("http://localhost:9091/api/orders/all");
            const response = await axios.get("https://shopping-backend-n9sz.onrender.com/api/orders/all");
            setOrders(response.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    // --- Status Change Logic ---
    const handleStatusChange = async (orderId, newStatus) => {
        try {
            // Backend ko Clean Text bhejo (e.g., "SHIPPED")
                await axios.post("https://shopping-backend-n9sz.onrender.com/api/orders/updateStatus", {
                orderId: orderId,
                status: newStatus
            });
            
            // Screen par turant update dikhane ke liye:
            const updatedOrders = orders.map(order => 
                order.id === orderId ? { ...order, status: newStatus } : order
            );
            setOrders(updatedOrders);
            alert(`Order #${orderId} updated! ✅`);

        } catch (error) {
            console.error("Error updating status:", error);
            alert("Failed to update status.");
        }
    };

    return (
        <div style={{ padding: '30px', fontFamily: 'Arial' }}>
            {/* <button onClick={() => navigate("/dashboard")} style={backBtnStyle}>← Back to Dashboard</button> */}
            <button onClick={() => navigate("/dashboard")} style={{ padding: '8px 15px', cursor: 'pointer', marginBottom: '20px', backgroundColor: '#f0c14b', border: 'none', borderRadius: '4px', fontWeight: 'bold' }}>← Back to Dashboard</button>

            <h2>📦 All Customer Orders (Admin Panel)</h2>

            {orders.length === 0 ? (
                <h3>No orders placed yet.</h3>
            ) : (
                <table style={tableStyle}>
                    <thead>
                        <tr style={{ background: '#f0c14b' }}>
                            <th style={thStyle}>Order ID</th>
                            <th style={thStyle}>Customer</th>
                            <th style={thStyle}>Total Price</th>
                            <th style={thStyle}>Current Status</th>
                            <th style={thStyle}>Action (Update)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id} style={{ borderBottom: '1px solid #ddd' }}>
                                <td style={tdStyle}>#{order.id}</td>
                                <td style={tdStyle}>{order.user ? order.user.fullName : 'Unknown'}</td>
                                <td style={tdStyle}><b>₹{order.totalPrice}</b></td>
                                <td style={tdStyle}>{order.status}</td>
                                
                                {/* --- UPDATED DROPDOWN (Values Clean Hain) --- */}
                                <td style={tdStyle}>
                                    <select 
                                        value={order.status} 
                                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                        style={statusDropdownStyle}
                                    >
                                        <option value="PLACED">Placed ✅</option>
                                        <option value="SHIPPED">Shipped 🚚</option>
                                        <option value="OUT_FOR_DELIVERY">Out for Delivery 🛵</option>
                                        <option value="DELIVERED">Delivered 🎉</option>
                                        <option value="CANCELLED">Cancelled ❌</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

// --- Styles ---
const tableStyle = { width: '100%', borderCollapse: 'collapse', marginTop: '20px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' };
const thStyle = { padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' };
const tdStyle = { padding: '12px', borderBottom: '1px solid #ddd', background: 'white' };
const backBtnStyle = { padding: '8px 15px', cursor: 'pointer', marginBottom: '15px' };
const statusDropdownStyle = { padding: '8px', borderRadius: '4px', border: '1px solid #ccc', fontWeight: 'bold', cursor: 'pointer', backgroundColor: '#f8f9fa' };

export default AdminOrders;