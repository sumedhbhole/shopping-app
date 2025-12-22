import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import AddProduct from './AddProduct';
import Cart from './Cart';
import AdminOrders from './AdminOrders'; 
import MyOrders from './MyOrders'; // 
import Payment from './Payment';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Pehla Page: Login */}
          <Route path="/" element={<Login />} />
          
          {/* Sign Up Page */}
          <Route path="/signup" element={<Signup />} />
          
          {/* Dashboard Page */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Add Product Page */}
          <Route path="/add-product" element={<AddProduct />} />

          {/* Cart Page */}
          <Route path="/cart" element={<Cart />} />

          {/* Admin Orders Page */}
          <Route path="/admin-orders" element={<AdminOrders />} />

          {/* MISSING ROUTE FIXED HERE */}
          <Route path="/my-orders" element={<MyOrders />} />

          <Route path="/payment" element={<Payment />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;