import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { unregister } from "./serviceWorker";
import { CartClassProvider } from "./features/cart/context/CartClassProvider";

const container = document.getElementById("root")!;
createRoot(container).render(
  <CartClassProvider>
    <App />
  </CartClassProvider>
);

unregister();
