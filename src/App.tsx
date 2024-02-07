import "./App.css";
import { useEffect } from "react";
import { useTelegram } from "./hooks/useTelegram";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import ProductList from "./components/ProductList/ProductList";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext";
import { Route, Routes } from "react-router-dom";

function App() {
  const { tg, showMainButton, hideMainButton } = useTelegram();
  const { cart } = useCart;
  const mode = tg.colorScheme;

  const theme = createTheme({ palette: { mode } });

  useEffect(() => {
    tg.ready();
    tg.MainButton.setParams({ text: "К оформлению" });
  }, [tg]);

  useEffect(() => {
    if (cart.length > 0) {
      showMainButton();
    } else {
      hideMainButton();
    }
  }, [cart]);

  return (
    <ThemeProvider theme={theme}>
      <CartProvider>
        <main>
          <Routes>
            <Route index element={<ProductList />} />
            <Route path={"form"} element={<div>заполни форму</div>} />
          </Routes>
        </main>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
