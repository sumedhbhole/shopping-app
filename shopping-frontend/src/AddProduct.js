import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stockQuantity, setStockQuantity] = useState('');
    const [categoryId, setCategoryId] = useState('1');
    const [file, setFile] = useState(null); // Photo store karne ke liye

    const navigate = useNavigate();

    // File select karne par
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!file) {
            alert("Please select an image file!");
            return;
        }

        // File upload ke liye FormData use karna padta hai
        const formData = new FormData();
        formData.append("file", file);
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("stockQuantity", stockQuantity);
        formData.append("categoryId", categoryId);

        try {
            // Content-Type 'multipart/form-data' apne aap set ho jayega
           // await axios.post("https://shopping-backend-n9sz.onrender.com/api/products/add", formData);            
             await axios.post("http://localhost:9091/api/products/add", formData);
            
            alert("Product Added Successfully with Image! 🎉");
            navigate("/dashboard");
        } catch (error) {
            console.error(error);
            alert("Error adding product! Check Backend Console.");
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2>Add Product (Upload Image) 📸</h2>
                <form onSubmit={handleSubmit}>
                    
                    {/* Name */}
                    <div style={styles.inputGroup}>
                        <label>Product Name:</label>
                        <input type="text" onChange={(e) => setName(e.target.value)} required style={styles.input} />
                    </div>

                    {/* 🟢 NEW: File Upload Input */}
                    <div style={styles.inputGroup}>
                        <label>Select Product Image:</label>
                        <input type="file" onChange={handleFileChange} required style={styles.input} accept="image/*" />
                    </div>

                    {/* Description */}
                    <div style={styles.inputGroup}>
                        <label>Description:</label>
                        <textarea onChange={(e) => setDescription(e.target.value)} required style={styles.textarea} />
                    </div>

                    {/* Price & Stock */}
                    <div style={styles.row}>
                        <div style={{flex: 1, marginRight: '10px'}}>
                            <label>Price (₹):</label>
                            <input type="number" onChange={(e) => setPrice(e.target.value)} required style={styles.input} />
                        </div>
                        <div style={{flex: 1}}>
                            <label>Stock:</label>
                            <input type="number" onChange={(e) => setStockQuantity(e.target.value)} required style={styles.input} />
                        </div>
                    </div>

                    {/* Category */}
                    <div style={styles.inputGroup}>
                        <label>Category:</label>
                        <select onChange={(e) => setCategoryId(e.target.value)} style={styles.select}>
                            <option value="1">Mobiles</option>
                            <option value="2">Laptops</option>
                            <option value="3">Books</option>
                        </select>
                    </div>

                    <button type="submit" style={styles.button}>Add Product</button>
                </form>
            </div>
        </div>
    );
};

const styles = {
    container: { display: 'flex', justifyContent: 'center', padding: '30px', backgroundColor: '#eaeded', minHeight: '100vh', fontFamily: 'Arial' },
    card: { width: '500px', padding: '30px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' },
    inputGroup: { marginBottom: '15px' },
    row: { display: 'flex', marginBottom: '15px' },
    input: { width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' },
    textarea: { width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px', height: '80px', boxSizing: 'border-box' },
    select: { width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px' },
    button: { width: '100%', padding: '12px', backgroundColor: '#f0c14b', border: '1px solid #a88734', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px' }
};

export default AddProduct;