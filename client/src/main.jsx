import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import "./assets/styles/scss/index.scss";
import { UserProvider } from "./store/user/Context";
import { MenuProvider } from "./store/menu/Context";
import { CartProvider } from "./store/cart/Context.jsx";

// The entry point of the application where the app is rendered into the DOM.
ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <CartProvider>
            <MenuProvider>
                <UserProvider>
                    <App />
                </UserProvider>
            </MenuProvider>
        </CartProvider>
    </BrowserRouter>
);
