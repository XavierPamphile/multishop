import { Routes, Route } from "react-router-dom";

import Header from "../views/user/partials/Header";
import Home from "../views/user/Home";
import Login from "../views/auth/Login";
import Register from "../views/auth/Register";
import Dashboard from "../views/user/Dashboard";
import Cart from "../views/user/Cart";
import Footer from "../views/user/partials/Footer";
import ProtectedRoute from "../hoc/ProtectedRoute";
import CategoryProducts from "../views/user/CategoryProducts"; 
import PrivacyPolicy from "../views/user/PrivacyPolicy";
import TermsOfUse from "../views/user/TermsOfUse";

// The main router component for the user-facing part of the application.
// This component defines all the routes for the user section of the application.
function Router() {
	return (
		<>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="login" element={<Login />} />
				<Route path="register" element={<Register />} />
				<Route path="dashboard" element={<ProtectedRoute component={Dashboard} /> } />
				<Route path="cart" element={<Cart />}/>
				<Route path="/category/:id" element={<CategoryProducts />} />
				<Route path="/terms-of-use" element={<TermsOfUse />} />
				<Route path="/privacy-policy" element={<PrivacyPolicy />} />
				<Route path="*" element={<p>NOT FOUND</p>} />
			</Routes>
			<Footer />
		</>
	);
}

export default Router;
