import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); // 🔍 Search State
    const [selectedCategory, setSelectedCategory] = useState("ALL"); // 📂 Category State
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            navigate("/");
        }
        fetchProducts();
    }, [navigate]);

    const fetchProducts = async () => {
        try {
            // const response = await axios.get("http://localhost:9091/api/products");
            const response = await axios.get("https://shopping-backend-n9sz.onrender.com/api/products");
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const addToCart = (product) => {
        const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
        currentCart.push(product);
        localStorage.setItem("cart", JSON.stringify(currentCart));
        alert(`${product.name} added to cart! 🛒`);
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/");
    };

    // --- 🔍 FILTER LOGIC ---
    const filteredProducts = products.filter((product) => {
        // 1. Search Match
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              product.description.toLowerCase().includes(searchTerm.toLowerCase());
        
        // 2. Category Match (Backend me ID: 1=Mobile, 2=Laptop, 3=Books)
        let matchesCategory = true;
        if (selectedCategory === "Mobiles") matchesCategory = product.category.id === 1;
        if (selectedCategory === "Laptops") matchesCategory = product.category.id === 2;
        if (selectedCategory === "Books") matchesCategory = product.category.id === 3;

        return matchesSearch && matchesCategory;
    });

    return (
        <div style={{ fontFamily: 'Arial, sans-serif' }}>
            {user ? (
                <div>
                    {/* --- Navbar --- */}
                    <div style={{ background: '#131921', color: 'white', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h2 style={{cursor:'pointer', margin: 0}} onClick={()=>navigate("/dashboard")}>Shopping App</h2>
                        
                        {/* 🔍 SEARCH BAR */}
                        <input 
                            type="text" 
                            placeholder="Search products..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={searchStyle}
                        />

                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            
                            {/* 🟢 NAME LOGIC (Admin vs User) */}
                            <span style={{ marginRight: '15px', fontWeight: 'bold', color: '#ff9900' }}>
                                {user.role === 'ADMIN' ? 'Admin' : 'Hello'}, {user.fullName}
                            </span>

                            {user.role === 'ADMIN' ? (
                                <>
                                    <button onClick={() => navigate("/add-product")} style={navBtnStyle}>+ Add Product</button>
                                    <button onClick={() => navigate("/admin-orders")} style={navBtnStyle}>📦 View Orders</button>
                                </>
                            ) : (
                                <>
                                    <button onClick={() => navigate("/my-orders")} style={navBtnStyle}>🛍️ My Orders</button>
                                    <button onClick={() => navigate("/cart")} style={cartBtnStyle}>🛒 Cart</button>
                                </>
                            )}
                            <button onClick={handleLogout} style={logoutBtnStyle}>Logout</button>
                        </div>
                    </div>

                    {/* --- 📂 CATEGORY FILTERS --- */}
                    <div style={{ padding: '15px', backgroundColor: '#232f3e', display: 'flex', gap: '15px', justifyContent: 'center' }}>
                        {["ALL", "Mobiles", "Laptops", "Books"].map(cat => (
                            <button 
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                style={{
                                    ...catBtnStyle,
                                    backgroundColor: selectedCategory === cat ? '#f0c14b' : 'transparent',
                                    color: selectedCategory === cat ? 'black' : 'white',
                                    border: selectedCategory === cat ? 'none' : '1px solid white'
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* --- Product Grid --- */}
                    <div style={{ padding: '20px', backgroundColor: '#eaeded', minHeight: '100vh' }}>
                        
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
                            
                            {filteredProducts.length === 0 ? <h3>No products found...</h3> : 
                                filteredProducts.map((product) => (
                                    <div key={product.id} style={cardStyle}>
                                        <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '200px', objectFit: 'contain', marginBottom: '10px' }} />
                                        <h3 style={{ fontSize: '1.1rem', margin: '5px 0' }}>{product.name}</h3>
                                        <p style={{ color: '#565959', fontSize: '0.9rem', margin: '10px 0', lineHeight: '1.4' }}>
                                            {product.description.substring(0, 50)}...
                                        </p>
                                        <h3 style={{ margin: '10px 0' }}>₹{product.price}</h3>
                                        
                                        {user.role !== 'ADMIN' && (
                                            <button onClick={() => addToCart(product)} style={buyBtnStyle}>Add to Cart</button>
                                        )}
                                    </div>
                                ))
                            }

                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

// --- CSS Styles ---
const searchStyle = {
    padding: '10px', width: '400px', borderRadius: '5px', border: 'none', outline: 'none'
};
const navBtnStyle = { marginRight: '15px', padding: '8px 15px', backgroundColor: '#333', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' };
const cartBtnStyle = { marginRight: '15px', padding: '8px 15px', backgroundColor: '#f0c14b', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', color: 'black' };
const logoutBtnStyle = { padding: '8px 15px', backgroundColor: '#d9534f', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' };
const catBtnStyle = { padding: '8px 15px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold' };
const cardStyle = { backgroundColor: 'white', width: '250px', padding: '20px', borderRadius: '4px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' };
const buyBtnStyle = { padding: '10px', backgroundColor: '#ffd814', border: '1px solid #fcd200', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold', marginTop: 'auto' };

export default Dashboard;