import { Routes, Route } from "react-router-dom";
import Home from "../views/admin/Home";
import Product from "../views/admin/Product";
import DetailProduct from "../views/admin/DetailProduct.jsx";
import AddProduct from "../views/admin/AddProduct.jsx";
import EditProduct from "../views/admin/EditProduct.jsx";
import Header from "../views/admin/partials/Header.jsx";
import User from "../views/admin/User";
import DetailUser from "../views/admin/DetailUser";
import AddUser from "../views/admin/AddUser";
import EditUser from "../views/admin/EditUser";
import Order from "../views/admin/Order";
import DetailOrder from "../views/admin/DetailOrder";
import EditOrder from "../views/admin/EditOrder";
import Category from "../views/admin/Category";
import DetailCategory from "../views/admin/DetailCategory";
import AddCategory from "../views/admin/AddCategory";
import EditCategory from "../views/admin/EditCategory";

// The main router component for the admin panel.
// This component defines all the routes for the admin section of the application.
function Router() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="product" element={<Product />} />
                <Route path="product/detail/:id" element={<DetailProduct />} />
                <Route path="product/add" element={<AddProduct />} />
                <Route path="product/edit/:id" element={<EditProduct />} />
                <Route path="user" element={<User />} />
                <Route path="user/detail/:id" element={<DetailUser />} />
                <Route path="user/add" element={<AddUser />} />
                <Route path="user/edit/:id" element={<EditUser />} />
                <Route path="order" element={<Order />} />
                <Route path="order/detail/:id" element={<DetailOrder />} />
                <Route path="order/edit/:id" element={<EditOrder />} />
                <Route path="category" element={<Category />} />
                <Route path="category/detail/:id" element={<DetailCategory />} />
                <Route path="category/add" element={<AddCategory />} />
                <Route path="category/edit/:id" element={<EditCategory />} />
                <Route path="*" element={<p>NOT FOUND</p>} />
            </Routes>
        </>
    );
}

export default Router;




