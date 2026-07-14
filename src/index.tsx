import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { unregister } from "./serviceWorker";
import { CartClassProvider } from "./features/cart/context/CartClassProvider";

const container = document.getElementById("root")!;
createRoot(container).render(
  <BrowserRouter>
    <CartClassProvider>
      <App />
    </CartClassProvider>
  </BrowserRouter>
);

unregister();
