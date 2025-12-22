import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [user, setUser] = useState({ fullName: '', email: '', password: '', mobileNumber: '', address: '', country: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // await axios.post("http://localhost:9091/api/auth/signup", user);
            await axios.post("https://shopping-backend-n9sz.onrender.com/api/auth/signup", user);
            alert("Account Created! Redirecting to Login...");
            navigate("/"); 
        } catch (error) {
            alert("Error: " + (error.response ? error.response.data : "Server Error"));
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.header}>
                    <h2 style={styles.title}>Create Account</h2>
                    <p style={styles.subtitle}>Join us and start shopping today</p>
                </div>

                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.row}>
                        <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} required style={styles.input} />
                        <input type="text" name="mobileNumber" placeholder="Mobile Number" onChange={handleChange} required style={styles.input} />
                    </div>

                    <input type="email" name="email" placeholder="Email Address" onChange={handleChange} required style={styles.inputFull} />
                    <input type="password" name="password" placeholder="Password" onChange={handleChange} required style={styles.inputFull} />
                    
                    <div style={styles.row}>
                        <input type="text" name="address" placeholder="Address" onChange={handleChange} style={styles.input} />
                        <input type="text" name="country" placeholder="Country" onChange={handleChange} style={styles.input} />
                    </div>

                    <button type="submit" style={styles.button}>Sign Up</button>
                </form>

                <div style={styles.footer}>
                    <p>Already have an account? <span onClick={() => navigate("/")} style={styles.link}>Login here</span></p>
                </div>
            </div>
        </div>
    );
};

// --- ✨ Modern Styles ---
const styles = {
    container: {
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)', // Different Gradient for Signup (Pinkish)
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    },
    card: {
        width: '450px',
        padding: '40px',
        backgroundColor: 'white',
        borderRadius: '15px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
        textAlign: 'center'
    },
    header: { marginBottom: '20px' },
    title: { margin: '0', color: '#333', fontSize: '28px', fontWeight: '700' },
    subtitle: { margin: '5px 0 0', color: '#777', fontSize: '15px' },
    form: { display: 'flex', flexDirection: 'column', gap: '15px' },
    
    row: { display: 'flex', gap: '10px' }, // Side by side inputs
    
    input: {
        flex: 1,
        padding: '12px',
        border: '1px solid #eee',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        outline: 'none',
        fontSize: '14px'
    },
    inputFull: {
        width: '100%',
        padding: '12px',
        border: '1px solid #eee',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        outline: 'none',
        boxSizing: 'border-box',
        fontSize: '14px'
    },
    button: {
        width: '100%',
        padding: '14px',
        backgroundColor: '#ff6b6b', // Matches gradient
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        marginTop: '10px',
        boxShadow: '0 4px 10px rgba(255, 107, 107, 0.4)'
    },
    footer: { marginTop: '20px', fontSize: '14px', color: '#666' },
    link: { color: '#ff6b6b', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'none' }
};

export default Signup;