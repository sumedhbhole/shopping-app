import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://shopping-backend-n9sz.onrender.com/api/auth/login", { email, password });
            // const response = await axios.post("http://localhost:9091/api/auth/login", { email, password });
            localStorage.setItem("user", JSON.stringify(response.data));
            navigate("/dashboard");
        } catch (error) {
            alert("Invalid Email or Password!");
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.header}>
                    <h2 style={styles.title}>Welcome</h2>
                    <p style={styles.subtitle}>Login to continue shopping</p>
                </div>

                <form onSubmit={handleLogin} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Email Address</label>
                        <input 
                            type="email" 
                            placeholder="user@example.com" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                            style={styles.input} 
                        />
                    </div>
                    
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Password</label>
                        <input 
                            type="password" 
                            placeholder="••••••••" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                            style={styles.input} 
                        />
                    </div>

                    <button type="submit" style={styles.button}>Login Now</button>
                </form>

                <div style={styles.footer}>
                    <p>Don't have an account? <span onClick={() => navigate("/signup")} style={styles.link}>Sign Up</span></p>
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
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', // Modern Purple Gradient
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    },
    card: {
        width: '400px',
        padding: '40px',
        backgroundColor: 'white',
        borderRadius: '15px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)', // Soft Shadow
        textAlign: 'center'
    },
    header: { marginBottom: '30px' },
    title: { margin: '0', color: '#333', fontSize: '28px', fontWeight: '700' },
    subtitle: { margin: '10px 0 0', color: '#777', fontSize: '15px' },
    form: { display: 'flex', flexDirection: 'column', textAlign: 'left' },
    inputGroup: { marginBottom: '20px' },
    label: { fontSize: '14px', color: '#555', fontWeight: '600', marginBottom: '8px', display: 'block' },
    input: {
        width: '100%',
        padding: '12px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        fontSize: '15px',
        outline: 'none',
        boxSizing: 'border-box',
        transition: '0.3s',
        backgroundColor: '#f9f9f9'
    },
    button: {
        width: '100%',
        padding: '14px',
        backgroundColor: '#667eea', // Matches gradient
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        marginTop: '10px',
        boxShadow: '0 4px 10px rgba(102, 126, 234, 0.4)'
    },
    footer: { marginTop: '25px', fontSize: '14px', color: '#666' },
    link: { color: '#764ba2', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'none' }
};

export default Login;