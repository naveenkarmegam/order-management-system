import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Components/User/Login";
import ForgotPassword from "./Components/User/ForgotPassword";
import Register from "./Components/User/Register";
import Dashboard from "./core/Dashboard";
import Frontpage from "./Components/LandingPage/Frontpage";
import Admin from "./core/admin/Admin";
import Listing from "./core/Listing";
import Order from "./core/Order";
import Settings from "./core/Settings";
import Community from "./core/Community";

import ViewOrder from "./core/vendors/crud/ViewOrder";
import EditOrder from "./core/vendors/crud/EditOrder";
import CreateOrder from "./core/vendors/crud/CreateOrder";
import { ToastContainer } from "react-toastify";
import { PrivateRoute } from "./Components/User/Auth/ProtectedRoute";
import Support from "./core/Support";


function App() {
  return (
    <hgroup className="conatianer-fluid">
      <Router>
        <Routes>
          <Route path="/" element={<Frontpage />} />
          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* protected route */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/listing" element={<Listing />} />
            <Route path="/order" element={<Order />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/community" element={<Community />} />
            <Route path="/support" element={<Support />} />
            <Route path="/create-order" element={<CreateOrder />} />
            <Route path="/view-order/:id" element={<ViewOrder />} />
            <Route path="/edit-order/:id" element={<EditOrder />} />
          </Route>
        </Routes>
        <ToastContainer />
      </Router>
    </hgroup>
  );
}

export default App;
